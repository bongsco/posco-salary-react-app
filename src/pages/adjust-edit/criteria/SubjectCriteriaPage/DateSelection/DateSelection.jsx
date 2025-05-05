import PropTypes from 'prop-types';
import CustomDatePicker from '#components/DatePicker/CustomDatePicker';
import styles from '../subject-criteria-page.module.css';

export default function DateSelection({
  dateValues,
  onChange,
  committedStates,
  hasError,
}) {
  return (
    <section className={styles.selectDay}>
      <div className={styles.subTitle}>기준일자</div>
      <div className={styles.description}>
        다음 날짜부터의 근속일을 기반으로 연봉을 조정합니다.
      </div>
      <CustomDatePicker
        date={dateValues.baseDate}
        isSaved={committedStates.baseDate}
        onChange={(date) => onChange('baseDate', date)}
        message={hasError.baseDate ? '기준 일자를 선택해 주세요.' : null}
        hasError={hasError.baseDate}
      />

      <div className={styles.subTitle}>입사일자 기준 대상제외일자</div>
      <div className={styles.description}>
        다음 기간 내에 입사한 직원은 조정 대상에서 제외합니다.
      </div>
      <div className={styles.inputDays}>
        <CustomDatePicker
          date={dateValues.expStartDate}
          isSaved={committedStates.expStartDate}
          onChange={(date) => onChange('expStartDate', date)}
          message={hasError.expStartDate ? '시작일을 입력해 주세요.' : null}
          hasError={hasError.expStartDate}
        />
        <div>~</div>
        <CustomDatePicker
          date={dateValues.expEndDate}
          isSaved={committedStates.expEndDate}
          onChange={(date) => onChange('expEndDate', date)}
          message={hasError.expEndDate ? '종료일을 입력해 주세요.' : null}
          hasError={hasError.expEndDate}
        />
      </div>
    </section>
  );
}
// ✅ PropTypes 정의
DateSelection.propTypes = {
  dateValues: PropTypes.shape({
    baseDate: PropTypes.instanceOf(Date),
    expStartDate: PropTypes.instanceOf(Date),
    expEndDate: PropTypes.instanceOf(Date),
  }),
  onChange: PropTypes.func.isRequired,
  committedStates: PropTypes.shape({
    baseDate: PropTypes.bool,
    expStartDate: PropTypes.bool,
    expEndDate: PropTypes.bool,
  }).isRequired,
  hasError: PropTypes.bool,
};

// ✅ 기본값 설정 (defaultProps)
DateSelection.defaultProps = {
  dateValues: {
    baseDate: null,
    expStartDate: null,
    expEndDate: null,
  },
  hasError: false,
};
