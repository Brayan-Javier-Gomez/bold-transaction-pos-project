import styles from "./Transactions.module.scss";


export default function Home() {
  return (
    <main className={styles.transaction__page}>
      {/* Transaction resume */}
      <section className={styles.transactions__resume}>

      </section>

      {/* Transaction table */}
      <section className={styles.transactions__section}>
        <div className={styles.transactions__section__header}>
          <p className={styles.transactions__section__title}>Tus ventas de Diciembre</p>
        </div>
      </section>
    </main>
  );
}
