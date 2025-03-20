import BreadCrumbs from '#components/BreadCrumbs';
import TableExample from '#components/TableExample';
import Input from '#components/Input';
import styles from './compensation-page.module.css';
import Button from '#components/Button';

export default function CompensationPage() {
  return (
    <div className={styles.container}>
      <BreadCrumbs items={['연봉조정', '등록']} />
      <h1 className={styles.title}>보상지급률 설정</h1>
      <h2> stepper 추가 </h2>

      <h2 className={styles.sectionTitle}>평가차등 연봉인상률 설정</h2>
      <p className={styles.description}>
        직급 및 평가등급별 기준연봉 인상률을 설정합니다. 고성과조직 가산 대상은
        인상률에 고성과조직 가산률 입력값이 곱해집니다.
      </p>

      <div className={styles.inputContainer}>
        <span className={styles.inputLabel}>고성과조직 가산률</span>
        <Input placeholder="가산율 입력" />
        <span className={styles.inputLabel}>%</span>
      </div>
      <TableExample />

      <h2 className={styles.sectionTitle}>평가차등 경영성과금 지급률 설정</h2>
      <p className={styles.description}>
        직급 및 평가등급별 경영성과금 지급 비율을 설정합니다. 고성과조직 가산
        대상은 지급률에 고성과조직 가산률 입력값이 더해집니다.
      </p>

      <div className={styles.inputContainer}>
        <span className={styles.inputLabel}>고성과조직 가산률</span>
        <Input placeholder="가산율 입력" />
        <span className={styles.inputLabel}>%</span>
      </div>
      <TableExample />

      <hr className={styles.line} />

      <div className={styles.buttonContainer}>
        <Button variant="primary" size="small" label="이전 단계" />
        <Button variant="primary" size="small" label="다음 단계" />
      </div>
    </div>
  );
}
