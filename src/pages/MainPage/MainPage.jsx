import { useEffect, useState } from 'react';
import TimeLine from '#components/TimeLine';
import AppLayout from '#layouts/AppLayout';
import AdjustTable from './AdjustTable';
import FilterSort from './FilterSort';
import NoDataTable from './NoDataTable';
import styles from './main-page.module.css';

/* SampleData */
const initialSalaryAdjustmentData = [
  {
    년도: 2023,
    월구분: 1,
    조정제목: '1차 BASE UP',
    조정종류: 'BASE UP',
    차수: 1,
    통합인사반영여부: { status: 'warning', text: '미반영' },
    진행단계: {
      status: 'working',
      text: '작업중',
      caption: '사전작업 > 고성과 가산 대상 여부 설정',
    },
    등록일: '2022-12-01',
    '연봉 시작일': '2023-01-01',
    '연봉 종료일': '2023-12-31',
    등록자: '한상진',
  },
  {
    년도: 2022,
    월구분: 10,
    조정제목: '2차 승진자연봉조정',
    조정종류: '승진자연봉조정',
    차수: 2,
    통합인사반영여부: { status: 'warning', text: '미반영' },
    진행단계: {
      status: 'working',
      text: '작업중',
      caption: '사전작업 > 대상자 편성',
    },
    등록일: '2022-09-01',
    '연봉 시작일': '2022-10-01',
    '연봉 종료일': '2023-04-31',
    등록자: '한상진',
  },
  {
    년도: 2022,
    월구분: 5,
    조정제목: '1차 승진자연봉조정',
    조정종류: '승진자연봉조정',
    차수: 1,
    통합인사반영여부: { status: 'warning', text: '미반영' },
    진행단계: {
      status: 'complete',
      text: '완료',
      caption: '완료',
    },
    등록일: '2022-04-01',
    '연봉 시작일': '2022-05-01',
    '연봉 종료일': '2022-10-31',
    등록자: '한상진',
  },
  {
    년도: 2022,
    월구분: 3,
    조정제목: '2차 정기연봉조정',
    조정종류: '정기연봉조정',
    차수: 2,
    통합인사반영여부: { status: 'complete', text: '완료' },
    진행단계: {
      status: 'complete',
      text: '완료',
      caption: '완료',
    },
    등록일: '2022-02-01',
    '연봉 시작일': '2022-03-01',
    '연봉 종료일': '2022-12-31',
    등록자: '한상진',
  },
  {
    년도: 2022,
    월구분: 1,
    조정제목: '1차 정기연봉조정',
    조정종류: '정기연봉조정',
    차수: 1,
    통합인사반영여부: { status: 'complete', text: '완료' },
    진행단계: {
      status: 'complete',
      text: '완료',
      caption: '완료',
    },
    등록일: '2021-12-01',
    '연봉 시작일': '2022-01-01',
    '연봉 종료일': '2022-12-31',
    등록자: '한상진',
  },
  {
    년도: 2021,
    월구분: 10,
    조정제목: '2차 승진자연봉조정',
    조정종류: '승진자연봉조정',
    차수: 2,
    통합인사반영여부: { status: 'complete', text: '완료' },
    진행단계: {
      status: 'complete',
      text: '완료',
      caption: '완료',
    },
    등록일: '2021-09-01',
    '연봉 시작일': '2021-10-01',
    '연봉 종료일': '2022-04-31',
    등록자: '한상진',
  },
  {
    년도: 2021,
    월구분: 5,
    조정제목: '1차 승진자연봉조정',
    조정종류: '승진자연봉조정',
    차수: 1,
    통합인사반영여부: { status: 'complete', text: '완료' },
    진행단계: {
      status: 'complete',
      text: '완료',
      caption: '완료',
    },
    등록일: '2021-04-01',
    '연봉 시작일': '2021-05-01',
    '연봉 종료일': '2021-10-31',
    등록자: '한상진',
  },
  {
    년도: 2021,
    월구분: 3,
    조정제목: '2차 정기연봉조정',
    조정종류: '정기연봉조정',
    차수: 2,
    통합인사반영여부: { status: 'complete', text: '완료' },
    진행단계: {
      status: 'complete',
      text: '완료',
      caption: '완료',
    },
    등록일: '2021-02-01',
    '연봉 시작일': '2021-03-01',
    '연봉 종료일': '2021-12-31',
    등록자: '한상진',
  },
  {
    년도: 2021,
    월구분: 1,
    조정제목: '1차 정기연봉조정',
    조정종류: '정기연봉조정',
    차수: 1,
    통합인사반영여부: { status: 'complete', text: '완료' },
    진행단계: {
      status: 'complete',
      text: '완료',
      caption: '완료',
    },
    등록일: '2020-12-01',
    '연봉 시작일': '2021-01-01',
    '연봉 종료일': '2021-12-31',
    등록자: '한상진',
  },
  {
    년도: 2020,
    월구분: 1,
    조정제목: '1차 정기연봉조정',
    조정종류: '정기연봉조정',
    차수: 1,
    통합인사반영여부: { status: 'complete', text: '완료' },
    진행단계: {
      status: 'complete',
      text: '완료',
      caption: '완료',
    },
    등록일: '2019-12-01',
    '연봉 시작일': '2020-01-01',
    '연봉 종료일': '2020-12-31',
    등록자: '한상진',
  },
  {
    년도: 2019,
    월구분: 1,
    조정제목: '1차 정기연봉조정',
    조정종류: '정기연봉조정',
    차수: 1,
    통합인사반영여부: { status: 'complete', text: '완료' },
    진행단계: {
      status: 'complete',
      text: '완료',
      caption: '완료',
    },
    등록일: '2018-12-01',
    '연봉 시작일': '2019-01-01',
    '연봉 종료일': '2019-12-31',
    등록자: '한상진',
  },
];

/* Filter Option에 대한 Sample Data */
const filterOptions = {
  년도: { optionType: 'text', initialValue: '' },
  월구분: {
    optionType: 'dropdown',
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    currentSelectedValue: '',
  },
  등록자: { optionType: 'text', initialValue: '' },
};
/* Sort Option에 대한 Sample Data */
const sortOptions = {
  keys: ['년도', '등록일'],
  values: ['오름차순', '내림차순'],
};

function MainPage() {
  /* Sample Data */
  const [salaryAdjustmentData, setSalaryAdjustmentData] = useState(
    initialSalaryAdjustmentData,
  );

  /* 페이지 관련 변수들 */
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  /* Table에서 Pagination을 적용해서 보여줄 Data */
  const [tableData, setTableData] = useState([]);
  /* Filter, Sort 조건 저장 */
  const [filters, setFilters] = useState([]);
  const [sorts, setSorts] = useState([]);
  /* Timeline에서 선택한 Index 겸   /* 테이블에서 클릭한 조정 차수 정보 */
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
      년도: 2025,
      월구분: 3,
      조정제목: data.title,
      조정종류: data.adjustmentType,
      차수: 1,
      통합인사반영여부: { status: 'warning', text: '미반영' },
      진행단계: {
        status: 'working',
        text: '작업중',
        caption: '기준설정 > 대상자 기준 설정',
      },
      등록일: new Date().toISOString().slice(0, 10),
      '연봉 시작일': '2025-01-01',
      '연봉 종료일': '2025-12-31',
      등록자: '한상진',
    };

    setSalaryAdjustmentData((prevData) => [sampleData, ...prevData]);
  };

  useEffect(() => {
    /* 해당 useEffect 안에 있는 정렬, 페이징 알고리즘은 나중에 DB Query로 해결할 예정 */
    /* 일단은 필터, 정렬, 페이지네이션이 돌아가기만 하는 코드로 냅둠 */
    setSelectedIndex(null);

    let filteredData = salaryAdjustmentData;

    // filters가 존재하고 비어있지 않으면 필터 적용
    if (filters.length > 0) {
      filteredData = salaryAdjustmentData.filter((item) =>
        filters.every(({ key, value }) => {
          const itemValue = String(item[key]); // 값 변환
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

          if (a[key] < b[key]) {
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

  /* 테이블이나 Timeline에서 데이터를 클릭하면 setSelectedIndex값을 변경 */
  const handleSelectedIndex = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const handleDeleteClick = (rowKey) => {
    setSalaryAdjustmentData((prevData) =>
      prevData.filter((item) => item['등록일'] !== rowKey),
    );
  };

  /* TimeLine과 관련된 함수들 */
  /* TableData에 속한 데이터들의 start_date, end_date를 Timeline 형식에 맞게 변환하는 함수 */
  function transformTableDataForTimeLine(td) {
    return td.map((item) => {
      const [startYear, startMonth, startDay] = item['연봉 시작일']
        .split('-')
        .map(Number);
      const [endYear, endMonth, endDay] = item['연봉 종료일']
        .split('-')
        .map(Number);

      return [
        `${item['년도']} ${item['차수']} ${item['조정종류']}`,
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
        <AppLayout title="연봉 조정 목록" breadCrumbs={['조정', '조회']}>
          <div className={styles['salary-adjustment-area']}>
            <NoDataTable type="complete" onSubmit={handleRegisterModal} />
          </div>
        </AppLayout>
      );
    }
    /* 데이터는 있는데, 필터나 로직으로 인해서 Table에 보여줄 데이터가 없는 경우 */
    return (
      <AppLayout title="연봉 조정 목록" breadCrumbs={['조정', '조회']}>
        <div className={styles['salary-adjustment-area']}>
          <div className={styles['salary-adjustment-list']}>
            <FilterSort
              filterOptions={filterOptions}
              sortOptions={sortOptions}
              filters={filters}
              sortList={sorts}
              onTableOptionSubmit={handleFilterSortModal}
              onRegisterSubmit={handleRegisterModal}
            />
            <NoDataTable type="logic" />
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="연봉 조정 목록" breadCrumbs={['조정', '조회']}>
      <div className={styles['salary-adjustment-area']}>
        <TimeLine
          selectedIndex={selectedIndex}
          data={transformedData}
          onChange={handleSelectedIndex}
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
          <AdjustTable
            data={tableData}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            selectedIndex={selectedIndex}
            setRowsPerPage={setRowsPerPage}
            setCurrentPage={setCurrentPage}
            handleRowClick={handleSelectedIndex}
            handleDeleteClick={handleDeleteClick}
          />
        </div>
      </div>
    </AppLayout>
  );
}

export default MainPage;
