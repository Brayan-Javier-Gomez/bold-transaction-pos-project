import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"


export function useUrlFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = useCallback(
    (key: string, value: string | null, resetPage = true) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value === null) {
        params.delete(key)
      } else {
        params.set(key, value)
      }

      if (resetPage) {
        params.delete("page")
      }

      router.push(`?${params.toString()}`)
    },
    [router, searchParams]
  )

  const updateFilters = useCallback(
    (filters: Record<string, string | null>, resetPage = true) => {
      const params = new URLSearchParams(searchParams.toString())

      Object.entries(filters).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      })

      if (resetPage) {
        params.delete("page")
      }

      router.push(`?${params.toString()}`)
    },
    [router, searchParams]
  )


  const getFilter = useCallback(
    (key: string): string | null => {
      return searchParams.get(key)
    },
    [searchParams]
  )


  const removeFilters = useCallback(
    (...keys: string[]) => {
      const params = new URLSearchParams(searchParams.toString())
      keys.forEach((key) => params.delete(key))
      router.push(`?${params.toString()}`)
    },
    [router, searchParams]
  )


  const clearFilters = useCallback(
    (keepKeys: string[] = []) => {
      const params = new URLSearchParams()

      keepKeys.forEach((key) => {
        const value = searchParams.get(key)
        if (value !== null) {
          params.set(key, value)
        }
      })

      router.push(`?${params.toString()}`)
    },
    [router, searchParams]
  )

  return {
    updateFilter,
    updateFilters,
    getFilter,
    removeFilters,
    clearFilters,
    searchParams
  }
}
