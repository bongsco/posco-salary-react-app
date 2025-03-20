import PropTypes from 'prop-types';
import CustomDatePicker from '#components/DatePicker/CustomDatePicker';
import styles from '../adj-subject-criteria.module.css';

export default function DateSelection({ dateValues, onChange, isSaved }) {
  return (
    <div className={styles.selectDay}>
      <div className={styles.subTitle}>기준일자</div>
      <div className={styles.description}>
        다음 날짜부터의 근속일을 기반으로 연봉을 조정합니다.
      </div>
      <CustomDatePicker
        value={dateValues.baseDate}
        isSaved={isSaved}
        onChange={(date) => onChange('baseDate', date)}
      />

      <div className={styles.subTitle}>입사일자 기준 대상제외일자</div>
      <div className={styles.description}>
        다음 기간 내에 입사한 직원은 조정 대상에서 제외합니다.
      </div>
      <div className={styles.inputDays}>
        <CustomDatePicker
          value={dateValues.expStartDate}
          isSaved={isSaved}
          onChange={(date) => onChange('expStartDate', date)}
        />
        <div>~</div>
        <CustomDatePicker
          value={dateValues.expEndDate}
          isSaved={isSaved}
          onChange={(date) => onChange('expEndDate', date)}
        />
      </div>
    </div>
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
  isSaved: PropTypes.bool,
};

// ✅ 기본값 설정 (defaultProps)
DateSelection.defaultProps = {
  dateValues: {
    baseDate: null,
    expStartDate: null,
    expEndDate: null,
  },
  isSaved: false,
};
