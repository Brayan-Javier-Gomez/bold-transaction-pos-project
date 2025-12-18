import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { getTransactions, getSalesTotals } from "./transaction.service"
import type { Transaction } from "@/lib/types"

const mockAPIResponse = {
  data: [
    {
      id: "TRX001",
      status: "SUCCESSFUL",
      paymentMethod: "NEQUI",
      salesType: "TERMINAL",
      createdAt: Date.now() - 1000 * 60 * 30,
      transactionReference: 123456,
      amount: 50000
    },
    {
      id: "TRX002",
      status: "REJECTED",
      paymentMethod: "CARD",
      salesType: "PAYMENT_LINK",
      createdAt: Date.now() - 1000 * 60 * 60 * 2,
      transactionReference: 789012,
      amount: 100000,
      franchise: "VISA"
    },
    {
      id: "TRX003",
      status: "SUCCESSFUL",
      paymentMethod: "BANCOLOMBIA",
      salesType: "TERMINAL",
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 15,
      transactionReference: 345678,
      amount: 75000
    },
    {
      id: "TRX004",
      status: "SUCCESSFUL",
      paymentMethod: "PSE",
      salesType: "PAYMENT_LINK",
      createdAt: Date.now() - 1000 * 60 * 60 * 5,
      transactionReference: 901234,
      amount: 25000
    },
    {
      id: "TRX005",
      status: "SUCCESSFUL",
      paymentMethod: "NEQUI",
      salesType: "TERMINAL",
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
      transactionReference: 567890,
      amount: 150000,
      deduction: 3000
    }
  ] as Transaction[]
}

describe("transaction.service (integration)", () => {
  beforeEach(() => {
    process.env.TRANSACTIONS_ENDPOINT = "http://localhost:3000/api/transactions"

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockAPIResponse
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("getTransactions - Pipeline completo", () => {
    it("debe obtener, validar, filtrar, enriquecer, ordenar y paginar transacciones", async () => {
      const result = await getTransactions({
        status: "SUCCESSFUL",
        page: 1,
        pageSize: 10
      })

      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/transactions",
        expect.objectContaining({
          cache: 'no-store'
        })
      )

      expect(result.data.length).toBeGreaterThan(0)
      expect(result.data.every(tx => tx.status === "SUCCESSFUL")).toBe(true)
      expect(result.meta.currentPage).toBe(1)
      expect(result.meta.pageSize).toBe(10)
    })

    it("debe aplicar validación de filtros antes de procesar", async () => {
      await expect(async () => {
        await getTransactions({
          page: -1
        })
      }).rejects.toThrow()
    })

    it("debe aplicar validación de seguridad antes de filtrar", async () => {
      await expect(async () => {
        await getTransactions({
          page: 10001
        })
      }).rejects.toThrow()
    })

    it("debe enriquecer transacciones con deducciones calculadas (2%)", async () => {
      const result = await getTransactions({
        status: "SUCCESSFUL"
      })

      const txWithoutOriginalDeduction = result.data.find(
        tx => tx.id === "TRX001"
      )

      expect(txWithoutOriginalDeduction?.deduction).toBe(1000)
    })

    it("debe mantener deducciones existentes sin sobrescribirlas", async () => {
      const result = await getTransactions({})

      const txWithOriginalDeduction = result.data.find(
        tx => tx.id === "TRX005"
      )

      expect(txWithOriginalDeduction?.deduction).toBe(3000)
    })

    it("debe ordenar transacciones por fecha descendente (más reciente primero)", async () => {
      const result = await getTransactions({})

      expect(result.data[0].id).toBe("TRX001")

      for (let i = 0; i < result.data.length - 1; i++) {
        expect(result.data[i].createdAt).toBeGreaterThanOrEqual(
          result.data[i + 1].createdAt
        )
      }
    })

    it("debe combinar múltiples filtros correctamente", async () => {
      const result = await getTransactions({
        status: "SUCCESSFUL",
        salesType: "TERMINAL",
        paymentMethod: ["NEQUI"]
      })

      expect(result.data.every(tx =>
        tx.status === "SUCCESSFUL" &&
        tx.salesType === "TERMINAL" &&
        tx.paymentMethod === "NEQUI"
      )).toBe(true)
    })

    it("debe paginar resultados correctamente", async () => {
      const page1 = await getTransactions({
        page: 1,
        pageSize: 10
      })

      expect(page1.data.length).toBeLessThanOrEqual(10)
      expect(page1.meta.currentPage).toBe(1)
      expect(page1.meta.pageSize).toBe(10)
      expect(page1.meta.totalItems).toBeGreaterThan(0)
    })

    it("debe manejar errores de API correctamente", async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error"
      } as Response)

      await expect(async () => {
        await getTransactions({})
      }).rejects.toThrow("No se pudieron obtener las transacciones")
    })

    it("debe rechazar cuando TRANSACTIONS_ENDPOINT no está configurado", async () => {
      delete process.env.TRANSACTIONS_ENDPOINT

      await expect(async () => {
        await getTransactions({})
      }).rejects.toThrow("Configuración del servidor incompleta")
    })
  })

  describe("getSalesTotals - Pipeline completo", () => {
    it("debe obtener, filtrar por período y calcular totales", async () => {
      const result = await getSalesTotals("today")

      expect(global.fetch).toHaveBeenCalled()
      expect(result.total).toBeGreaterThan(0)
      expect(result.successfulCount).toBeGreaterThan(0)
      expect(typeof result.rejectedCount).toBe("number")
    })

    it("debe calcular totales solo de transacciones filtradas por período", async () => {
      const resultToday = await getSalesTotals("today")
      const resultAll = await getSalesTotals(undefined)

      expect(resultToday.total).toBeLessThanOrEqual(resultAll.total)
      expect(resultToday.successfulCount).toBeLessThanOrEqual(resultAll.successfulCount)
    })

    it("debe validar período antes de procesar", async () => {
      await expect(async () => {
        await getSalesTotals("invalid" as any)
      }).rejects.toThrow()
    })

    it("debe incluir solo transacciones SUCCESSFUL en el total", async () => {
      const result = await getSalesTotals(undefined)

      const expectedSuccessful = mockAPIResponse.data.filter(
        tx => tx.status === "SUCCESSFUL"
      ).length

      expect(result.successfulCount).toBe(expectedSuccessful)
      expect(result.total).toBeGreaterThan(0)
    })
  })
})
