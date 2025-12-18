'use client'

import { useSearchFilter } from "@/features/transactions/hooks/useSearchFilter"
import styles from "./Search.module.scss"


export default function Search() {
  const { searchTerm, validationError, handleChange, handleClear } = useSearchFilter()

  return (
    <section className={styles.search}>
      <search role="search">
        <input
          type="search"
          inputMode="search"
          autoComplete="off"
          spellCheck={false}
          placeholder="Buscar"
          minLength={1}
          maxLength={100}
          pattern="[a-zA-Z0-9\s\-_]*"
          aria-label="Buscar transacciones"
          aria-invalid={validationError !== null}
          aria-describedby={validationError ? "search-error" : undefined}
          name="transaction-search"
          value={searchTerm}
          onChange={handleChange}
          className={styles.search__input}
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className={styles.search__clear}
            type="button"
            aria-label="Limpiar búsqueda"
          >
            ×
          </button>
        )}
      </search>
      {validationError && (
        <div id="search-error" className={styles.search__error} role="alert">
          {validationError}
        </div>
      )}
    </section>
  )
}
