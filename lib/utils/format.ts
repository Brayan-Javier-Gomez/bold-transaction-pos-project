import type { PaymentMethod, Franchise } from "@/lib/types"

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

export function formatDateTime(timestamp: number): string {
  return new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(new Date(timestamp)).replace(',', ' -')
}

export function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(timestamp))
}

export function formatPaymentMethod(
  method: PaymentMethod,
  franchise?: Franchise
): string {
  if (method === "CARD" && franchise) {
    return `**** ${franchise}`
  }
  return method
}


export function getPaymentMethodName(method: PaymentMethod): string {
  const names: Record<PaymentMethod, string> = {
    NEQUI: "Nequi",
    CARD: "Tarjeta",
    BANCOLOMBIA: "Bancolombia",
    PSE: "PSE",
    DAVIPLATA: "Daviplata"
  }
  return names[method]
}

export function sanitizeString(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 100) // Límite de seguridad
}

export function formatReference(reference: number): string {
  return new Intl.NumberFormat('es-CO').format(reference)
}
