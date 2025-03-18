import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './switch.module.css';

export default function Switch({ initialOn, onClick }) {
  const [isOn, setIsOn] = useState(initialOn);

  const toggleHandler = () => {
    onClick(!isOn);
    setIsOn(!isOn);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-label="Toggle Switch Container"
      aria-checked={isOn}
      tabIndex="0"
      onClick={toggleHandler}
      className={styles['toggle-switch']}
    >
      <div
        className={`${styles['toggle-container']} ${isOn ? styles['toggle-checked'] : ''}`}
      />
      <div
        className={`${styles['toggle-circle']} ${isOn ? styles['toggle-checked'] : ''}`}
      />
    </button>
  );
}

Switch.propTypes = {
  initialOn: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
