import Image from "next/image"
import type { SalesType } from "@/lib/types"

interface SalesTypeIconProps {
  readonly salesType: SalesType
  readonly size?: number
}

export default function SalesTypeIcon({ salesType, size = 16 }: SalesTypeIconProps) {
  const iconMap: Record<SalesType, string> = {
    PAYMENT_LINK: "/assets/icons/payment_link.svg",
    TERMINAL: "/assets/icons/terminal.svg"
  }

  const altMap: Record<SalesType, string> = {
    PAYMENT_LINK: "Link de pagos",
    TERMINAL: "Terminal"
  }

  return (
    <Image
      src={iconMap[salesType]}
      alt={altMap[salesType]}
      width={size}
      height={size}
    />
  )
}
