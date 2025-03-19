import React from 'react';
import PropTypes from 'prop-types';
import styles from './item.module.css';
import Icon from '#components/SideBar/Icon';

function Item({ icon, text, href, isActive }) {
  return (
    <a
      href={href}
      className={`${styles.item} ${isActive ? styles.active : styles.inactive}`}
    >
      <Icon icon={icon} />
      <div className={styles.caption}>{text}</div>
    </a>
  );
}

Item.propTypes = {
  icon: PropTypes.oneOf(['home', 'person', 'card']).isRequired,
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Item;
