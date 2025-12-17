import type { Transaction, PaymentMethod } from "@/lib/types"

export function filterByPaymentMethod(
  transactions: ReadonlyArray<Transaction>,
  paymentMethods?: PaymentMethod[]
): ReadonlyArray<Transaction> {
  if (!paymentMethods || paymentMethods.length === 0) {
    return transactions
  }
  return transactions.filter((tx) => paymentMethods.includes(tx.paymentMethod))
}
