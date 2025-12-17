
export type TransactionStatus = "SUCCESSFUL" | "REJECTED"
export type SalesType = "TERMINAL" | "PAYMENT_LINK"
export type PaymentMethod = "NEQUI" | "CARD" | "BANCOLOMBIA" | "PSE" | "DAVIPLATA"
export type Franchise = "VISA" | "MASTERCARD"


export interface Transaction {
  readonly id: string
  readonly status: TransactionStatus
  readonly paymentMethod: PaymentMethod
  readonly salesType: SalesType
  readonly createdAt: number
  readonly transactionReference: number
  readonly amount: number
  readonly deduction?: number
  readonly franchise?: Franchise
}

export interface TransactionAPIResponse {
  readonly data: ReadonlyArray<Transaction>
}
