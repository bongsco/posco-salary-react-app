import PropTypes from 'prop-types';
import styles from './navbar.module.css';
import MenuTab from './icons/MenuTab';
import Logo from './icons/Logo';

export default function NavBar({ navItems }) {
  return (
    <div className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.frame}>
          <MenuTab />

          <div className={styles.logo}>
            <div className={styles.logoWrapper}>
              <Logo />
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
  );
}

NavBar.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }),
  ),
};

NavBar.defaultProps = {
  navItems: [
    { label: '로그인', href: '/login' },
    { label: '계정 등록', href: '/register' },
  ],
};
