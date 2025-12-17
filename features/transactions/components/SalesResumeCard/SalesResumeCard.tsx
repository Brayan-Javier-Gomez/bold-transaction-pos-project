import styles from './SalesResumeCard.module.scss'

export default async function SalesResumeCard({}) {
  return (
    <section className={styles.card}>
      <div className={styles.card__header}>
        <div className={styles.card__header__title}>Total de ventas de Junio</div>
        <span className={styles.card__header__tooltip}>
          <div className={styles.tooltip__icon}>I</div>
          <div className={styles.tooltip__info}>
            Contiene el total del valor de los movimientos realizados en la
            fecha especificada
          </div>
        </span>
      </div>
      <div className={styles.card__content}>
        <div className={styles.card__content__title}>
        $ 394.561.894
        </div>
            
        <div className={styles.card__content__subtitle}>
            Junio, 2024
        </div>
      </div>
    </section>
  );
}
