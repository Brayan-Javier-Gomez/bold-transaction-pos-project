import { Suspense } from "react"
import { getTransactions } from "@/features/transactions/services/transaction.service"
import { urlSearchParamsSchema } from "@/features/transactions/schemas/filters.schema"
import TransactionRow from "./TransactionRow"
import TableSkeleton from "./TableSkeleton"
import type { TransactionFilters } from "@/lib/types"
import styles from "./TransactionTable.module.scss"

interface TransactionTableProps {
  readonly searchParams?: { [key: string]: string | string[] | undefined }
}


async function TransactionTableContent({ filters }: { readonly filters: TransactionFilters }) {
  const { data: transactions, meta } = await getTransactions(filters)

  if (transactions.length === 0) {
    return (
      <div className={styles.empty__state}>
        No se encontraron transacciones con los filtros seleccionados
      </div>
    )
  }

  return (
    <>
      <table className={styles.transaction__table}>
        <thead className={styles.transaction__table__head}>
          <tr>
            <th>Transacción</th>
            <th>Fecha y hora</th>
            <th>Método de pago</th>
            <th>ID transacción Bold</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody className={styles.transaction__table__body}>
          {transactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}


export default async function TransactionTable({ searchParams }: TransactionTableProps) {
  let filters: TransactionFilters = { page: 1, pageSize: 20 }

  try {
    const params = Object.fromEntries(
      Object.entries(searchParams ?? {}).map(([key, value]) => [
        key,
        Array.isArray(value) ? value[0] : value
      ])
    )

    // Validar con Zod
    filters = urlSearchParamsSchema.parse(params)
  } catch (error) {
    console.warn("Query params inválidos:", error)
  }

  return (
    <Suspense fallback={<TableSkeleton />}>
      <TransactionTableContent filters={filters} />
    </Suspense>
  )
}
