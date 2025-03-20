import '../../styles/table.css';
import State from '#components/State';
import PageNation from '#components/Pagination';
import styles from './main-page.module.css';

function SalaryAdjustmentTable() {
  const salaryAdjustmentData = [
    {
      year: 2023,
      month: 1,
      adj_type: 'BASE_UP',
      order_number: 1,
      interface_use: false,
      work_step: '사전작업 > 고성과 가산 대상 여부 설정',
      creation_timestamp: '2022-12-01',
      creator: '한상진',
    },
    {
      year: 2022,
      month: 10,
      adj_type: 'PROMOTED_SALARY_ADJUSTMENT',
      order_number: 2,
      interface_use: false,
      work_step: '사전작업 > 대상자 편성',
      creation_timestamp: '2022-09-01',
      creator: '한상진',
    },
    {
      year: 2022,
      month: 5,
      adj_type: 'PROMOTED_SALARY_ADJUSTMENT',
      order_number: 1,
      interface_use: false,
      work_step: '완료',
      creation_timestamp: '2022-04-01',
      creator: '한상진',
    },
    {
      year: 2022,
      month: 3,
      adj_type: 'ANNUAL_SALARY_ADJUSTMENT',
      order_number: 2,
      interface_use: true,
      work_step: '완료',
      creation_timestamp: '2022-02-01',
      creator: '한상진',
    },
    {
      year: 2022,
      month: 1,
      adj_type: 'ANNUAL_SALARY_ADJUSTMENT',
      order_number: 1,
      interface_use: true,
      work_step: '완료',
      creation_timestamp: '2021-12-01',
      creator: '한상진',
    },
  ];

  function getAdjustmentType(adjType) {
    if (adjType === 'ANNUAL_SALARY_ADJUSTMENT') {
      return '정기 연봉조정';
    }
    if (adjType === 'BASE_UP') {
      return 'Base Up';
    }
    return '승진자 연봉조정';
  }

  function getStatus(workStepText) {
    if (workStepText === '완료') {
      return { status: 'complete', text: '완료' };
    }
    if (workStepText !== null && workStepText !== '조치필요') {
      return { status: 'working', text: '작업중' };
    }
    return { status: 'warning', text: '조치필요' };
  }

  function getInterfaceUse(interfaceUse) {
    if (interfaceUse) {
      return { status: 'complete', text: '완료' };
    }
    return { status: 'warning', text: '미반영' };
  }

  return (
    <div className={styles['salary-adjustment-area']}>
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
          {salaryAdjustmentData.map((row) => {
            const statusInfo = getStatus(row.work_step);
            const interfaceUse = getInterfaceUse(row.interface_use);
            return (
              <tr key={row}>
                <td className={styles['column-year']}>{row.year}</td>
                <td className={styles['column-month']}>{row.month}</td>
                <td className={styles['column-adj-type']}>
                  {row.order_number}차 {getAdjustmentType(row.adj_type)}
                </td>
                <td className={styles['column-status']}>
                  <State status={statusInfo.status} text={statusInfo.text} />
                </td>
                <td className={styles['column-interface']}>
                  <State
                    status={interfaceUse.status}
                    text={interfaceUse.text}
                  />
                </td>
                <td className={styles['column-work-step']}>{row.work_step}</td>
                <td className={styles['column-date']}>
                  {row.creation_timestamp}
                </td>
                <td className={styles['column-creator']}>{row.creator}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <PageNation />
    </div>
  );
}

export default SalaryAdjustmentTable;
