import TransactionDetail from "../TransactionDetail/TransactionDetail";
import styles from "./TransactionTable.module.scss"

export default async function TransactionTable({}) {
  return (
    <table className={styles.transaction__table}>
      <thead className={styles.transaction__table__head}>
        <tr>
          <th>Transacción</th>
          <th>Fecha y hora</th>
          <th>Metodo de pago</th>
          <th>ID transaccion Bold</th>
          <th>ID transaccion Bold</th>
        </tr>
      </thead>
      <tbody className={styles.transaction__table__body}>
        <tr>
          <td>Cobro exitoso</td>
          <td>14/06/2024 - 16:16:00</td>
          <td>**** 6544</td>
          <td>GZEN87MWBK2EW</td>
          <td>$5000</td>
          <td className={styles.transaction__table__detail}><TransactionDetail /></td>
        </tr>
        <tr>
          <td>Cobro no realizado</td>
          <td>14/06/2024 - 16:16:00</td>
          <td>**** 6544</td>
          <td>GZEN87MWBK2EW</td>
          <td>$5000</td>
          <td className={styles.transaction__table__detail}><TransactionDetail /></td>
        </tr>
        <tr>
          <td>Cobro no realizado</td>
          <td>14/06/2024 - 16:16:00</td>
          <td>**** 6544</td>
          <td>GZEN87MWBK2EW</td>
          <td>$5000</td>
          <td className={styles.transaction__table__detail}><TransactionDetail /></td>
        </tr>
      </tbody>
    </table>
  );
}
