import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MenuTab from './icons/MenuTab';
import styles from './navbar.module.css';

export default function NavBar({ children, toggleSidebar }) {
  return (
    <header>
      <div className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.frame}>
            <MenuTab onClick={() => toggleSidebar((prev) => !prev)} />

            <div className={styles.logo}>
              <Link to="/" className={styles.logoLink}>
                <div className={styles.title}>연봉관리시스템</div>
              </Link>
            </div>
          </div>

          <nav className={styles.frame}>{children}</nav>
        </div>
      </div>
    </header>
  );
}

NavBar.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  toggleSidebar: PropTypes.func.isRequired, // ✅ 메뉴 상태 변경 함수 (부모에서 관리)
};
