import type { Transaction } from "@/lib/types"

/**
 * Tasa de deducción por defecto (2%)
 */
const DEFAULT_DEDUCTION_RATE = 0.02

export function enrichWithDeduction(
  transaction: Transaction,
  deductionRate: number = DEFAULT_DEDUCTION_RATE
): Transaction {
  //omite transacciones con una deduccion fija en el set de datos
  if (transaction.deduction !== undefined) {
    return transaction
  }

  // Solo aplicar deducciones a transacciones exitosas
  if (transaction.status !== "SUCCESSFUL") {
    return transaction
  }

  const calculatedDeduction = transaction.amount * deductionRate

  return {
    ...transaction,
    deduction: calculatedDeduction
  }
}

export function enrichTransactionsWithDeductions(
  transactions: ReadonlyArray<Transaction>,
  deductionRate: number = DEFAULT_DEDUCTION_RATE
): ReadonlyArray<Transaction> {
  return transactions.map(t => enrichWithDeduction(t, deductionRate))
}
