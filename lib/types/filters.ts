import type { PaymentMethod, TransactionStatus, SalesType } from "./transaction"


export type PeriodFilter = "today" | "week" | "month"

/**
 Filtros aplicables a las transacciones
 Todos readonly para inmutabilidad
 */
export interface TransactionFilters {
  readonly period?: PeriodFilter
  readonly search?: string
  readonly page?: number
  readonly pageSize?: number
  readonly paymentMethod?: PaymentMethod
  readonly status?: TransactionStatus
  readonly salesType?: SalesType
}


export interface PaginationMeta {
  readonly currentPage: number
  readonly pageSize: number
  readonly totalItems: number
  readonly totalPages: number
  readonly hasNextPage: boolean
  readonly hasPreviousPage: boolean
}

export interface PaginatedResponse<T> {
  readonly data: ReadonlyArray<T>
  readonly meta: PaginationMeta
}
