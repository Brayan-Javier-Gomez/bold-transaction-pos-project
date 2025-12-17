import styles from './PeriodSelector.module.scss'

export default async function PeriodSelector({}) {
    return(
        <section className={styles.period_selector}>
            <div className={styles.period_selector__list}>
                <div className={`${styles.period_selector__item} ${styles.selected}`}>
                    Hoy
                </div>
                <div className={styles.period_selector__item}>
                    Esta semana
                </div>
                <div className={styles.period_selector__item}>
                    Diciembre
                </div>
            </div>
        </section>
    )
}