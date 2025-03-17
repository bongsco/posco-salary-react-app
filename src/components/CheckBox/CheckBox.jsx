import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './check-box.module.css';

export default function CheckBox({ checked }) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => setIsChecked(!isChecked);

  return (
    <div
      className={`${styles.checkbox} ${isChecked ? styles.checked : ''}`}
      role="button"
      tabIndex={0}
      onClick={handleChange}
      aria-label="Toggle checkbox"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleChange();
        }
      }}
    />
  );
}

CheckBox.propTypes = {
  checked: PropTypes.bool,
};

CheckBox.defaultProps = {
  checked: false,
};
