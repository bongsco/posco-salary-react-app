import React from 'react';
import styles from './main-page.module.css';
import Button from '#components/Button';

function NoDataTable() {
  const addButtonVariant = 'primary';
  const addButtonSize = 'medium';
  const addButtonLabel = '새 연봉 조정 등록';

  return (
    <div className={styles['salary-adjustment-table-area']}>
      <table className={styles['salary-adjustment-table']}>
        <thead>
          <tr>
            <td className={styles['column-year']}>연도</td>
            <td className={styles['column-month']}>월</td>
            <td className={styles['column-adj-type']}>조정유형</td>
            <td className={styles['column-status']}>상태</td>
            <td className={styles['column-interface']}>통합인사반영여부</td>
            <td className={styles['column-work-step']}>진행단계</td>
            <td className={styles['column-date']}>등록일</td>
            <td className={styles['column-creator']}>등록자</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="8" className={styles['empty-table-cell']}>
              <div className={styles['empty-table-content']}>
                <div className={styles['no-data-message']}>
                  연봉 조정 내역이 없습니다.
                </div>
                <Button
                  variant={addButtonVariant}
                  size={addButtonSize}
                  label={addButtonLabel}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default NoDataTable;
