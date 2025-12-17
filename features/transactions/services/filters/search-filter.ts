import type { Transaction } from "@/lib/types"
import { sanitizeString } from "@/lib/utils/format"


const SEARCHABLE_FIELDS = {
  id: (tx: Transaction) => tx.id.toLowerCase(),
  transactionReference: (tx: Transaction) => tx.transactionReference.toString(),
  amount: (tx: Transaction) => tx.amount.toString(),
  paymentMethod: (tx: Transaction) => tx.paymentMethod.toLowerCase(),
  franchise: (tx: Transaction) => tx.franchise?.toLowerCase() ?? "",
  status: (tx: Transaction) => tx.status.toLowerCase(),
  salesType: (tx: Transaction) => tx.salesType.toLowerCase(),
  deduction: (tx: Transaction) => tx.deduction?.toString() ?? ""
} as const


function matchesSearch(transaction: Transaction, searchTerm: string): boolean {
  if (!searchTerm) {
    return true
  }

  for (const fieldGetter of Object.values(SEARCHABLE_FIELDS)) {
    const fieldValue = fieldGetter(transaction)

    if (fieldValue && fieldValue.includes(searchTerm)) {
      return true
    }
  }

  return false
}

export function filterBySearch(
  transactions: ReadonlyArray<Transaction>,
  searchQuery?: string
): ReadonlyArray<Transaction> {

  if (!searchQuery || searchQuery.trim().length === 0) {
    return transactions
  }

  // Sanitizar y normalizar el término de búsqueda
  const sanitizedSearch = sanitizeString(searchQuery).toLowerCase()

  // Filtrar transacciones que coincidan con la búsqueda
  return transactions.filter((tx) => matchesSearch(tx, sanitizedSearch))
}
