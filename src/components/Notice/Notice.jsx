import PropTypes from 'prop-types';
import styles from './notice.module.css';

function Notice({ title, message, onClose }) {
  return (
    <div className={styles.noticeContainer}>
      <div className={styles.noticeHeader}>
        <strong className={styles.title}>{title}</strong>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          X
        </button>
      </div>
      <p className={styles.message}>{message}</p>
    </div>
  );
}

Notice.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Notice;
