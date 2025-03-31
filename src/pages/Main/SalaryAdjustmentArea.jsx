import { useEffect, useState } from 'react';
import styles from './main-page.module.css';
import NoDataTable from './NoDataTable';
import SalaryAdjustmentTable from './SalaryAdjustmentTable';
import FilterSort from './FilterSort';
import TimeLine from '#components/TimeLine';

/* SampleData */
const initialSalaryAdjustmentData = [
  {
    year: 2023,
    month: 1,
    adj_type: 'BASE_UP',
    order_number: 1,
    interface_use: false,
    work_step: '사전작업 > 고성과 가산 대상 여부 설정',
    creation_timestamp: '2022-12-01',
    start_date: '2023-01-01',
    end_date: '2023-12-31',
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
    start_date: '2022-10-01',
    end_date: '2023-04-31',
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
    start_date: '2022-05-01',
    end_date: '2022-10-31',
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
    start_date: '2022-03-01',
    end_date: '2022-12-31',
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
    start_date: '2022-01-01',
    end_date: '2022-12-31',
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
    start_date: '2021-10-01',
    end_date: '2022-04-31',
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
    start_date: '2021-05-01',
    end_date: '2021-10-31',
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
    start_date: '2021-03-01',
    end_date: '2021-12-31',
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
    start_date: '2021-01-01',
    end_date: '2021-12-31',
    creator: '한상진',
  },
  {
    year: 2020,
    month: 1,
    adj_type: 'ANNUAL_SALARY_ADJUSTMENT',
    order_number: 1,
    interface_use: true,
    work_step: '완료',
    creation_timestamp: '2019-12-01',
    start_date: '2020-01-01',
    end_date: '2020-12-31',
    creator: '한상진',
  },
  {
    year: 2019,
    month: 1,
    adj_type: 'ANNUAL_SALARY_ADJUSTMENT',
    order_number: 1,
    interface_use: true,
    work_step: '완료',
    creation_timestamp: '2018-12-01',
    start_date: '2019-01-01',
    end_date: '2019-12-31',
    creator: '한상진',
  },
];

/* 필터나 정렬 적용시, Sample Data랑 테이블 컬럼 Mapping을 위한 임시 변수 */
const nameMapping = {
  연도: 'year',
  월: 'month',
  상태: 'work_step',
  직급: 'grade_name',
  통합인사반영여부: 'interfact_use',
  등록자: 'creator',
  등록일: 'creation_timestamp',
};

/* Filter Option에 대한 Sample Data */
const filterOptions = {
  연도: { optionType: 'text', initialValue: '' },
  월: {
    optionType: 'dropdown',
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    currentSelectedValue: '',
  },
  상태: {
    optionType: 'dropdown',
    options: ['완료', '작업중', '조치필요'],
    initialValue: '',
  },
  등록자: { optionType: 'text', initialValue: '' },
};
/* Sort Option에 대한 Sample Data */
const sortOptions = {
  keys: ['상태', '통합인사반영여부', '등록일'],
  values: ['오름차순', '내림차순'],
};

function SalaryAdjustmentArea() {
  /* Sample Data */
  const [salaryAdjustmentData, setSalaryAdjustmentData] = useState(
    initialSalaryAdjustmentData,
  );

  /* 페이지 관련 변수들 */
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  /* Table에서 Pagination을 적용해서 보여줄 Data */
  const [tableData, setTableData] = useState([]);
  /* 테이블에서 클릭한 조정 차수 정보 */
  const [clickedRow, setClickedRow] = useState(null);
  /* Filter, Sort 조건 저장 */
  const [filters, setFilters] = useState([]);
  const [sorts, setSorts] = useState([]);
  /* Timeline에서 선택한 Index */
  const [selectedIndex, setSelectedIndex] = useState(null);

  // TableOption에 onSubmit시 동작하는 함수 */
  const handleFilterSortModal = (data) => {
    const { type, payload } = data;

    if (type === 'filter') {
      setFilters(payload);
    } else if (type === 'sort') {
      setSorts(payload);
    }
  };

  const handleRegisterModal = (data) => {
    /* DB로 쿼리를 바로 날릴거라서 Sample Data가 추가되도록 코드 넣어둠. */
    const sampleData = {
      year: 2025,
      month: 3,
      adj_type: data.title,
      order_number: 1,
      interface_use: false,
      work_step: '기준설정 > 대상자 기준 설정',
      creation_timestamp: new Date().toISOString().slice(0, 10),
      start_date: '2025-01-01',
      end_date: '2025-12-31',
      creator: '한상진',
    };

    setSalaryAdjustmentData((prevData) => [sampleData, ...prevData]);
  };

  // const processTableData = useCallback(() => {
  //   /* 일단은 필터, 정렬, 페이지네이션이 돌아가기만 하는 코드로 냅둠 */
  //   const filteredData = salaryAdjustmentData.filter((item) =>
  //     filters.every(({ key, value }) => {
  //       const itemValue = String(item[nameMapping[key]]);
  //       return (
  //         (value?.length ?? 0) === 0 || value?.map(String).includes(itemValue)
  //       );
  //     }),
  //   );

  //   const sortedData = [...filteredData];
  //   sorts.forEach((sort) => {
  //     const { key, value: order } = sort;
  //     sortedData.sort((a, b) => {
  //       let comparison = 1;
  //       if (a[nameMapping[key]] < b[nameMapping[key]]) {
  //         comparison = -1;
  //       }
  //       if (order === '내림차순') {
  //         comparison *= -1;
  //       }
  //       return comparison;
  //     });
  //   });
  //   /* 위에까지가 정렬, 페이징 알고리즘 적용하는 코드들 */

  //   const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  //   if (currentPage > totalPages && totalPages !== 0) {
  //     setCurrentPage(totalPages || 1);
  //   } else {
  //     setTableData(
  //       sortedData.slice(
  //         (currentPage - 1) * rowsPerPage,
  //         currentPage * rowsPerPage,
  //       ),
  //     );
  //   }
  // }, [salaryAdjustmentData, currentPage, rowsPerPage, filters, sorts]);

  useEffect(() => {
    /* 해당 useEffect 안에 있는 정렬, 페이징 알고리즘은 나중에 DB Query로 해결할 예정 */
    /* 일단은 필터, 정렬, 페이지네이션이 돌아가기만 하는 코드로 냅둠 */
    let filteredData = salaryAdjustmentData;

    // filters가 존재하고 비어있지 않으면 필터 적용
    if (filters.length > 0) {
      filteredData = salaryAdjustmentData.filter((item) =>
        filters.every(({ key, value }) => {
          const itemValue = String(item[nameMapping[key]]); // 값 변환
          return (
            (value?.length ?? 0) === 0 || value?.map(String).includes(itemValue)
          );
        }),
      );
    }

    const sortedData = [...filteredData];
    // sorts가 존재하고 비어있지 않으면 정렬 적용
    if (sorts.length > 0) {
      sorts.forEach((sort) => {
        const { key, value: order } = sort;
        sortedData.sort((a, b) => {
          let comparison = 1;

          if (a[nameMapping[key]] < b[nameMapping[key]]) {
            comparison = -1;
          }

          if (order === '내림차순') {
            comparison *= -1; // 내림차순인 경우 순서 반전
          }
          return comparison;
        });
      });
    }
    /* 위에까지가 정렬, 페이징 알고리즘 적용하는 코드들 */

    /* 페이지 이동 or 최대 갯수 변경으로 데이터가 없으면 가장 마지막 페이지로 이동하는 로직 */
    const totalPages = Math.ceil(sortedData.length / rowsPerPage);
    if (currentPage > totalPages && totalPages !== 0) {
      setCurrentPage(totalPages || 1);
    } else {
      setTableData(
        sortedData.slice(
          (currentPage - 1) * rowsPerPage,
          currentPage * rowsPerPage,
        ),
      );
    }
  }, [salaryAdjustmentData, currentPage, rowsPerPage, filters, sorts]);

  const handleRowClick = (creationTimestamp, index) => {
    // 나중에 조정차수ID로 값 변경 예정
    /* 클릭을 하면 setSelectedIndex값을 변경하고, Table행에도 추가 */
    setSelectedIndex(clickedRow === creationTimestamp ? null : index);
    /* 같은 행을 누르면 원래 Table 형태로 전환(null), 다른 행을 누르면 그 행에 Stepper 추가 */
    setClickedRow(clickedRow === creationTimestamp ? null : creationTimestamp);
  };

  const handleEditClick = (row) => {
    console.log('Edit clicked for row:', row);
  };

  const handleDeleteClick = (rowKey) => {
    setSalaryAdjustmentData((prevData) =>
      prevData.filter((item) => item.creation_timestamp !== rowKey),
    );
  };

  /* TimeLine과 관련된 함수들 */
  /* TimeLine 클릭 시 호출 */
  const clickTimeline = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
    setClickedRow(
      selectedIndex === index ? null : tableData[index].creation_timestamp,
    );
  };

  /* TableData에 속한 데이터들의 start_date, end_date를 Timeline 형식에 맞게 변환하는 함수 */
  function transformTableDataForTimeLine(td) {
    return td.map((item) => {
      const [startYear, startMonth, startDay] = item.start_date
        .split('-')
        .map(Number);
      const [endYear, endMonth, endDay] = item.end_date.split('-').map(Number);

      return [
        `${item.year} ${item.order_number} ${item.adj_type}`,
        new Date(startYear, startMonth - 1, startDay),
        new Date(endYear, endMonth - 1, endDay),
      ];
    });
  }

  const transformedData = transformTableDataForTimeLine(tableData);

  /* 페이지 렌더링 관련 함수들 */
  /* 데이터가 없으면 NoDataTable 호출 */
  if (!tableData || tableData.length === 0) {
    /* 데이터가 아예 없는 경우 */
    if (!salaryAdjustmentData || salaryAdjustmentData.length === 0) {
      return (
        <div className={styles['salary-adjustment-area']}>
          <NoDataTable type="complete" onSubmit={handleRegisterModal} />
        </div>
      );
    }
    /* 데이터는 있는데, 필터나 로직으로 인해서 Table에 보여줄 데이터가 없는 경우 */
    return (
      <div className={styles['salary-adjustment-area']}>
        <div className={styles['salary-adjustment-list']}>
          <FilterSort
            filterOptions={filterOptions}
            sortOptions={sortOptions}
            filters={filters}
            sortList={sorts}
            onSubmit={handleFilterSortModal}
          />
          <NoDataTable type="logic" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles['salary-adjustment-area']}>
      <TimeLine
        selectedIndex={selectedIndex}
        data={transformedData}
        onChange={clickTimeline}
      />
      <div className={styles['salary-adjustment-list']}>
        <FilterSort
          filterOptions={filterOptions}
          sortOptions={sortOptions}
          filters={filters}
          sortList={sorts}
          onTableOptionSubmit={handleFilterSortModal}
          onRegisterSubmit={handleRegisterModal}
        />
        <SalaryAdjustmentTable
          data={tableData}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          clickedRow={clickedRow}
          setRowsPerPage={setRowsPerPage}
          setCurrentPage={setCurrentPage}
          handleRowClick={handleRowClick}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
      </div>
    </div>
  );
}

export default SalaryAdjustmentArea;
