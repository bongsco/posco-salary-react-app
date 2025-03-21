import PropTypes from 'prop-types';
import '../../styles/table.css';
import { Fragment } from 'react';
import State from '#components/State';
import PageNation from '#components/Pagination';
import styles from './main-page.module.css';

function SalaryAdjustmentTable({
  data,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  clickedRow,
  setClickedRow,
}) {
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

  const handleRowClick = (creationTimestamp) => {
    setClickedRow(clickedRow === creationTimestamp ? null : creationTimestamp);
  };

  const handleEditClick = (row) => {
    console.log('Edit clicked for row:', row);
    // 편집 버튼 클릭 시 필요한 로직을 여기에 구현합니다.
  };

  const handleDeleteClick = (row) => {
    console.log('Delete clicked for row:', row);
  };

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
          {data.map((row) => {
            const statusInfo = getStatus(row.work_step);
            const interfaceUse = getInterfaceUse(row.interface_use);
            return (
              /* 나중에 key값은 조정차수ID로 변경 예정 */
              <Fragment key={row.creation_timestamp}>
                <tr
                  onClick={() => handleRowClick(row.creation_timestamp)}
                  key={row.creation_timestamp}
                  className={`${styles['table-body']} ${
                    clickedRow === row.creation_timestamp
                      ? styles['selected-row']
                      : ''
                  }`}
                >
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
                  <td className={styles['column-work-step']}>
                    {row.work_step}
                  </td>
                  <td className={styles['column-date']}>
                    {row.creation_timestamp}
                  </td>
                  <td className={styles['column-creator']}>{row.creator}</td>
                  {clickedRow === row.creation_timestamp && (
                    <div className={styles['button-container']}>
                      <button
                        type="button"
                        onClick={() => handleEditClick(row)}
                        className={styles['edit-button']}
                        aria-label="편집"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(row)}
                        className={styles['delete-button']}
                        aria-label="삭제"
                      />
                    </div>
                  )}
                </tr>
                {clickedRow === row.creation_timestamp && (
                  /* 나중에는 이 영역에 Stepper 추가 */
                  <tr>
                    <td colSpan="8">
                      <div className={styles.timeline} />
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
      <PageNation
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={setRowsPerPage}
      />
    </div>
  );
}

SalaryAdjustmentTable.propTypes = {
  data: PropTypes.arrayOf().isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  clickedRow: PropTypes.number.isRequired,
  setClickedRow: PropTypes.func.isRequired,
};

export default SalaryAdjustmentTable;
