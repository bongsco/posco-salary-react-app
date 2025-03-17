import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './notice.module.css';

function Notice({ title, message, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={styles.noticeContainer}>
      <div className={styles.noticeContent}>
        <div className={styles.noticeHeader}>
          <strong className={styles.title}>{title}</strong>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => {
              setIsVisible(false);
              if (onClose) onClose();
            }}
          >
            X
          </button>
        </div>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}

Notice.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Notice;
