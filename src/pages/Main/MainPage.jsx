import styles from './main-page.module.css';
import SalaryAdjustmentArea from './SalaryAdjustmentArea';

function MainPage() {
  return (
    <div className={styles.content}>
      <h1>연봉 조정 목록</h1>
      <SalaryAdjustmentArea />
    </div>
  );
}

export default MainPage;
