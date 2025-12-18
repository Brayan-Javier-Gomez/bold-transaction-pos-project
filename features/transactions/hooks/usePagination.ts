import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import type { PaginationMeta } from "@/lib/types"

export function usePagination(meta: PaginationMeta) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const goToPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("page", page.toString())
      router.replace(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams]
  )

  const handlePrevious = useCallback(() => {
    if (meta.hasPreviousPage) {
      goToPage(meta.currentPage - 1)
    }
  }, [meta.hasPreviousPage, meta.currentPage, goToPage])

  const handleNext = useCallback(() => {
    if (meta.hasNextPage) {
      goToPage(meta.currentPage + 1)
    }
  }, [meta.hasNextPage, meta.currentPage, goToPage])

  return {
    goToPage,
    handlePrevious,
    handleNext,
    canGoPrevious: meta.hasPreviousPage,
    canGoNext: meta.hasNextPage,
    shouldShowPagination: meta.totalPages > 1,
  }
}
