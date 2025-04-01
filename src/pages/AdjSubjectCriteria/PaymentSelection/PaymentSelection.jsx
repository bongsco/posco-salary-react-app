import PropTypes from 'prop-types';
import LabeledSwitch from '#components/LabeledSwitch';
import styles from '../adj-subject-criteria.module.css';

export default function PaymentSelection({
  payments,
  onSwitchChange,
  committedStates,
  hasError,
}) {
  return (
    <section className={styles.selectSwitch}>
      <div className={styles.subTitle}>급여기준</div>
      {hasError && (
        <div className={styles.errorMessage}>
          한 가지 이상의 급여기준을 선택해 주세요.
        </div>
      )}
      <div className={styles.buttons}>
        <LabeledSwitch
          key="전체"
          label="전체"
          isChecked={payments['전체']} // ✅ 부모 상태로 관리
          isCommitted={committedStates['전체']}
          onClick={onSwitchChange}
          isCheckedInitially={payments['전체']}
        />

        {Object.keys(payments)
          .filter((label) => label !== '전체') // ✅ "전체" 제외
          .map((label) => (
            <LabeledSwitch
              key={label}
              label={label}
              isChecked={payments[label]}
              isCommitted={committedStates[label]}
              onClick={onSwitchChange}
              isCheckedInitially={payments[label]}
            />
          ))}
      </div>
    </section>
  );
}

// ✅ PropTypes 정의
PaymentSelection.propTypes = {
  payments: PropTypes.objectOf(PropTypes.bool),
  onSwitchChange: PropTypes.func.isRequired,
  committedStates: PropTypes.objectOf(PropTypes.bool).isRequired,
  hasError: PropTypes.bool,
};

// ✅ 기본값 설정 (defaultProps)
PaymentSelection.defaultProps = {
  payments: {
    전체: false,
  },
  hasError: false,
};
