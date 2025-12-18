import Image from "next/image";
import styles from "./Header.module.scss";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Link href="/">
          <Image
            className={styles.header__logo}
            src="/assets/icons/bold-white.svg"
            alt="Logo bold.co"
            width={100}
            height={100}
          />
        </Link>
        <nav className={styles.header__nav}>
          <Link href="https://bold.co/cf/cuenta-personal" className={styles.header__nav__items}>
            Mi negocio
          </Link>
          <Link href="https://ayuda.bold.co/lang/es" className={`${styles.header__nav__items} ${styles.help_icon}`}>
            Ayuda
          </Link>
        </nav>
      </div>
    </header>
  );
}
