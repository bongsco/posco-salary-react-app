import CustomDatePicker from '#components/DatePicker/CustomDatePicker';
import BreadCrumbs from '#components/BreadCrumbs';
import styles from './adj-subject-criteria.module.css';
import Button from '#components/Button';

const items = ['연봉조정', '등록'];

export default function AdjSubjectCriteria() {
  return (
    <div className={styles.contentWrapper}>
      <BreadCrumbs items={items} />
      <div className={styles.title}>대상자 기준 설정</div>
      <div className={styles.content}>
        <div className={styles.selectDay}>
          <div className={styles.subTitle}>기준일자</div>
          <div className={styles.description}>
            다음 날짜부터의 근속일을 기반으로 연봉을 조정합니다.
          </div>
          <CustomDatePicker />
        </div>
        <div className={styles.selectDay}>
          <div className={styles.subTitle}>입사일자 기준 대상제외일자</div>
          <div className={styles.description}>
            다음 기간 내에 입사한 직원은 조정 대상에서 제외합니다.
          </div>
          <div className={styles.inputDays}>
            <CustomDatePicker />
            <div>~</div>
            <CustomDatePicker />
          </div>
        </div>
        <div className={styles.selectSwtich}>
          <div className={styles.subTitle}>급여기준</div>
        </div>
        <div className={styles.selectSwtich}>
          <div className={styles.subTitle}>직급</div>
        </div>
        <div className={styles.buttonWrapper}>
          <Button className={styles.button} label="이전 단계" size="small" />
          <Button className={styles.button} label="다음 단계" size="small" />
        </div>
      </div>
    </div>
  );
}
