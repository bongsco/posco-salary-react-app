import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import styles from './item.module.css';
import Icon from '#components/SideBar/Icon';

function Item({ icon, text, href }) {
  const location = useLocation();

  return (
    <Link
      to={href}
      className={`${styles.item} ${location.pathname === href ? styles.active : styles.inactive}`}
    >
      <Icon icon={icon} />
      <div className={styles.caption}>{text}</div>
    </Link>
  );
}

Item.propTypes = {
  icon: PropTypes.oneOf(['home', 'person', 'card']).isRequired,
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default Item;
