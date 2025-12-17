import styles from "./Search.module.scss";

export default async function Search({}) {
  return (
    <section className={styles.search}>
      <search>
        <input
          type="search"
          inputMode="search"
          autoComplete="off"
          spellCheck="false"
          placeholder="Buscar"
          minLength={1}
          maxLength={100}
          pattern="[^<>]*"
          aria-label="Buscar"
          name="transaction-search"
          id=""
          className={styles.search__input}
        />
      </search>
    </section>
  );
}
