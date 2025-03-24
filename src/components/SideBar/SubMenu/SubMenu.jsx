import PropTypes from 'prop-types';
import styles from './submenu.module.css';

export default function SubMenu({ children }) {
  return <div className={styles.submenu}>{children}</div>;
}

SubMenu.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
