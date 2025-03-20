import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './labeled-switch.module.css';

export default function LabeledSwitch({ label, isCommitted, onClick }) {
  const [isChecked, setIsChecked] = useState(false); // ✅ 내부에서 상태 관리

  const handleClick = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onClick(label, newChecked); // ✅ 변경된 값 상위 컴포넌트로 전달
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${
        isChecked ? styles.checkedTrue : styles.checkedFalse
      } ${isCommitted ? styles.committedTrue : styles.committedFalse}`}
      onClick={handleClick} // ✅ 이벤트 핸들러 적용
    >
      {label}
    </button>
  );
}

LabeledSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  isCommitted: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired, // ✅ 클릭 이벤트 핸들러
};
