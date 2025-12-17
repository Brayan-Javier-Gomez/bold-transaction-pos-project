import type { PaginatedResponse } from "@/lib/types"


export function paginateData<T>(
  data: ReadonlyArray<T>,
  page: number,
  pageSize: number
): PaginatedResponse<T> {
  const totalItems = data.length
  const totalPages = Math.ceil(totalItems / pageSize) || 1

  // Validación de seguridad: ajustar página si está fuera de rango
  let currentPage = page
  if (currentPage > totalPages) {
    currentPage = totalPages
  }
  if (currentPage < 1) {
    currentPage = 1
  }

  // Calcular índices
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)

  // Extraer slice de datos
  const paginatedData = data.slice(startIndex, endIndex)

  return {
    data: paginatedData,
    meta: {
      currentPage,
      pageSize,
      totalItems,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1
    }
  }
}


export function getItemRange(
  currentPage: number,
  pageSize: number,
  totalItems: number
): { start: number; end: number } {
  const start = (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalItems)
  return { start, end }
}


export function getVisiblePages(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
): number[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const half = Math.floor(maxVisible / 2)
  let start = currentPage - half
  let end = currentPage + half

  if (start < 1) {
    start = 1
    end = maxVisible
  }

  if (end > totalPages) {
    end = totalPages
    start = totalPages - maxVisible + 1
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}
