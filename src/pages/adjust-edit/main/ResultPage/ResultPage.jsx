import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import PageNation from '#components/Pagination';
import { useAdjustContext } from '#contexts/AdjustContext';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import fetchApi from '#utils/fetch';
import Card from './Card';
import FilterSort from './FilterSort';
import ResultTableRow from './ResultTableRow';
import styles from './result-page.module.css';

export default function ResultPage() {
  const { addError } = useErrorHandlerContext();
  const { adjust } = useAdjustContext();

  /* 현재 페이지 수, 현재 테이블에 보여줄 데이터 수 */
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [tableMode, setTableMode] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  /* Filter Option에 대한 Sample Data */
  const filterOptions = {
    직번: { optionType: 'text', initialValue: '' },
    성명: { optionType: 'text', initialValue: '' },
    직급: {
      optionType: 'dropdown',
      options: [
        'R3',
        'R2',
        'R1',
        'P7',
        'P6',
        'P5',
        'P4',
        'P3',
        'P2',
        'P1',
        'O3',
        'O2',
        'O1',
        'G3',
        'G2',
        'G1',
        'E6',
        'E5',
        'E4',
        'E3',
        'E2',
        'D3',
        'D2',
        'D1',
        'A3',
        'A2',
        'A1',
      ],
      initialValue: '',
    },
    부서: { optionType: 'text', initialValue: '' },
    평가: {
      optionType: 'dropdown',
      options: ['S', 'A', 'B+', 'B', 'C', 'D'],
      initialValue: '',
    },
  };

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

  const paramString = useMemo(() => {
    const mapping = {
      성명: 'name',
      직번: 'empNum',
      직급: 'gradeName',
      부서: 'departmentName',
      평가: 'rankCode',
      기준연봉: 'stdSalary',
      계약연봉: 'totalSalary',
    };

    const params = new URLSearchParams();

    params.append('pageNumber', String(currentPage));
    params.append('pageSize', String(rowsPerPage));

    const mappedSorts = sorts.map((sort) => {
      const mappedKey = mapping[sort.key] ?? sort.key;
      return { [mappedKey]: sort.order };
    });
    params.append('sorts', JSON.stringify(mappedSorts));

    filters.forEach((filter) => {
      if (!filter.value) return;

      switch (filter.key) {
        case '직번':
          params.append('filterEmpNum', filter.value);
          break;
        case '성명':
          params.append('filterName', filter.value);
          break;
        case '직급':
          params.append('filterGrade', filter.value);
          break;
        case '부서':
          params.append('filterDepartment', filter.value);
          break;
        case '평가':
          params.append('filterRank', filter.value);
          break;
        default:
          break;
      }
    });

    return params.toString();
  }, [currentPage, rowsPerPage, sorts, filters]);

  useSWR(
    adjust?.adjustId
      ? `/adjust/${adjust.adjustId}/main/annual-adj?${paramString}`
      : null,
    async (url) => {
      const res = await fetchApi(url);
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
            salaryIncrementRate: item.salaryIncrementRate?.toFixed(2),
            bonusRate: item.bonusMultiplier,
            stdSalaryIncrementRate: item.stdSalaryIncrementRate?.toFixed(2),
            payband: item.payband,
            salaryBefore: item.salaryBefore ?? 0,
            기준연봉: item.stdSalary ?? 0,
            totalSalaryBefore: item.totalSalaryBefore ?? 0,
            계약연봉: item.totalSalary ?? 0,
          }))
          .sort((a, b) => a.id - b.id);

        setTableData(recievedResults);
        const safePage = Math.max(
          1,
          Math.min(response.pageNumber, response.totalPages),
        );
        setCurrentPage(safePage);
        setTotalPages(response.totalPages);
      },
    },
  );

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
          onClickExcelDownloadButton={async () => {
            const params = new URLSearchParams({
              adjustId: adjust.adjustId,
              pageType: 'adjustResult',
            });
            const res = await fetchApi(
              `/adjust/excel/download?${params.toString()}`,
            );
            if (!res.ok) {
              throw new Error('GET 요청 실패');
            }
            // const blob = await res.blob();
            // const fileName = `bongsco_adjustResult_${new Date().toISOString().slice(0, 10)}.xlsx`;

            // saveAs(blob, fileName);
          }}
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
            onPageChange={(page) => {
              if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
              }
            }}
            onRowsPerPageChange={setRowsPerPage}
            pageOptions={tableMode ? [5, 10, 20, 50] : [12, 24, 36]}
            totalPage={totalPages}
          />
        </div>
      </div>
    </AdjustEditLayout>
  );
}
