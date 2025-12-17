import type { PaymentMethod } from "@/lib/types"

export interface PaymentMethodOption {
  readonly value: PaymentMethod
  readonly label: string
}


export function usePaymentMethods(): ReadonlyArray<PaymentMethodOption> {
  return [
    { value: "NEQUI", label: "Nequi" },
    { value: "CARD", label: "Tarjeta" },
    { value: "BANCOLOMBIA", label: "Bancolombia" },
    { value: "PSE", label: "PSE" },
    { value: "DAVIPLATA", label: "Daviplata" }
  ] as const
}
