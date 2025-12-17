import type { Transaction, TransactionFilters } from "@/lib/types"
import { filterByPeriod } from "./period-filter"
import { filterBySearch } from "./search-filter"
import { filterByPaymentMethod } from "./payment-method-filter"
import { filterByStatus } from "./status-filter"
import { filterBySalesType } from "./sales-type-filter"


export function applyAllFilters(
  transactions: ReadonlyArray<Transaction>,
  filters: TransactionFilters
): ReadonlyArray<Transaction> {
  let filtered: ReadonlyArray<Transaction> = transactions

  filtered = filterByPeriod(filtered, filters.period)

  filtered = filterByStatus(filtered, filters.status)

  filtered = filterBySalesType(filtered, filters.salesType)

  filtered = filterByPaymentMethod(filtered, filters.paymentMethod)

  filtered = filterBySearch(filtered, filters.search)

  return filtered
}
