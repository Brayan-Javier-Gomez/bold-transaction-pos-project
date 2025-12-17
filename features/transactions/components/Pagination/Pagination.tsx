'use client'

import type { PaginationMeta } from "@/lib/types"
import { usePagination } from "@/features/transactions/hooks/usePagination"
import styles from "./Pagination.module.scss"

interface PaginationProps {
  readonly meta: PaginationMeta
}


export default function Pagination({ meta }: PaginationProps) {
  const { handlePrevious, handleNext, shouldShowPagination } = usePagination(meta)

  // No mostrar paginación si solo hay 1 página
  if (!shouldShowPagination) {
    return null
  }

  return (
    <nav className={styles.pagination} aria-label="Paginación de transacciones">
      <button
        onClick={handlePrevious}
        disabled={!meta.hasPreviousPage}
        className={styles.pagination__button}
        aria-label="Página anterior"
        type="button"
      >
        ← Anterior
      </button>

      <div className={styles.pagination__info}>
        <span className={styles.pagination__current}>
          Página {meta.currentPage}
        </span>
        <span className={styles.pagination__divider}>de</span>
        <span className={styles.pagination__total}>
          {meta.totalPages}
        </span>
      </div>

      <button
        onClick={handleNext}
        disabled={!meta.hasNextPage}
        className={styles.pagination__button}
        aria-label="Página siguiente"
        type="button"
      >
        Siguiente →
      </button>
    </nav>
  )
}
