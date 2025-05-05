import PropTypes from 'prop-types';
import styles from './sidebar.module.css';

function SideBar({ children }) {
  return <aside className={styles.sidebar}>{children}</aside>;
}

SideBar.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default SideBar;
