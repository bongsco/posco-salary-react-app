import PropTypes from 'prop-types';
import styles from './navbar.module.css';
import MenuTab from './icons/MenuTab';
import Logo from './icons/Logo';

export default function NavBar({ navItems, toggleSidebar }) {
  return (
    <header>
      <div className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.frame}>
            <MenuTab onClick={() => toggleSidebar((prev) => !prev)} />

            <div className={styles.logo}>
              <div className={styles.logoWrapper}>
                <a href="/" className={styles.logoLink}>
                  <Logo />
                </a>
              </div>

              <div className={styles.title}>연봉관리시스템</div>
            </div>
          </div>

          <div className={styles.frame}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className={styles.text}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

NavBar.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }),
  ),
  toggleSidebar: PropTypes.func.isRequired, // ✅ 메뉴 상태 변경 함수 (부모에서 관리)
};

NavBar.defaultProps = {
  navItems: [
    { label: '로그인', href: '/login' },
    { label: '계정 등록', href: '/register' },
  ],
};
