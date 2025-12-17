import SalesResumeCard from "@/features/transactions/components/SalesResumeCard/SalesResumeCard";
import styles from "./Transactions.module.scss";
import PeriodSelector from "@/features/transactions/components/PeriodSelector/PeriodSelector";
import Search from "@/features/transactions/components/Search/Search";
import TransactionTable from "@/features/transactions/components/TransactionTable/TransactionTable";

export default function Home() {
  return (
    <main className={styles.transaction__page}>
      {/* Transaction resume */}
      <section className={styles.transactions__resume}>
        <SalesResumeCard />
        <PeriodSelector />
      </section>

      {/* Transaction table */}
      <section className={styles.transactions__section}>
        <div className={styles.transactions__section__header}>
          <p className={styles.transactions__section__title}>Tus ventas de Diciembre</p>
        </div>
        <Search />
        <TransactionTable />
      </section>
    </main>
  );
}
