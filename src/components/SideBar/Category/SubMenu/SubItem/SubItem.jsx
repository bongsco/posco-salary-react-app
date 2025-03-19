import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import styles from './subitem.module.css';

/**
 * @param {{
 *   href: string;
 *   text: string;
 * }} props
 * @returns {React.JSX.Element}
 */
export default function SubItem({ href, text }) {
  const location = useLocation();

  return (
    <Link
      to={href}
      className={`${styles.subitem} ${location.pathname === href ? styles.active : styles.inactive}`}
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.5" y="0.5" width="9" height="9" rx="4.5" stroke="#011C30" />
      </svg>

      <div className="text">{text}</div>
    </Link>
  );
}

SubItem.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
