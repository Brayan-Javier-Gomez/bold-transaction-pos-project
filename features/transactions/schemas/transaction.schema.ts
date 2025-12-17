import { z } from "zod"

export const transactionSchema = z.object({
  id: z.string().min(1).max(50),
  status: z.enum(["SUCCESSFUL", "REJECTED"]),
  paymentMethod: z.enum(["NEQUI", "CARD", "BANCOLOMBIA", "PSE", "DAVIPLATA"]),
  salesType: z.enum(["TERMINAL", "PAYMENT_LINK"]),
  createdAt: z.number().int().positive(),
  transactionReference: z.number().int().positive(),
  amount: z.number().int().positive(),
  deduction: z.number().int().positive().optional(),
  franchise: z.enum(["VISA", "MASTERCARD"]).optional()
}).strict()


export const transactionAPIResponseSchema = z.object({
  data: z.array(transactionSchema)
}).strict()


export type TransactionSchemaType = z.infer<typeof transactionSchema>
export type TransactionAPIResponseSchemaType = z.infer<typeof transactionAPIResponseSchema>
