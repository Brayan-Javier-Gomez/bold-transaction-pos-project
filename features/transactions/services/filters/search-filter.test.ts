import { describe, it, expect } from "vitest"
import { filterBySearch } from "./search-filter"
import type { Transaction } from "@/lib/types"

const mockTransactions: Transaction[] = [
  {
    id: "TRX001",
    status: "SUCCESSFUL",
    paymentMethod: "NEQUI",
    salesType: "TERMINAL",
    createdAt: 1700000000000,
    transactionReference: 123456,
    amount: 50000,
    deduction: 1500
  },
  {
    id: "TRX002",
    status: "REJECTED",
    paymentMethod: "CARD",
    salesType: "PAYMENT_LINK",
    createdAt: 1700000001000,
    transactionReference: 789012,
    amount: 100000,
    franchise: "VISA"
  },
  {
    id: "TRX003",
    status: "SUCCESSFUL",
    paymentMethod: "BANCOLOMBIA",
    salesType: "TERMINAL",
    createdAt: 1700000002000,
    transactionReference: 345678,
    amount: 75000
  },
  {
    id: "TRX004",
    status: "SUCCESSFUL",
    paymentMethod: "PSE",
    salesType: "PAYMENT_LINK",
    createdAt: 1700000003000,
    transactionReference: 901234,
    amount: 25000,
    deduction: 750
  }
]

describe("search-filter", () => {
  describe("filterBySearch", () => {
    it("debe retornar todas las transacciones si no hay término", () => {
      const result = filterBySearch(mockTransactions)
      expect(result).toEqual(mockTransactions)
    })

    it("debe retornar todas si el término es solo espacios", () => {
      const result = filterBySearch(mockTransactions, "   ")
      expect(result).toEqual(mockTransactions)
    })

    it("debe buscar por ID de forma case-insensitive", () => {
      const result = filterBySearch(mockTransactions, "trx001")
      expect(result.length).toBe(1)
      expect(result[0].id).toBe("TRX001")
    })

    it("debe buscar por referencia de transacción", () => {
      const result = filterBySearch(mockTransactions, "123456")
      expect(result.length).toBe(1)
      expect(result[0].transactionReference).toBe(123456)
    })

    it("debe buscar por monto", () => {
      const result = filterBySearch(mockTransactions, "50000")
      expect(result.length).toBe(1)
      expect(result[0].amount).toBe(50000)
    })

    it("debe buscar por método de pago case-insensitive", () => {
      const result = filterBySearch(mockTransactions, "nequi")
      expect(result.length).toBe(1)
      expect(result[0].paymentMethod).toBe("NEQUI")
    })

    it("debe buscar por franquicia si existe", () => {
      const result = filterBySearch(mockTransactions, "VISA")
      expect(result.length).toBe(1)
      expect(result[0].franchise).toBe("VISA")
    })

    it("debe buscar parcialmente en los campos", () => {
      const result = filterBySearch(mockTransactions, "TRX")
      expect(result.length).toBe(4)
    })

    it("debe retornar array vacío si no hay coincidencias", () => {
      const result = filterBySearch(mockTransactions, "NOEXISTE")
      expect(result.length).toBe(0)
    })

    it("debe sanitizar el término de búsqueda", () => {
      const result = filterBySearch(mockTransactions, "  TRX001  ")
      expect(result.length).toBe(1)
      expect(result[0].id).toBe("TRX001")
    })

    it("debe ser función pura", () => {
      const original = [...mockTransactions]
      filterBySearch(mockTransactions, "NEQUI")
      expect(mockTransactions).toEqual(original)
    })

    it("debe manejar campos opcionales sin fallar", () => {
      const txWithNulls: Transaction[] = [
        {
          id: "TRX888",
          status: "SUCCESSFUL",
          paymentMethod: "NEQUI",
          salesType: "TERMINAL",
          createdAt: 1700000000000,
          transactionReference: 888888,
          amount: 40000,
          franchise: undefined,
          deduction: undefined
        }
      ]

      expect(() => filterBySearch(txWithNulls, "VISA")).not.toThrow()
      const result = filterBySearch(txWithNulls, "VISA")
      expect(result.length).toBe(0)
    })
  })
})
