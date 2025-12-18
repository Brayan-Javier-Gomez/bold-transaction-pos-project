import { describe, it, expect } from "vitest"
import { calculatePaymentMethodStats } from "./payment-method-stats"
import type { Transaction } from "@/lib/types"

const mockTransactions: Transaction[] = [
  {
    id: "TRX001",
    status: "SUCCESSFUL",
    paymentMethod: "NEQUI",
    salesType: "TERMINAL",
    createdAt: 1700000000000,
    transactionReference: 123456,
    amount: 50000
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
    paymentMethod: "NEQUI",
    salesType: "TERMINAL",
    createdAt: 1700000002000,
    transactionReference: 345678,
    amount: 100000
  },
  {
    id: "TRX004",
    status: "SUCCESSFUL",
    paymentMethod: "CARD",
    salesType: "PAYMENT_LINK",
    createdAt: 1700000003000,
    transactionReference: 901234,
    amount: 75000,
    franchise: "MASTERCARD"
  },
  {
    id: "TRX005",
    status: "SUCCESSFUL",
    paymentMethod: "PSE",
    salesType: "TERMINAL",
    createdAt: 1700000004000,
    transactionReference: 567890,
    amount: 25000
  }
]

describe("payment-method-stats", () => {
  describe("calculatePaymentMethodStats", () => {
    it("debe calcular stats correctamente por método de pago", () => {
      const stats = calculatePaymentMethodStats(mockTransactions)

      expect(stats).toHaveLength(3)

      const nequiStats = stats.find(s => s.method === "NEQUI")
      expect(nequiStats).toBeDefined()
      expect(nequiStats?.total).toBe(150000)
      expect(nequiStats?.count).toBe(2)
      expect(nequiStats?.avgAmount).toBe(75000)
    })

    it("debe incluir solo transacciones SUCCESSFUL", () => {
      const stats = calculatePaymentMethodStats(mockTransactions)

      const cardStats = stats.find(s => s.method === "CARD")
      expect(cardStats?.total).toBe(75000)
      expect(cardStats?.count).toBe(1)
    })

    it("debe ordenar por total descendente", () => {
      const stats = calculatePaymentMethodStats(mockTransactions)

      expect(stats[0].method).toBe("NEQUI")
      expect(stats[1].method).toBe("CARD")
      expect(stats[2].method).toBe("PSE")

      for (let i = 0; i < stats.length - 1; i++) {
        expect(stats[i].total).toBeGreaterThanOrEqual(stats[i + 1].total)
      }
    })

    it("debe manejar array vacío", () => {
      const stats = calculatePaymentMethodStats([])
      expect(stats).toEqual([])
    })

    it("debe ser función pura", () => {
      const original = [...mockTransactions]
      calculatePaymentMethodStats(mockTransactions)
      expect(mockTransactions).toEqual(original)
    })
  })
})
