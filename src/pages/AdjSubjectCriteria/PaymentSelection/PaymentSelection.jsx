import PropTypes from 'prop-types';
import LabeledSwitch from '#components/LabeledSwitch';
import styles from '../adj-subject-criteria.module.css';

export default function PaymentSelection({
  payments,
  onSwitchChange,
  isCommitted,
}) {
  return (
    <div className={styles.selectSwitch}>
      <div className={styles.subTitle}>급여기준</div>
      <div className={styles.buttons}>
        {Object.keys(payments).map((label) => (
          <LabeledSwitch
            key={label}
            label={label}
            isChecked={payments[label]}
            isCommitted={isCommitted}
            onClick={onSwitchChange}
            isCheckedInitially={payments[label]} // ✅ 초기 값 전달
          />
        ))}
      </div>
    </div>
  );
}

// ✅ PropTypes 정의
PaymentSelection.propTypes = {
  payments: PropTypes.objectOf(PropTypes.bool),
  onSwitchChange: PropTypes.func.isRequired,
  isCommitted: PropTypes.bool,
};

// ✅ 기본값 설정 (defaultProps)
PaymentSelection.defaultProps = {
  payments: {
    전체: false,
    연봉직: false,
    '비서직(정규)': false,
    '비서직(계약)': false,
    별정직: false,
    계약직: false,
    '임시직(시간)': false,
    '임시직(일)': false,
    임원: false,
  },
  isCommitted: false,
};
