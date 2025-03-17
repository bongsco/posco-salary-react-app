import PropTypes from 'prop-types';
import styles from './button.module.css';

export default function Button({ onClick, text, type }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.button} ${type === 'sub' ? styles.sub : styles.primary}`}
    >
      <span className={styles.text}>{text}</span>
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'sub']), // ✅ "primary" 또는 "sub"만 허용
};

Button.defaultProps = {
  onClick: () => {},
  text: 'Click me',
  type: 'primary', // 기본값은 primary
};
