import Image from "next/image";
import styles from "./Header.module.scss";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Image
          className={styles.header__logo}
          src="/assets/icons/bold-white.svg"
          alt="Logo bold.co"
          width={100}
          height={100}
        />
        <nav className={styles.header__nav}>
          <Link href="#" className={styles.header__nav__items}>
            Mi negocio
          </Link>
          <Link href="#" className={`${styles.header__nav__items} ${styles.help_icon}`}>
            Ayuda
          </Link>
        </nav>
      </div>
    </header>
  );
}
