import Image from "next/image"
import type { PaymentMethod, Franchise } from "@/lib/types"

interface PaymentMethodIconProps {
  readonly paymentMethod: PaymentMethod
  readonly franchise?: Franchise
  readonly size?: number
}

export default function PaymentMethodIcon({
  paymentMethod,
  franchise,
  size = 24
}: PaymentMethodIconProps) {
  // Si es CARD, mostramos el icono del franchise
  if (paymentMethod === "CARD" && franchise) {
    const franchiseIcon = franchise.toLowerCase()
    return (
      <Image
        src={`/assets/icons/entidades/${franchiseIcon}.svg`}
        alt={franchise}
        width={size}
        height={size}
      />
    )
  }

  // Para otros métodos de pago (NEQUI, PSE, BANCOLOMBIA, DAVIPLATA)
  const paymentIcon = paymentMethod.toLowerCase()

  const altMap: Record<PaymentMethod, string> = {
    NEQUI: "Nequi",
    BANCOLOMBIA: "Bancolombia",
    PSE: "PSE",
    DAVIPLATA: "Daviplata",
    CARD: "Tarjeta"
  }

  return (
    <Image
      src={`/assets/icons/entidades/${paymentIcon}.svg`}
      alt={altMap[paymentMethod]}
      width={size}
      height={size}
    />
  )
}
