import React from 'react';
import PropTypes from 'prop-types';
import styles from './item.module.css';
import Icon from '#components/SideBar/Icon';

function Item({ icon, caption, onClick, isActive }) {
  return (
    <button
      type="button"
      className={`${styles.item} ${isActive ? styles.active : styles.inactive}`}
      onClick={(e) => onClick(e)}
    >
      <Icon icon={icon} />
      <div className={styles.caption}>{caption}</div>
    </button>
  );
}

Item.propTypes = {
  icon: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Item;
