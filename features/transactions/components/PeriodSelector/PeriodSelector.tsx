'use client'

import { useUrlFilter } from "@/features/transactions/hooks/useUrlFilter"
import { periodFilterSchema } from "@/features/transactions/schemas/filters.schema"
import { getCurrentMonthName } from "@/lib/utils/date-filters"
import type { PeriodFilter } from "@/lib/types"
import styles from './PeriodSelector.module.scss'
import TransactionFilter from "../Filter/Filter"

const PERIODS: ReadonlyArray<{ value: PeriodFilter; label: string }> = [
  { value: "today", label: "Hoy" },
  { value: "week", label: "Esta semana" },
  { value: "month", label: getCurrentMonthName() }
] as const


export default function PeriodSelector() {
  const { updateFilter, getFilter } = useUrlFilter()

  // Validar período actual con Zod
  let currentPeriod: PeriodFilter | undefined

  try {
    const periodParam = getFilter("period")
    if (periodParam) {
      currentPeriod = periodFilterSchema.parse(periodParam)
    }
  } catch (error) {
    // Período inválido en URL, ignorar
    console.warn("Período inválido en URL:", error)
  }

  const handlePeriodChange = (period: PeriodFilter) => {
    updateFilter("period", period)
  }

  return (
    <section className={styles.period_selector}>
      <div className={styles.period_selector__list}>
        {PERIODS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => handlePeriodChange(value)}
            className={`${styles.period_selector__item} ${
              currentPeriod === value ? styles.selected : ""
            }`}
            type="button"
            aria-pressed={currentPeriod === value}
            aria-label={`Filtrar por ${label}`}
          >
            {label}
          </button>
        ))}
      </div>
      <TransactionFilter />
    </section>
  )
}
