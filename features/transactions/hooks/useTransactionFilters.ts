import { useState, useCallback, useEffect } from "react"
import { useUrlFilter } from "./useUrlFilter"
import type { PaymentMethod, SalesType } from "@/lib/types"

interface FilterState {
  salesType: SalesType | null
  paymentMethods: Set<PaymentMethod>
}

interface InternalState extends FilterState {
  hasChanges: boolean 
}


function parsePaymentMethods(param: string | null): Set<PaymentMethod> {
  if (!param) return new Set()

  const methods = param.split(",").map(m => m.trim()) as PaymentMethod[]
  return new Set(methods)
}

export function useTransactionFilters() {
  const { updateFilters, searchParams } = useUrlFilter()

  const currentSalesType = searchParams.get("salesType") as SalesType | null
  const currentPaymentMethod = searchParams.get("paymentMethod")

  const [filters, setFilters] = useState<FilterState>(() => ({
    salesType: currentSalesType,
    paymentMethods: parsePaymentMethods(currentPaymentMethod)
  }))

  useEffect(() => {
    setFilters({
      salesType: currentSalesType,
      paymentMethods: parsePaymentMethods(currentPaymentMethod)
    })
  }, [currentSalesType, currentPaymentMethod])

  const handleSalesTypeChange = useCallback((type: SalesType) => {
    setFilters((prev) => ({
      ...prev,
      salesType: prev.salesType === type ? null : type
    }))
  }, [])

  const handlePaymentMethodChange = useCallback((method: PaymentMethod) => {
    setFilters((prev) => {
      const newMethods = new Set(prev.paymentMethods)
      if (newMethods.has(method)) {
        newMethods.delete(method)
      } else {
        newMethods.add(method)
      }
      return {
        ...prev,
        paymentMethods: newMethods
      }
    })
  }, [])

  const handleClearAll = useCallback(() => {
    setFilters({
      salesType: null,
      paymentMethods: new Set()
    })
  }, [])

  const applyFilters = useCallback(() => {
    const filterUpdates: Record<string, string | null> = {
      salesType: filters.salesType,
      paymentMethod: null
    }

    if (filters.paymentMethods.size > 0) {
      const methods = Array.from(filters.paymentMethods).join(",")
      filterUpdates.paymentMethod = methods
    }

    updateFilters(filterUpdates)
  }, [filters, updateFilters])

  const isViewAllSelected = filters.paymentMethods.size === 0 && filters.salesType === null

  const hasActiveFilters = filters.paymentMethods.size > 0 || filters.salesType !== null

  return {
    filters,
    handleSalesTypeChange,
    handlePaymentMethodChange,
    handleClearAll,
    applyFilters,
    isViewAllSelected,
    hasActiveFilters
  }
}
