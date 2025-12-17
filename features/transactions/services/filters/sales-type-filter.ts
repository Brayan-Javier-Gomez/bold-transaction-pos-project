import type { Transaction, SalesType } from "@/lib/types"

export function filterBySalesType(
  transactions: ReadonlyArray<Transaction>,
  salesType?: SalesType
): ReadonlyArray<Transaction> {
  if (!salesType) {
    return transactions
  }

  return transactions.filter((tx) => tx.salesType === salesType)
}
