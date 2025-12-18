import { describe, it, expect } from "vitest"
import { calculateSalesTotals } from "./sales-totals"
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

describe("sales-totals", () => {
  describe("calculateSalesTotals", () => {
    it("debe calcular totales correctamente", () => {
      const result = calculateSalesTotals(mockTransactions)

      expect(result.total).toBe(150000)
      expect(result.successfulCount).toBe(3)
      expect(result.rejectedCount).toBe(1)
    })

    it("debe manejar array vacío", () => {
      const result = calculateSalesTotals([])

      expect(result.total).toBe(0)
      expect(result.successfulCount).toBe(0)
      expect(result.rejectedCount).toBe(0)
    })

    it("debe sumar montos solo de transacciones SUCCESSFUL", () => {
      const result = calculateSalesTotals(mockTransactions)

      expect(result.total).not.toBe(250000)
      expect(result.total).toBe(150000)
    })

    it("debe manejar solo transacciones rejected", () => {
      const onlyRejected: Transaction[] = mockTransactions.filter(
        tx => tx.status === "REJECTED"
      )

      const result = calculateSalesTotals(onlyRejected)

      expect(result.total).toBe(0)
      expect(result.successfulCount).toBe(0)
      expect(result.rejectedCount).toBe(1)
    })

    it("debe ser función pura", () => {
      const original = [...mockTransactions]
      calculateSalesTotals(mockTransactions)
      expect(mockTransactions).toEqual(original)
    })
  })
})
