import type { Transaction } from "@/lib/types"
import { filterByStatus, sumAmounts, countTransactions } from "./aggregation-helpers"


export interface SalesTotals {
  readonly total: number
  readonly successfulCount: number
  readonly rejectedCount: number
}

export function calculateSalesTotals(
  transactions: ReadonlyArray<Transaction>
): SalesTotals {
  const successful = filterByStatus(transactions, "SUCCESSFUL")
  const rejected = filterByStatus(transactions, "REJECTED")


  const total = sumAmounts(successful)

  return {
    total,
    successfulCount: countTransactions(successful),
    rejectedCount: countTransactions(rejected)
  }
}
