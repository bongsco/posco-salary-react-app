import React from 'react';
import EmploymentTypeDistributionChart from './EmploymentTypeDistributionChart';
import GradeDistributionChart from './GradeDistributionChart';
import MainChartPage from './MainChartPage';
import SalaryGradeTrendChart from './SalaryGradeTrendChart';
import TenureDistributionChart from './TenureDistributionChart';
// import TotalSalaryTrendChart from './TotalSalaryTrendChart';
import styles from './main-dashboard-page.module.css';

function MainDashboardPage() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.cell}>
        <MainChartPage />
      </div>

      <div className={styles.cell}>
        <SalaryGradeTrendChart />
      </div>

      <div className={styles.cell}>
        <div className={styles.flexRow}>
          <div className={styles.flexHalf}>
            <EmploymentTypeDistributionChart />
          </div>
          <div className={styles.flexHalf}>
            <GradeDistributionChart />
          </div>
        </div>
      </div>

      <div className={styles.cell}>
        <TenureDistributionChart />
      </div>
    </div>
  );
}

export default MainDashboardPage;
