import { describe, it, expect } from "vitest"
import { enrichWithDeduction, enrichTransactionsWithDeductions } from "./deduction-enricher"
import type { Transaction } from "@/lib/types"

const mockSuccessfulTransaction: Transaction = {
  id: "TRX001",
  status: "SUCCESSFUL",
  paymentMethod: "NEQUI",
  salesType: "TERMINAL",
  createdAt: 1700000000000,
  transactionReference: 123456,
  amount: 50000
}

const mockRejectedTransaction: Transaction = {
  id: "TRX002",
  status: "REJECTED",
  paymentMethod: "CARD",
  salesType: "PAYMENT_LINK",
  createdAt: 1700000001000,
  transactionReference: 789012,
  amount: 100000
}

const mockTransactionWithDeduction: Transaction = {
  id: "TRX003",
  status: "SUCCESSFUL",
  paymentMethod: "PSE",
  salesType: "TERMINAL",
  createdAt: 1700000002000,
  transactionReference: 345678,
  amount: 75000,
  deduction: 2500
}

describe("deduction-enricher", () => {
  describe("enrichWithDeduction", () => {
    it("debe calcular deducción del 2% en transacción exitosa", () => {
      const result = enrichWithDeduction(mockSuccessfulTransaction)

      expect(result.deduction).toBe(1000)
      expect(result.amount).toBe(50000)
      expect(result.id).toBe("TRX001")
    })

    it("no debe calcular deducción en transacción rechazada", () => {
      const result = enrichWithDeduction(mockRejectedTransaction)

      expect(result.deduction).toBeUndefined()
      expect(result).toEqual(mockRejectedTransaction)
    })

    it("no debe sobrescribir deducción existente", () => {
      const result = enrichWithDeduction(mockTransactionWithDeduction)

      expect(result.deduction).toBe(2500)
      expect(result).toEqual(mockTransactionWithDeduction)
    })

    it("debe permitir personalizar la tasa de deducción", () => {
      const result = enrichWithDeduction(mockSuccessfulTransaction, 0.05)

      expect(result.deduction).toBe(2500)
    })

    it("debe ser función pura", () => {
      const original = { ...mockSuccessfulTransaction }
      enrichWithDeduction(mockSuccessfulTransaction)

      expect(mockSuccessfulTransaction).toEqual(original)
    })
  })

  describe("enrichTransactionsWithDeductions", () => {
    it("debe enriquecer array de transacciones", () => {
      const transactions = [
        mockSuccessfulTransaction,
        mockRejectedTransaction,
        mockTransactionWithDeduction
      ]

      const result = enrichTransactionsWithDeductions(transactions)

      expect(result).toHaveLength(3)
      expect(result[0].deduction).toBe(1000)
      expect(result[1].deduction).toBeUndefined()
      expect(result[2].deduction).toBe(2500)
    })

    it("debe manejar array vacío", () => {
      const result = enrichTransactionsWithDeductions([])

      expect(result).toEqual([])
    })

    it("debe ser función pura", () => {
      const transactions = [mockSuccessfulTransaction, mockRejectedTransaction]
      const original = [...transactions]

      enrichTransactionsWithDeductions(transactions)

      expect(transactions).toEqual(original)
    })
  })
})
