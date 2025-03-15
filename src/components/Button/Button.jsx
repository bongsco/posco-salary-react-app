import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.module.css';

import { ReactComponent as ArrowRightIcon } from '../../assets/icons/arrow-right.svg';

function Button({
  variant = 'primary',
  size = 'large',
  label,
  showIcon = true,
  customSize,
  onClick,
}) {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      onClick={onClick}
      style={
        size === 'custom'
          ? { width: customSize?.width, height: customSize?.height }
          : {}
      }
    >
      {label}
      {showIcon && <ArrowRightIcon className={styles[variant].icon} />}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'custom']),
  label: PropTypes.string.isRequired,
  showIcon: PropTypes.bool,
  customSize: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  variant: 'primary',
  size: 'large',
  showIcon: true,
  customSize: null,
  onClick: undefined,
};

export default Button;
