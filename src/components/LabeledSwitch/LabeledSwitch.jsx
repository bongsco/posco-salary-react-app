import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './labeled-switch.module.css';

export default function LabeledSwitch({ label, isCommitted, onClick }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked((prev) => !prev);
    if (onClick) {
      onClick(!isChecked); // 변경된 값 상위로 전달
    }
  };
  return (
    <button
      type="button"
      className={`${styles.button} ${
        isChecked ? styles.checkedTrue : styles.checkedFalse
      } ${isCommitted ? styles.committedTrue : styles.committedFalse}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}

LabeledSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  isCommitted: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
