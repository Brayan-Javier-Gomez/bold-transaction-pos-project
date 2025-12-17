import type { SalesType } from "@/lib/types"

export interface SalesTypeOption {
  readonly value: SalesType
  readonly label: string
}


export function useSalesTypes(): ReadonlyArray<SalesTypeOption> {
  return [
    { value: "TERMINAL", label: "Cobro con datáfono" },
    { value: "PAYMENT_LINK", label: "Cobro con link de pago" }
  ] as const
}
