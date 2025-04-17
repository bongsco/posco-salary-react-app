import React from 'react';
import EmploymentTypeDistributionChart from './EmploymentTypeDistributionChart';
import GradeDistributionChart from './GradeDistributionChart';
import MainChartPage from './MainChartPage';
import TenureDistributionChart from './TenureDistributionChart';
// 왼쪽 상단 차트
import styles from './main-dashboard-page.module.css';

function MainDashboardPage() {
  return (
    <div className={styles.dashboard}>
      {/* 왼쪽 컬럼 */}
      <div className={styles.leftColumn}>
        <div className={styles.topCard}>
          <MainChartPage />
        </div>

        <div className={styles.fullHeightCard}>
          <TenureDistributionChart />
        </div>

        <div className={styles.halfChartTop}>
          <GradeDistributionChart />
        </div>

        <div className={styles.halfChartBottom}>
          <EmploymentTypeDistributionChart />
        </div>

        {/* ... 추가 카드 구성 */}
      </div>

      {/* 오른쪽 컬럼 (나중에 평균 급여 등 들어갈 영역) */}
      <div className={styles.rightColumn}>
        {/* TODO: 평균 급여 현황, 총 인건비 지출 등 */}
      </div>
    </div>
  );
}

export default MainDashboardPage;
