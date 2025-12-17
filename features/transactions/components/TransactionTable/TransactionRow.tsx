'use client'

import { useState } from "react"
import { formatCurrency, formatDateTime, formatPaymentMethod } from "@/lib/utils/format"
import TransactionDetail from "../TransactionDetail/TransactionDetail"
import SalesTypeIcon from "../SalesTypeIcon"
import PaymentMethodIcon from "../PaymentMethodIcon"
import type { Transaction } from "@/lib/types"
import styles from "./TransactionRow.module.scss"

interface TransactionRowProps {
  readonly transaction: Transaction
}

export default function TransactionRow({ transaction }: TransactionRowProps) {
  const [showDetail, setShowDetail] = useState(false)

  const handleRowClick = () => {
    setShowDetail(true)
  }

  const handleCloseDetail = () => {
    setShowDetail(false)
  }

  const statusText = transaction.status === "SUCCESSFUL"
    ? "Cobro exitoso"
    : "Cobro no realizado"

  return (
    <>
      <tr onClick={handleRowClick} className={styles.transaction__row}>
        <td data-label="Estado">
          <div className={styles.transaction__row__status}>
            <SalesTypeIcon salesType={transaction.salesType} />
            <span>{statusText}</span>
          </div>
        </td>
        <td data-label="Fecha y hora">{formatDateTime(transaction.createdAt)}</td>
        <td data-label="Método de pago">
          <div className={styles.transaction__row__payment}>
            <PaymentMethodIcon
              paymentMethod={transaction.paymentMethod}
              franchise={transaction.franchise}
            />
            <span>{formatPaymentMethod(transaction.paymentMethod, transaction.franchise)}</span>
          </div>
        </td>
        <td data-label="ID">{transaction.id}</td>
        <td data-label="Monto" className={styles.transaction__row__amount}>{formatCurrency(transaction.amount)}</td>
      </tr>

      {showDetail && (
        <TransactionDetail
          transaction={transaction}
          onClose={handleCloseDetail}
        />
      )}
    </>
  )
}
