import styles from "./TransactionTable.module.scss"

export default function TableSkeleton() {
  return (
    <div className={styles.skeleton__container}>
      <table className={styles.transaction__table}>
        <thead className={styles.transaction__table__head}>
          <tr>
            <th>Transacción</th>
            <th>Fecha y hora</th>
            <th>Método de pago</th>
            <th>ID transacción Bold</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody className={styles.transaction__table__body}>
          {Array.from({ length: 8 }).map((_, i) => (
            <tr key={i}>
              <td>
                <div className={styles.skeleton} style={{ width: '120px', height: '16px', marginLeft:'50px' }} />
              </td>
              <td>
                <div className={styles.skeleton} style={{ width: '140px', height: '16px' }} />
              </td>
              <td>
                <div className={styles.skeleton} style={{ width: '100px', height: '16px' }} />
              </td>
              <td>
                <div className={styles.skeleton} style={{ width: '110px', height: '16px' }} />
              </td>
              <td>
                <div className={styles.skeleton} style={{ width: '90px', height: '16px' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.skeleton__pagination}>
        <div className={styles.skeleton} style={{ width: '200px', height: '20px' }} />
      </div>
    </div>
  )
}
