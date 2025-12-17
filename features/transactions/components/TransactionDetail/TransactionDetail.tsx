import styles from "./TransactionDetail.module.scss";

export default async function TransactionDetail({}) {
  return (
    <>
      <span className={styles.overlay}></span>
      <aside className={styles.transaction__detail}>
        <button className={styles.transaction__detail__close}>X</button>
        <section className={styles.transaction__detail__content}>
          <img src="" alt="" className={styles.transaction__detail__status__icon} />
          <div className={styles.transaction__detail__status__text}>¡Cobro exitoso!</div>
          <div className={styles.transaction__detail__amount}>$100.000</div>
          <div className={styles.transaction__detail__date}>27/06/2024 - 16:29:01</div>

          <div className={`${styles.transaction__detail__id} ${styles.transaction__detail__info}`}>
            <p>ID transaccion bold</p>
            <span>GZEN87MWBK2EW</span>
          </div>

          <div className={`${styles.transaction__detail__deduction} ${styles.transaction__detail__info}`}>
            <p>Deduccion bold</p>
            <span>-$ 3.000</span>
          </div>

          <div className={`${styles.transaction__detail__payment} ${styles.transaction__detail__info}`}>
            <p>Metodo de pago</p>
            <span>iconito</span>
          </div>

          <div className={`${styles.transaction__detail__type} ${styles.transaction__detail__info}`}>
            <p>Tipo de pago</p>
            <span>Link de pagos</span>
          </div>
        </section>
      </aside>
    </>
  );
}
