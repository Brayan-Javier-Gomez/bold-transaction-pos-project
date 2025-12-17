'use client'

import { useToggle } from "@/features/transactions/hooks/useToggle"
import { useModalManager } from "@/features/transactions/hooks/useModalManager"
import { usePaymentMethods } from "@/features/transactions/hooks/usePaymentMethods"
import { useSalesTypes } from "@/features/transactions/hooks/useSalesTypes"
import { useTransactionFilters } from "@/features/transactions/hooks/useTransactionFilters"
import FilterCheckbox from "./FilterCheckbox"
import styles from "./Filter.module.scss"

export default function TransactionFilter() {
  const paymentMethodOptions = usePaymentMethods()
  const salesTypeOptions = useSalesTypes()
  const [isOpen, toggle, , close] = useToggle(false)

  const {
    filters,
    handleSalesTypeChange,
    handlePaymentMethodChange,
    handleClearAll,
    applyFilters,
    isViewAllSelected,
    hasActiveFilters
  } = useTransactionFilters()

  // Manejar modal (Escape key, body scroll lock)
  useModalManager(isOpen, { onClose: close })

  const handleApply = () => {
    applyFilters()
    close()
  }

  const handleViewAllChange = () => {
    if (!isViewAllSelected) {
      handleClearAll()
    }
  }

  return (
    <aside className={styles.transaction__filter}>
      <button
        className={styles.transaction__filter__button}
        onClick={toggle}
        type="button"
        aria-label="Abrir filtros"
        aria-expanded={isOpen}
      >
        Filtrar
      </button>

      {isOpen && (
        <>
          <div
            className={styles.transaction__filter__overlay}
            onClick={close}
            aria-hidden="true"
          />
          <section
            className={`${styles.transaction__filter__content} ${isOpen ? styles.open : ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-title"
          >
            <p
              id="filter-title"
              className={styles.transaction__filter__content__header}
            >
              Filtrar
            </p>
            <button
              className={styles.transaction__filter__content__close}
              onClick={close}
              type="button"
              aria-label="Cerrar filtros"
            >
              ×
            </button>

            <form className={styles.transaction__filter__content__form}>
              {/* Ver todos */}
              <fieldset>
                <legend className={styles.filter__legend}>Todos</legend>
                <FilterCheckbox
                  id="payment-all"
                  label="Ver todos"
                  checked={isViewAllSelected}
                  onChange={handleViewAllChange}
                  name="paymentMethod"
                />
              </fieldset>

              {/* Filtro por tipo de venta */}
              <fieldset>
                <legend className={styles.filter__legend}>Tipo de cobro</legend>
                {salesTypeOptions.map(({ value, label }) => (
                  <FilterCheckbox
                    key={value}
                    id={value.toLowerCase()}
                    label={label}
                    checked={filters.salesType === value}
                    onChange={() => handleSalesTypeChange(value)}
                    name="salesType"
                  />
                ))}
              </fieldset>

              {/* Filtro por método de pago */}
              <fieldset>
                <legend className={styles.filter__legend}>Método de pago</legend>
                {paymentMethodOptions.map(({ value, label }) => (
                  <FilterCheckbox
                    key={value}
                    id={`payment-${value}`}
                    label={label}
                    checked={filters.paymentMethods.has(value)}
                    onChange={() => handlePaymentMethodChange(value)}
                    name="paymentMethod"
                  />
                ))}
              </fieldset>

              <div className={styles.filter__actions}>
                <button
                  type="button"
                  onClick={handleApply}
                  className={`${styles.transaction__filter__content__apply} ${(hasActiveFilters || isViewAllSelected) ? styles.active : ''}`}
                >
                  Aplicar
                </button>
              </div>
            </form>
          </section>
        </>
      )}
    </aside>
  )
}
