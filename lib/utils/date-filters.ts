import type { PeriodFilter, Transaction } from "@/lib/types"

export function getDateRangeForPeriod(period: PeriodFilter): {
  start: number
  end: number
} {
  const now = new Date()
  const endOfDay = new Date(now)
  endOfDay.setHours(23, 59, 59, 999)
  const end = endOfDay.getTime()

  switch (period) {
    case "today": {
      const startOfDay = new Date(now)
      startOfDay.setHours(0, 0, 0, 0)
      return { start: startOfDay.getTime(), end }
    }

    case "week": {
      const startOfWeek = new Date(now)
      const dayOfWeek = startOfWeek.getDay()
      const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek // Lunes como inicio de semana
      startOfWeek.setDate(startOfWeek.getDate() + diff)
      startOfWeek.setHours(0, 0, 0, 0)
      return { start: startOfWeek.getTime(), end }
    }

    case "month": {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      startOfMonth.setHours(0, 0, 0, 0)
      return { start: startOfMonth.getTime(), end }
    }
  }
}

export function filterTransactionsByDateRange(
  transactions: ReadonlyArray<Transaction>,
  start: number,
  end: number
): ReadonlyArray<Transaction> {
  return transactions.filter(
    (tx) => tx.createdAt >= start && tx.createdAt <= end
  )
}

export function getCurrentMonthName(): string {
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]
  return monthNames[new Date().getMonth()]
}


function getMonthName(date: Date): string {
  const monthNames = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ]
  return monthNames[date.getMonth()]
}


function formatDayMonth(date: Date): string {
  const day = date.getDate()
  const month = getMonthName(date)
  return `${day} de ${month}`
}

export function getPeriodDisplayName(period?: PeriodFilter): string {
  const now = new Date()

  if (!period) return getCurrentMonthName()

  switch (period) {
    case "today": {
      return `Hoy ${formatDayMonth(now)}`
    }
    case "week": {
      // Calcular inicio de semana (lunes)
      const startOfWeek = new Date(now)
      const dayOfWeek = startOfWeek.getDay()
      const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
      startOfWeek.setDate(startOfWeek.getDate() + diff)

      const startFormatted = formatDayMonth(startOfWeek)
      const endFormatted = formatDayMonth(now)

      return `Esta semana - ${startFormatted} al ${endFormatted}`
    }
    case "month":
      return getCurrentMonthName()
  }
}
