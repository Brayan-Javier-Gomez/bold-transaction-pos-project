import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebounce } from "./useDebounce"
import { searchQuerySchema } from "@/features/transactions/schemas/filters.schema"


export function useSearchFilter(debounceDelay: number = 500) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") ?? "")
  const [validationError, setValidationError] = useState<string | null>(null)
  const validationErrorRef = useRef<string | null>(null)

  const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay)

  useEffect(() => {
    const currentSearch = searchParams.get("search")
    const params = new URLSearchParams(searchParams.toString())
    let shouldUpdate = false
    let newValidationError: string | null = null

    if (debouncedSearchTerm.trim()) {
      try {
        const sanitized = searchQuerySchema.parse(debouncedSearchTerm)

        if (currentSearch !== sanitized) {
          params.set("search", sanitized)
          params.delete("page")
          shouldUpdate = true
        }
      } catch (error) {
        if (error instanceof Error) {
          newValidationError = "Solo caracteres alfanuméricos permitidos"
        }
      }
    } else {
      if (currentSearch !== null) {
        params.delete("search")
        shouldUpdate = true
      }
    }

    if (shouldUpdate) {
      router.push(`?${params.toString()}`)
    }

    if (validationErrorRef.current !== newValidationError) {
      validationErrorRef.current = newValidationError
      queueMicrotask(() => {
        setValidationError(newValidationError)
      })
    }
  }, [debouncedSearchTerm, router, searchParams])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  const handleClear = useCallback(() => {
    setSearchTerm("")
    setValidationError(null)
  }, [])

  return {
    searchTerm,
    validationError,
    handleChange,
    handleClear,
  }
}
