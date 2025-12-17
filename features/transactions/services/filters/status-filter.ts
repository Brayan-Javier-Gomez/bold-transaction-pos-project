import type { Transaction, TransactionStatus } from "@/lib/types"

export function filterByStatus(
  transactions: ReadonlyArray<Transaction>,
  status?: TransactionStatus
): ReadonlyArray<Transaction> {
  if (!status) {
    return transactions
  }

  return transactions.filter((tx) => tx.status === status)
}
