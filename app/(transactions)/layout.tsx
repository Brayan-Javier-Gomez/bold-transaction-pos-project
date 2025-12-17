import { Metadata } from "next";
import styles from "./Transactions.module.scss";

export const metadata: Metadata = {
  title: "Transacciones | Bold",
  description: "Resumen de transacciones de tu comercio o negocio",
  robots:{index:false, follow:false}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.transactions__layout}>
        {children}
    </div>

  );
}
