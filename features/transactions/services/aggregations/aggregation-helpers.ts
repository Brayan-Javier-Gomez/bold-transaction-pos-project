import type { Transaction, TransactionStatus } from "@/lib/types"


export function filterByStatus(
  transactions: ReadonlyArray<Transaction>,
  status: TransactionStatus
): ReadonlyArray<Transaction> {
  return transactions.filter((tx) => tx.status === status)
}

export function sumAmounts(transactions: ReadonlyArray<Transaction>): number {
  return transactions.reduce((sum, tx) => sum + tx.amount, 0)
}


export function countTransactions(transactions: ReadonlyArray<Transaction>): number {
  return transactions.length
}


export function calculateAverageAmount(transactions: ReadonlyArray<Transaction>): number {
  if (transactions.length === 0) {
    return 0
  }

  const total = sumAmounts(transactions)
  return Math.round(total / transactions.length)
}
