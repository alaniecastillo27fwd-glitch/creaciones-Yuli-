import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <span className={styles.brand}>Creaciones Yuli</span>
      <span className={styles.tag}>Piñatas • Toppers • Maquetas</span>
    </header>
  );
}
