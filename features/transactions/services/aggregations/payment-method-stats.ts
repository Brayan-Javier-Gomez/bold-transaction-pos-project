import type { Transaction, PaymentMethod } from "@/lib/types"
import { filterByStatus, sumAmounts, countTransactions, calculateAverageAmount } from "./aggregation-helpers"


export interface PaymentMethodStats {
  readonly method: PaymentMethod
  readonly total: number
  readonly count: number
  readonly avgAmount: number
}

export function calculatePaymentMethodStats(
  transactions: ReadonlyArray<Transaction>
): ReadonlyArray<PaymentMethodStats> {

  const successful = filterByStatus(transactions, "SUCCESSFUL")

  const groupedByMethod = groupByPaymentMethod(successful)

  const stats: PaymentMethodStats[] = []

  groupedByMethod.forEach((txs, method) => {
    stats.push({
      method,
      total: sumAmounts(txs),
      count: countTransactions(txs),
      avgAmount: calculateAverageAmount(txs)
    })
  })

  return stats.sort((a, b) => b.total - a.total)
}


function groupByPaymentMethod(
  transactions: ReadonlyArray<Transaction>
): Map<PaymentMethod, Transaction[]> {
  const grouped = new Map<PaymentMethod, Transaction[]>()

  transactions.forEach((tx) => {
    const current = grouped.get(tx.paymentMethod) ?? []
    grouped.set(tx.paymentMethod, [...current, tx])
  })

  return grouped
}
