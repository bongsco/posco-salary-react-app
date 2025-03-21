import { useEffect, useMemo, useState } from 'react';
import SalaryAdjustmentList from './SalaryAdjustmentList';
import styles from './main-page.module.css';
import NoDataTable from './NoDataTable';

function SalaryAdjustmentArea() {
  /* Sample Data */
  const salaryAdjustmentData = useMemo(
    () => [
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
      {
        year: 2021,
        month: 10,
        adj_type: 'PROMOTED_SALARY_ADJUSTMENT',
        order_number: 2,
        interface_use: true,
        work_step: '완료',
        creation_timestamp: '2021-09-01',
        creator: '한상진',
      },
      {
        year: 2021,
        month: 5,
        adj_type: 'PROMOTED_SALARY_ADJUSTMENT',
        order_number: 1,
        interface_use: true,
        work_step: '완료',
        creation_timestamp: '2021-04-01',
        creator: '한상진',
      },
      {
        year: 2021,
        month: 3,
        adj_type: 'ANNUAL_SALARY_ADJUSTMENT',
        order_number: 2,
        interface_use: true,
        work_step: '완료',
        creation_timestamp: '2021-02-01',
        creator: '한상진',
      },
      {
        year: 2021,
        month: 1,
        adj_type: 'ANNUAL_SALARY_ADJUSTMENT',
        order_number: 1,
        interface_use: true,
        work_step: '완료',
        creation_timestamp: '2020-12-01',
        creator: '한상진',
      },
    ],
    [],
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  /* Table에서 Pagination을 적용해서 보여줄 Data */
  const [tableData, setTableData] = useState([]);
  /* 테이블에서 클릭한 조정 차수 정보 */
  const [clickedRow, setClickedRow] = useState(null);

  useEffect(() => {
    setTableData(
      salaryAdjustmentData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage,
      ),
    );
  }, [salaryAdjustmentData, currentPage, rowsPerPage]);

  /* 받은 데이터가 없으면 NoDataTable 호출 */
  if (!tableData || tableData.length === 0) {
    return <NoDataTable />;
  }

  return (
    <>
      <div className={styles.timeline} />
      <SalaryAdjustmentList
        data={tableData}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        clickedRow={clickedRow}
        setClickedRow={(changeRow) => {
          setClickedRow(changeRow);
        }}
        setRowsPerPage={(changeRowsPerPage) => {
          setRowsPerPage(changeRowsPerPage);
        }}
        setCurrentPage={(changeCurrentPage) => {
          setCurrentPage(changeCurrentPage);
        }}
      />
    </>
  );
}

export default SalaryAdjustmentArea;
