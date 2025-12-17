import Image from "next/image"
import type { TransactionStatus } from "@/lib/types"

interface TransactionStatusIconProps {
  readonly status: TransactionStatus
  readonly size?: number
}

export default function TransactionStatusIcon({
  status,
  size = 32
}: TransactionStatusIconProps) {
  const iconMap: Record<TransactionStatus, string> = {
    SUCCESSFUL: "/assets/icons/success.svg",
    REJECTED: "/assets/icons/error.svg"
  }

  const altMap: Record<TransactionStatus, string> = {
    SUCCESSFUL: "Cobro exitoso",
    REJECTED: "Cobro no realizado"
  }

  return (
    <Image
      src={iconMap[status]}
      alt={altMap[status]}
      width={size}
      height={size}
    />
  )
}
