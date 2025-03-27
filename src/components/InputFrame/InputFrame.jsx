import PropTypes from 'prop-types';
import styles from './input-frame.module.css';

export default function InputFrame({
  children,
  message = null,
  state = 'default',
}) {
  return (
    <div className={`${styles.container} ${styles[state]}`}>
      {children}
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
}

InputFrame.propTypes = {
  children: PropTypes.element.isRequired,
  message: PropTypes.string,
  state: PropTypes.oneOf('default', 'error', 'ok'),
};

InputFrame.defaultProps = {
  message: null,
  state: false,
};
