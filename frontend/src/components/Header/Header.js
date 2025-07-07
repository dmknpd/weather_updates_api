import { Link } from "react-router-dom";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.icon}>Weather Updates</div>
      <ul className={styles.list}>
        <Link to="/" className={styles.link}>
          <li className={styles.list_item}>Weather</li>
        </Link>
        <Link to="/subscription" className={styles.link}>
          <li className={styles.list_item}>Subscription</li>
        </Link>
      </ul>
    </header>
  );
};

export default Header;
