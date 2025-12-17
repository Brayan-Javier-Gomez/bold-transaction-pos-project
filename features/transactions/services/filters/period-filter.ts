import type { Transaction, PeriodFilter } from "@/lib/types"
import { getDateRangeForPeriod, filterTransactionsByDateRange } from "@/lib/utils/date-filters"


export function filterByPeriod(
  transactions: ReadonlyArray<Transaction>,
  period?: PeriodFilter
): ReadonlyArray<Transaction> {
  if (!period) {
    return transactions
  }

  const { start, end } = getDateRangeForPeriod(period)

  return filterTransactionsByDateRange(transactions, start, end)
}
