import PropTypes from 'prop-types';
import styles from './labeled-switch.module.css';

export default function LabeledSwitch({
  label,
  isCommitted,
  isChecked, // ✅ props로 상태 받기
  onClick,
}) {
  const handleClick = () => {
    onClick(label, !isChecked); // ✅ 상태 변경은 상위 컴포넌트에서 처리
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
  isChecked: PropTypes.bool.isRequired, // ✅ 변경됨
  onClick: PropTypes.func.isRequired,
};
