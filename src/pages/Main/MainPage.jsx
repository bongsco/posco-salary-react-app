import React from 'react';
import BreadCrumbs from '#components/BreadCrumbs';
import SalaryAdjustmentList from './SalaryAdjustmentList';
import styles from './main-page.module.css';

function MainPage() {
  const breadcrumbsItems = ['메인'];
  return (
    <div className={styles.content}>
      <BreadCrumbs items={breadcrumbsItems} />
      <div className={styles['main-title']}>연봉 조정 목록</div>
      <div className={styles.timeline} />
      <SalaryAdjustmentList className={styles['salary-adjustment-list']} />
    </div>
  );
}

export default MainPage;
