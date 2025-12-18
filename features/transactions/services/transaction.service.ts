import { transactionAPIResponseSchema } from "../schemas/transaction.schema"
import type { Transaction, TransactionFilters, PaginatedResponse } from "@/lib/types"
import { paginateData } from "@/lib/utils/pagination"
import {
  validateTransactionFilters,
  validatePeriod,
  validateFiltersSecurity
} from "./validators"
import { applyAllFilters, filterByPeriod } from "./filters"
import { calculateSalesTotals } from "./aggregations"
import { enrichTransactionsWithDeductions } from "./enrichers"

async function fetchTransactionsFromAPI(): Promise<ReadonlyArray<Transaction>> {
  const endpoint = process.env.TRANSACTIONS_ENDPOINT

  if (!endpoint) {
    console.error("TRANSACTIONS_ENDPOINT no está configurado en las variables de entorno")
    throw new Error("Configuración del servidor incompleta")
  }

  try {
    const response = await fetch(endpoint, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`)
      throw new Error("Error al obtener las transacciones del servidor")
    }

    const rawData = await response.json()

    const validatedData = transactionAPIResponseSchema.parse(rawData)

    // Enriquecer transacciones con deducciones calculadas 2%
    return enrichTransactionsWithDeductions(validatedData.data)
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching transactions:", error.message)
    }
    throw new Error("No se pudieron obtener las transacciones")
  }
}

function filterTransactions(
  transactions: ReadonlyArray<Transaction>,
  filters: TransactionFilters
): ReadonlyArray<Transaction> {
  return applyAllFilters(transactions, filters)
}

export async function getTransactions(
  filters: TransactionFilters = {}
): Promise<PaginatedResponse<Transaction>> {
  // Aplicar defaults antes de validar
  const filtersWithDefaults = {
    page: 1,
    pageSize: 20,
    ...filters
  }

  const validatedFilters = validateTransactionFilters(filtersWithDefaults)

  validateFiltersSecurity(validatedFilters)

  const allTransactions = await fetchTransactionsFromAPI()

  const filteredTransactions = filterTransactions(allTransactions, validatedFilters)

  const sortedTransactions = [...filteredTransactions].sort((a, b) => b.createdAt - a.createdAt)

  const page = validatedFilters.page ?? 1
  const pageSize = validatedFilters.pageSize ?? 20

  return paginateData(sortedTransactions, page, pageSize)
}

export async function getSalesTotals(period?: TransactionFilters['period']): Promise<{
  total: number
  successfulCount: number
  rejectedCount: number
}> {

  const validatedPeriod = validatePeriod(period)

  const allTransactions = await fetchTransactionsFromAPI()

  const filteredTransactions = filterByPeriod(allTransactions, validatedPeriod)

  return calculateSalesTotals(filteredTransactions)
}


