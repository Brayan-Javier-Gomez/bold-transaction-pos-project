import { ZodError } from "zod"
import { transactionFiltersSchema } from "../schemas/filters.schema"
import type { TransactionFilters } from "@/lib/types"


export class TransactionValidationError extends Error {
  public readonly code: string
  public readonly field?: string
  public readonly validationErrors: Array<{ field: string; message: string }>

  constructor(message: string, validationErrors: Array<{ field: string; message: string }> = []) {
    super(message)
    this.name = "TransactionValidationError"
    this.code = "VALIDATION_ERROR"
    this.validationErrors = validationErrors

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TransactionValidationError)
    }
  }
}


function formatZodErrors(error: ZodError): Array<{ field: string; message: string }> {
  const issues = error.issues

  if (!issues || !Array.isArray(issues)) {
    return [{ field: "unknown", message: error.message || "Error de validación desconocido" }]
  }

  return issues.map((issue) => ({
    field: issue.path && issue.path.length > 0 ? issue.path.join(".") : "root",
    message: issue.message
  }))
}


export function validateTransactionFilters(
  filters: unknown
): TransactionFilters {
  try {

    if (filters === null || typeof filters !== "object") {
      throw new TransactionValidationError(
        "Los filtros deben ser un objeto válido",
        [{ field: "filters", message: "Se esperaba un objeto, se recibió " + typeof filters }]
      )
    }

    const validated = transactionFiltersSchema.parse(filters)

    return validated
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = formatZodErrors(error)
      throw new TransactionValidationError(
        "Error de validación en los filtros de transacciones",
        formattedErrors
      )
    }

    if (error instanceof TransactionValidationError) {
      throw error
    }

    // Error inesperado
    throw new TransactionValidationError(
      "Error inesperado durante la validación",
      [{ field: "unknown", message: error instanceof Error ? error.message : String(error) }]
    )
  }
}

export function validatePeriod(period: unknown): "today" | "week" | "month" | undefined {
  if (period === undefined || period === null) {
    return undefined
  }

  const validPeriods = ["today", "week", "month"] as const

  if (typeof period !== "string" || !validPeriods.includes(period as typeof validPeriods[number])) {
    const validPeriodsStr = validPeriods.join(", ")
    throw new TransactionValidationError(
      `El período debe ser uno de: ${validPeriodsStr}`,
      [{
        field: "period",
        message: `El período debe ser uno de: ${validPeriodsStr}`
      }]
    )
  }

  return period as typeof validPeriods[number]
}


export function validateFiltersSecurity(filters: TransactionFilters): boolean {

  if (filters.page !== undefined && (filters.page < 1 || filters.page > 10000)) {
    throw new TransactionValidationError(
      "Número de página fuera de rango",
      [{ field: "page", message: "La página debe estar entre 1 y 10000" }]
    )
  }

  if (filters.pageSize !== undefined && (filters.pageSize < 10 || filters.pageSize > 100)) {
    throw new TransactionValidationError(
      "Tamaño de página fuera de rango",
      [{ field: "pageSize", message: "El tamaño de página debe estar entre 10 y 100" }]
    )
  }

  if (filters.paymentMethod && filters.paymentMethod.length > 10) {
    throw new TransactionValidationError(
      "Demasiados métodos de pago seleccionados",
      [{ field: "paymentMethod", message: "Máximo 10 métodos de pago permitidos" }]
    )
  }

  return true
}
