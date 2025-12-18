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
  // Mapeo de extensiones: define qué iconos son PNG y cuáles SVG
  const extensionMap: Record<string, string> = {
    nequi: "png",
    bancolombia: "png",
    pse: "svg",
    daviplata: "png",
    mastercard: "svg",
    visa: "svg"
  }

  // Si es CARD, mostramos el icono del franchise
  if (paymentMethod === "CARD" && franchise) {
    const franchiseIcon = franchise.toLowerCase()
    const extension = extensionMap[franchiseIcon] || "svg"
    return (
      <Image
        src={`/assets/icons/entidades/${franchiseIcon}.${extension}`}
        alt={franchise}
        width={size}
        height={size}
      />
    )
  }

  // Para otros métodos de pago (NEQUI, PSE, BANCOLOMBIA, DAVIPLATA)
  const paymentIcon = paymentMethod.toLowerCase()
  const extension = extensionMap[paymentIcon] || "svg"

  const altMap: Record<PaymentMethod, string> = {
    NEQUI: "Nequi",
    BANCOLOMBIA: "Bancolombia",
    PSE: "PSE",
    DAVIPLATA: "Daviplata",
    CARD: "Tarjeta"
  }

  return (
    <Image
      src={`/assets/icons/entidades/${paymentIcon}.${extension}`}
      alt={altMap[paymentMethod]}
      width={size}
      height={size}
    />
  )
}
