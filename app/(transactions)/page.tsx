import { redirect } from "next/navigation"
import SalesResumeCard from "@/features/transactions/components/SalesResumeCard/SalesResumeCard"
import PeriodSelector from "@/features/transactions/components/PeriodSelector/PeriodSelector"
import Search from "@/features/transactions/components/Search/Search"
import TransactionTable from "@/features/transactions/components/TransactionTable/TransactionTable"
import { periodFilterSchema } from "@/features/transactions/schemas/filters.schema"
import { getPeriodDisplayName } from "@/lib/utils/date-filters"
import type { PeriodFilter } from "@/lib/types"
import styles from "./Transactions.module.scss"

interface PageProps {
  readonly searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}


export default async function TransactionsPage({ searchParams }: PageProps) {

  const params = await searchParams

  /* redirideccion a period "today" por defecto */
  if (!params?.period) {
    const newParams = new URLSearchParams()
    newParams.set("period", "today")

    /* Mantenr otros parámetros existentes */
    Object.entries(params ?? {}).forEach(([key, value]) => {
      if (value && !Array.isArray(value)) {
        newParams.set(key, value)
      }
    })

    redirect(`?${newParams.toString()}`)
  }

  let period: PeriodFilter | undefined

  try {
    const periodParam = params?.period
    if (typeof periodParam === "string") {
      period = periodFilterSchema.parse(periodParam)
    }
  } catch (error) {

    console.warn("Período inválido en URL:", error)
  }

  const periodTitle = getPeriodDisplayName(period)

  return (
    <main className={styles.transaction__page}>
      {/* Transaction resume */}
      <section className={styles.transactions__resume}>
        <SalesResumeCard period={period} />
        <PeriodSelector />
      </section>

      {/* Transaction table */}
      <section className={styles.transactions__section}>
        <div className={styles.transactions__section__header}>
          <p className={styles.transactions__section__title}>
            Tus ventas de {periodTitle}
          </p>
        </div>
        <Search />
        <TransactionTable searchParams={params} />
      </section>
    </main>
  )
}
