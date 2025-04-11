import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import PageNation from '#components/Pagination';
import { useAdjustContext } from '#contexts/AdjustContext';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import sortObject from '#utils/sortObject';
import Card from './Card';
import FilterSort from './FilterSort';
import ResultTableRow from './ResultTableRow';
import styles from './result-page.module.css';

export default function ResultPage() {
  const { addError } = useErrorHandlerContext();
  const { adjust } = useAdjustContext();
  const [result, setResult] = useState([]);

  /* 현재 페이지 수, 현재 테이블에 보여줄 데이터 수 */
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [tableMode, setTableMode] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const params = new URLSearchParams({
    pageNumber: String(currentPage),
    pageSize: String(rowsPerPage),
  });

  useSWR(
    adjust?.adjustId
      ? `/api/adjust/${adjust.adjustId}/main/annual-adj?${params}`
      : null,
    async (url) => {
      const res = await fetch(url);
      if (!res?.ok) {
        const errorData = await res.json();
        addError(errorData.status, errorData.message, 'MAIN_ERROR');
      }

      return res.json();
    },
    {
      onSuccess: (response) => {
        const recievedResults = response.results
          .map((item) => ({
            직번: item.empNum,
            성명: item.name,
            직급: item.gradeName,
            position: item.positionName,
            부서: item.depName,
            평가: item.rankCode,
            salaryIncrementRate: item.salaryIncrementRate,
            bonusRate: item.bonusMultiplier,
            stdSalaryIncrementRate: item.stdSalaryIncrementRate,
            payband: item.payband,
            salaryBefore: item.salaryBefore ?? 0,
            기준연봉: item.stdSalary ?? 0,
            totalSalaryBefore: item.totalSalaryBefore ?? 0,
            계약연봉: item.totalSalary ?? 0,
          }))
          .sort((a, b) => a.id - b.id);

        setResult(recievedResults);
        setCurrentPage(response.pageNumber);
        setTotalPages(response.totalPages);
      },
    },
  );

  /* Filter Option에 대한 Sample Data */
  const filterOptions = useMemo(
    () => ({
      직번: { optionType: 'text', initialValue: '' },
      성명: { optionType: 'text', initialValue: '' },
      직급: {
        optionType: 'dropdown',
        options: [...new Set(result.map((item) => item['직급']))],
        initialValue: '',
      },
      부서: {
        optionType: 'dropdown',
        options: [...new Set(result.map((item) => item['부서']))],
        initialValue: '',
      },
      평가: {
        optionType: 'dropdown',
        options: [...new Set(result.map((item) => item['평가']))],
        initialValue: '',
      },
    }),
    [result],
  );

  /* Sort Option에 대한 Sample Data */
  const sortOptions = {
    keys: ['성명', '직번', '부서', '직급', '평가', '기준연봉', '계약연봉'],
    values: ['오름차순', '내림차순'],
  };

  /* Table에 적용되는 Filter, Sort 조건들을 저장하는 배열 */
  const [filters, setFilters] = useState([]);
  const [sorts, setSorts] = useState([]);
  // TableOption에 onSubmit시 동작하는 함수 */
  const handleFilterSortModal = (data) => {
    const { type, payload } = data;

    if (type === 'filter') {
      setFilters(payload);
    } else if (type === 'sort') {
      setSorts(payload);
    }
  };
  useEffect(() => {
    /* Sample Data랑 테이블 컬럼 Mapping을 위한 임시 변수 */

    /* 해당 useEffect 안에 있는 정렬, 페이징 알고리즘은 나중에 DB Query로 해결할 예정 */
    /* 일단은 필터, 정렬, 페이지네이션이 돌아가기만 하는 코드로 냅둠 */

    let filteredData = result;
    // filters가 존재하고 비어있지 않으면 필터 적용
    if (filters.length > 0) {
      filteredData = result.filter((item) =>
        filters.every(({ key, value }) => {
          if (key === '성명' || key === '직번') {
            return (value?.length ?? 0) === 0 || item[key].includes(value);
          }
          return (value?.length ?? 0) === 0 || value?.includes(item[key]);
        }),
      );
    }
    const sortedData = sortObject(filteredData, sorts);

    /* 위에까지가 정렬, 페이징 알고리즘 적용하는 코드들 */
    // 총 페이지 수 계산

    // 현재 페이지가 유효한지 확인 후 조정
    if (currentPage > totalPages && totalPages !== 0) {
      setCurrentPage(totalPages || 1);
    } else {
      // 페이징 적용 후 데이터 설정
      setTableData(
        sortedData.slice(
          (currentPage - 1) * rowsPerPage,
          currentPage * rowsPerPage,
        ),
      );
    }
  }, [result, currentPage, rowsPerPage, filters, sorts, totalPages]);

  useEffect(() => {
    if (!tableMode) {
      setRowsPerPage(12);
    } else {
      setRowsPerPage(5);
    }
  }, [tableMode]);
  return (
    <AdjustEditLayout
      prevStepPath="payband"
      stepPaths={['본 연봉조정', '조정 결과 미리보기']}
      isCommitted
      canMove
    >
      <h2>정기 연봉 조정 결과</h2>
      <div className={styles['table-container']}>
        <FilterSort
          filterOptions={filterOptions}
          sortOptions={sortOptions}
          onSubmit={handleFilterSortModal}
          filters={filters}
          sortList={sorts}
          tableMode={tableMode}
          setTableMode={setTableMode}
        />
        <div className={styles['table-area']}>
          {tableMode && (
            <table className={styles.table}>
              <thead>
                <tr>
                  <td className={styles['table-medium-cell']}>직번</td>
                  <td className={styles['table-small-cell']}>성명</td>
                  <td className={styles['table-small-cell']}>직급</td>
                  <td className={styles['table-small-cell']}>직책</td>
                  <td className={styles['table-large-cell']}>부서</td>
                  <td className={styles['table-small-cell']}>평가</td>
                  <td className={styles['table-small-cell']}>평차연봉인상률</td>
                  <td className={styles['table-small-cell']}>성과금지급률</td>
                  <td className={styles['table-small-cell']}>기준연봉인상률</td>
                  <td className={styles['table-medium-cell']}>Payband</td>
                  <td className={styles['table-large-cell']}>
                    기준연봉 조정전
                  </td>
                  <td className={styles['table-large-cell']}>
                    기준연봉 조정후
                  </td>
                  <td className={styles['table-large-cell']}>
                    계약연봉 조정전
                  </td>
                  <td className={styles['table-large-cell']}>
                    계약연봉 조정후
                  </td>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <ResultTableRow key={row.empNum} item={row} />
                ))}
              </tbody>
            </table>
          )}
          {!tableMode && (
            <div className={styles['card-container']}>
              {tableData.map((card) => (
                <Card key={card.empNum} item={card} />
              ))}
            </div>
          )}
        </div>
        <div className={styles['page-nation-area']}>
          <PageNation
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={setRowsPerPage}
            pageOptions={tableMode ? [5, 10, 20, 50] : [12, 24, 36]}
          />
        </div>
      </div>
    </AdjustEditLayout>
  );
}
