import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './navitem.module.css';

export default function NavItem({ text, href }) {
  return (
    <Link to={href} className={styles.text}>
      {text}
    </Link>
  );
}

NavItem.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};
