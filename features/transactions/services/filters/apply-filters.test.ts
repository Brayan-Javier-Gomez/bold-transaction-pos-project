import { describe, it, expect } from "vitest"
import { applyAllFilters } from "./apply-filters"
import type { Transaction, TransactionFilters } from "@/lib/types"

const mockTransactions: Transaction[] = [
  {
    id: "TRX001",
    status: "SUCCESSFUL",
    paymentMethod: "NEQUI",
    salesType: "TERMINAL",
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
    transactionReference: 123456,
    amount: 50000,
    deduction: 1500
  },
  {
    id: "TRX002",
    status: "REJECTED",
    paymentMethod: "CARD",
    salesType: "PAYMENT_LINK",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
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
    createdAt: Date.now() - 1000 * 60 * 30,
    transactionReference: 901234,
    amount: 25000,
    deduction: 750
  },
  {
    id: "TRX005",
    status: "SUCCESSFUL",
    paymentMethod: "NEQUI",
    salesType: "TERMINAL",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
    transactionReference: 567890,
    amount: 150000
  }
]

describe("apply-filters", () => {
  describe("applyAllFilters", () => {
    it("debe retornar todas las transacciones si no hay filtros", () => {
      const filters: TransactionFilters = {}
      const result = applyAllFilters(mockTransactions, filters)

      expect(result).toEqual(mockTransactions)
      expect(result.length).toBe(5)
    })

    it("debe filtrar por status", () => {
      const filters: TransactionFilters = { status: "SUCCESSFUL" }
      const result = applyAllFilters(mockTransactions, filters)

      expect(result.length).toBe(4)
      expect(result.every(tx => tx.status === "SUCCESSFUL")).toBe(true)
    })

    it("debe filtrar por múltiples métodos de pago", () => {
      const filters: TransactionFilters = {
        paymentMethod: ["NEQUI", "PSE"]
      }
      const result = applyAllFilters(mockTransactions, filters)

      expect(result.length).toBe(3)
      expect(result.every(tx =>
        tx.paymentMethod === "NEQUI" || tx.paymentMethod === "PSE"
      )).toBe(true)
    })

    it("debe filtrar por búsqueda", () => {
      const filters: TransactionFilters = { search: "NEQUI" }
      const result = applyAllFilters(mockTransactions, filters)

      expect(result.length).toBe(2)
      expect(result.every(tx => tx.paymentMethod === "NEQUI")).toBe(true)
    })

    it("debe combinar múltiples filtros", () => {
      const filters: TransactionFilters = {
        status: "SUCCESSFUL",
        salesType: "TERMINAL"
      }
      const result = applyAllFilters(mockTransactions, filters)

      expect(result.length).toBe(3)
      expect(result.every(tx =>
        tx.status === "SUCCESSFUL" && tx.salesType === "TERMINAL"
      )).toBe(true)
    })

    it("debe combinar todos los filtros disponibles", () => {
      const filters: TransactionFilters = {
        period: "today",
        status: "SUCCESSFUL",
        salesType: "TERMINAL",
        paymentMethod: ["NEQUI"],
        search: "TRX"
      }

      const result = applyAllFilters(mockTransactions, filters)

      expect(result.length).toBe(1)
      expect(result[0].id).toBe("TRX001")
    })

    it("debe retornar array vacío si los filtros no coinciden", () => {
      const filters: TransactionFilters = {
        status: "REJECTED",
        salesType: "TERMINAL"
      }
      const result = applyAllFilters(mockTransactions, filters)

      expect(result.length).toBe(0)
    })

    it("debe filtrar correctamente con período today", () => {
      const filters: TransactionFilters = { period: "today" }
      const result = applyAllFilters(mockTransactions, filters)

      expect(result.length).toBe(2)
    })

    it("debe ser función pura", () => {
      const original = [...mockTransactions]
      const filters: TransactionFilters = { status: "SUCCESSFUL" }

      applyAllFilters(mockTransactions, filters)

      expect(mockTransactions).toEqual(original)
    })
  })
})
