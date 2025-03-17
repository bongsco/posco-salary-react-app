import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './switch.module.css';

export default function Switch({ currentOn, onChanged }) {
  const [isOn, setIsOn] = useState(currentOn);

  useEffect(() => {
    setIsOn(currentOn);
  }, [currentOn]);

  const toggleHandler = () => {
    setIsOn(!isOn);
    onChanged(!isOn);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleHandler();
    }
  };

  return (
    <div
      role="switch"
      aria-label="Toggle Container"
      aria-checked={isOn}
      tabIndex="0"
      onClick={toggleHandler}
      onKeyDown={handleKeyDown}
      className={styles.toggleContainer}
    >
      <div
        className={`${styles['toggle-container']} ${isOn ? styles['toggle--checked'] : ''}`}
      />
      <div
        className={`${styles['toggle-circle']} ${isOn ? styles['toggle--checked'] : ''}`}
      />
    </div>
  );
}

Switch.propTypes = {
  currentOn: PropTypes.bool.isRequired,
  onChanged: PropTypes.func.isRequired,
};
