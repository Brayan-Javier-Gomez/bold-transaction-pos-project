import { z } from "zod"


export const periodFilterSchema = z.enum(["today", "week", "month"])

export const searchQuerySchema = z
  .string()
  .min(1, "La búsqueda debe tener al menos 1 carácter")
  .max(100, "La búsqueda no puede exceder 100 caracteres")
  .regex(
    /^[a-zA-Z0-9\s\-_]*$/,
    "Solo se permiten caracteres alfanuméricos, espacios, guiones y guiones bajos"
  )
  .transform((val) => val.trim())

export const pageNumberSchema = z
  .number()
  .int("El número de página debe ser un entero")
  .positive("El número de página debe ser positivo")
  .min(1, "El número de página mínimo es 1")
  .max(10000, "El número de página máximo es 10000")
  .default(1)

export const pageSizeSchema = z
  .number()
  .int("El tamaño de página debe ser un entero")
  .positive("El tamaño de página debe ser positivo")
  .min(10, "El tamaño mínimo de página es 10")
  .max(100, "El tamaño máximo de página es 100")
  .default(20)

export const salesTypeFilterSchema = z.enum(["TERMINAL", "PAYMENT_LINK"])

export const paymentMethodSchema = z.enum(["NEQUI", "CARD", "BANCOLOMBIA", "PSE", "DAVIPLATA"])

export const transactionFiltersSchema = z.object({
  period: periodFilterSchema.optional(),
  search: searchQuerySchema.optional(),
  page: pageNumberSchema.optional(),
  pageSize: pageSizeSchema.optional(),
  paymentMethod: z.union([
    z.string().transform((val) => val.split(",").map(m => m.trim())),
    z.array(z.string())
  ])
    .pipe(z.array(paymentMethodSchema))
    .optional(),
  status: z.enum(["SUCCESSFUL", "REJECTED"]).optional(),
  salesType: salesTypeFilterSchema.optional()
})


export const urlSearchParamsSchema = z.object({
  period: z.string().optional(),
  search: z.string().optional(),
  page: z.string().optional(),
  pageSize: z.string().optional(),
  paymentMethod: z.string().optional(),
  status: z.string().optional(),
  salesType: z.string().optional()
}).transform((params) => {
  // Transformar strings a tipos correctos y validar
  const result: Record<string, unknown> = {}

  if (params.period) {
    result.period = params.period
  }

  if (params.search) {
    result.search = params.search
  }

  if (params.page) {
    const parsed = parseInt(params.page, 10)
    if (!isNaN(parsed)) {
      result.page = parsed
    }
  }

  if (params.pageSize) {
    const parsed = parseInt(params.pageSize, 10)
    if (!isNaN(parsed)) {
      result.pageSize = parsed
    }
  }

  if (params.paymentMethod) {
    result.paymentMethod = params.paymentMethod
  }

  if (params.status) {
    result.status = params.status
  }

  if (params.salesType) {
    result.salesType = params.salesType
  }

  // Validar con el schema completo
  return transactionFiltersSchema.parse(result)
})

export type PeriodFilterSchemaType = z.infer<typeof periodFilterSchema>
export type TransactionFiltersSchemaType = z.infer<typeof transactionFiltersSchema>
