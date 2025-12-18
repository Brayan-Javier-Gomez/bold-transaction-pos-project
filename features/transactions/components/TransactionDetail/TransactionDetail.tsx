"use client";

import { createPortal } from "react-dom";
import { useModalManager } from "@/features/transactions/hooks/useModalManager";
import {
  formatCurrency,
  formatDateTime,
  getPaymentMethodName,
} from "@/lib/utils/format";
import TransactionStatusIcon from "../TransactionStatusIcon";
import PaymentMethodIcon from "../PaymentMethodIcon";
import type { Transaction } from "@/lib/types";
import styles from "./TransactionDetail.module.scss";

interface TransactionDetailProps {
  readonly transaction: Transaction;
  readonly onClose: () => void;
}

export default function TransactionDetail({
  transaction,
  onClose,
}: TransactionDetailProps) {
  // Manejar comportamiento de modal (Escape, body scroll)
  useModalManager(true, { onClose });

  const statusText =
    transaction.status === "SUCCESSFUL"
      ? "¡Cobro exitoso!"
      : "Cobro no realizado";

  const salesTypeText =
    transaction.salesType === "PAYMENT_LINK" ? "Link de pagos" : "Terminal";

  const paymentMethodDisplay = transaction.franchise
    ? `${getPaymentMethodName(transaction.paymentMethod)} - ${
        transaction.franchise
      }`
    : getPaymentMethodName(transaction.paymentMethod);

  // Verificar que estamos en el cliente antes de usar createPortal
  if (typeof window === "undefined") return null;

  // Renderizado del modal usando Portal
  return createPortal(
    <>
      <span
        className={styles.overlay}
        onClick={onClose}
        aria-label="Cerrar detalle de transacción"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClose();
          }
        }}
      />
      <aside
        className={styles.transaction__detail}
        role="dialog"
        aria-modal="true"
        aria-labelledby="transaction-title"
      >
        <button
          onClick={onClose}
          className={styles.transaction__detail__close}
          aria-label="Cerrar"
          type="button"
        >
          
        </button>

        <section className={styles.transaction__detail__content}>
          <div className={styles.transaction__detail__status__icon}>
            <TransactionStatusIcon status={transaction.status} />
          </div>

          <div
            id="transaction-title"
            className={styles.transaction__detail__status__text}
          >
            {statusText}
          </div>

          <div className={styles.transaction__detail__amount}>
            {formatCurrency(transaction.amount)}
          </div>

          <div className={styles.transaction__detail__date}>
            {formatDateTime(transaction.createdAt)}
          </div>

          <div
            className={`${styles.transaction__detail__id} ${styles.transaction__detail__info}`}
          >
            <p>ID transacción Bold</p>
            <span>{transaction.id}</span>
          </div>

          {transaction.deduction && (
            <div
              className={`${styles.transaction__detail__deduction} ${styles.transaction__detail__info}`}
            >
              <p>Deducción Bold</p>
              <span>-{formatCurrency(transaction.deduction)}</span>
            </div>
          )}

          <div
            className={`${styles.transaction__detail__payment} ${styles.transaction__detail__info}`}
          >
            <p>Método de pago</p>
            <span>
              <PaymentMethodIcon
                paymentMethod={transaction.paymentMethod}
                franchise={transaction.franchise}
              />
              {paymentMethodDisplay}
            </span>
          </div>

          <div
            className={`${styles.transaction__detail__type} ${styles.transaction__detail__info}`}
          >
            <p>Tipo de venta</p>
            <span>{salesTypeText}</span>
          </div>

          <div
            className={`${styles.transaction__detail__reference} ${styles.transaction__detail__info}`}
          >
            <p>Referencia</p>
            <span>**** {transaction.transactionReference}</span>
          </div>
        </section>
      </aside>
    </>,
    document.body
  );
}
