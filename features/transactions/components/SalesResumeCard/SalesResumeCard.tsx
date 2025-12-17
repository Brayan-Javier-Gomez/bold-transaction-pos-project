import { Suspense } from "react";
import { getSalesTotals } from "@/features/transactions/services/transaction.service";
import { formatCurrency } from "@/lib/utils/format";
import { getPeriodDisplayName } from "@/lib/utils/date-filters";
import type { PeriodFilter } from "@/lib/types";
import styles from "./SalesResumeCard.module.scss";

interface SalesResumeCardProps {
  readonly period?: PeriodFilter;
}

async function SalesContent({ period }: { readonly period?: PeriodFilter }) {
  const { total } = await getSalesTotals(period);
  const periodText = getPeriodDisplayName(period);

  return (
    <>
      <div className={styles.card__content__title}>{formatCurrency(total)}</div>
      <div className={styles.card__content__subtitle}>
        {periodText}, {new Date().getFullYear()}
      </div>
    </>
  );
}

function SalesCardSkeleton() {
  return (
    <div>
      <div
        className={styles.skeleton}
        style={{ width: "200px", height: "30px", margin: "0 auto 16px auto" }}
      />
      <div
        className={styles.skeleton}
        style={{ width: "120px", height: "20px", margin: "0 auto" }}
      />
    </div>
  );
}

export default async function SalesResumeCard({
  period,
}: SalesResumeCardProps) {
  return (
    <section className={styles.card}>
      <div className={styles.card__header}>
        <div className={styles.card__header__title}>Total de ventas</div>
        <span className={styles.tooltip}>
          <div className={styles.tooltip__icon}></div>
          <div className={styles.tooltip__info}>
            Muestra el valor total de las transacciones realizadas con éxito en la fecha seleccionada.          </div>
        </span>
      </div>
      <div className={styles.card__content}>
        <Suspense fallback={<SalesCardSkeleton />}>
          <SalesContent period={period} />
        </Suspense>
      </div>
    </section>
  );
}
