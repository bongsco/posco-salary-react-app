import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useMemo, useRef, useState } from 'react';
import { Bar, Line, PolarArea } from 'react-chartjs-2';
import useSWR from 'swr';
import Button from '#components/Button';
import PageNation from '#components/Pagination';
import Switch from '#components/Switch';
import { useAdjustContext } from '#contexts/AdjustContext';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import useFetchWithAuth from '#hooks/useFetchWithAuth';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import constant from '#src/constant';
import Card from './Card';
import FilterSort from './FilterSort';
import ResultTableRow from './ResultTableRow';
import styles from './result-page.module.css';

export default function ResultPage() {
  const { addError } = useErrorHandlerContext();
  const { adjust } = useAdjustContext();
  const fetchWithAuth = useFetchWithAuth();

  /* 현재 페이지 수, 현재 테이블에 보여줄 데이터 수 */
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [tableMode, setTableMode] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const gradeNames = [
    'A1',
    'A2',
    'A3',
    'D1',
    'D2',
    'D3',
    'G1',
    'G2',
    'G3',
    'O1',
    'O2',
    'O3',
    'P1',
    'P2',
    'P3',
    'P4',
    'P5',
    'P6',
    'R1',
    'R2',
    'R3',
  ];

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    RadialLinearScale,
    ArcElement,
  );

  /* Filter Option에 대한 Sample Data */
  const filterOptions = {
    직번: { optionType: 'text', initialValue: '' },
    성명: { optionType: 'text', initialValue: '' },
    직급: {
      optionType: 'dropdown',
      options: gradeNames,
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
      try {
        const res = await fetchWithAuth(url);
        if (!res?.ok) {
          const errorData = await res.json();
          addError(errorData.status, errorData.message, 'MAIN_ERROR');
        }

        return res.json();
      } catch (err) {
        addError(
          '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
          err.message,
          'MAIN_ERROR',
        );
        return null;
      }
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
            salaryIncrementRate: `${Number(item.salaryIncrementRate || 0).toFixed(2)}`,
            bonusRate: item.bonusMultiplier,
            stdSalaryIncrementRate: `${Number(item.stdSalaryIncrementRate || 0).toFixed(2)}`,
            payband: item.payband,
            salaryBefore: item.salaryBefore ?? 0,
            기준연봉: item.stdSalary ?? 0,
            totalSalaryBefore: item.totalSalaryBefore ?? 0,
            계약연봉: item.totalSalary ?? 0,
          }))
          .sort((a, b) => a.직번.localeCompare(b.직번));
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

  const { data: chartData } = useSWR(
    adjust?.adjustId ? `/adjust/${adjust.adjustId}/main/chart` : null,
    async (url) => {
      const res = await fetchWithAuth(url);
      if (!res?.ok) {
        const errorData = await res.json();
        addError(errorData.status, errorData.message, 'MAIN_ERROR');
      }
      return res.json();
    },
  );

  const aRef = useRef(null);

  const handleExcelDownload = async (type) => {
    try {
      const params = new URLSearchParams({
        adjustId: adjust.adjustId,
        pageType: type,
      });
      const res = await fetchWithAuth(
        `/adjust/excel/download?${params.toString()}`,
      );
      if (!res.ok) {
        throw new Error('GET 요청 실패');
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      // a 태그 조작
      if (aRef.current) {
        aRef.current.href = url;
        aRef.current.download = `bongsco_${type}_${new Date().toISOString().slice(0, 10)}.xlsx`;
        aRef.current.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
    } catch (err) {
      addError(
        '엑셀 다운로드 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        err.message,
        'EXCEL_DOWNLOAD_ERROR',
      );
    }
  };
  return (
    <AdjustEditLayout
      prevStepPath="payband"
      stepPaths={['본 연봉조정', '조정 결과 미리보기']}
      isCommitted
      canMove
      stepId={constant.step.annual.criteria.subject}
      isLastStep
    >
      <h2>정기 연봉 조정 결과</h2>
      {chartData && (
        <div className={styles['chart-container']}>
          <div className={styles['chart-wrapper']}>
            <div className={styles['chart-header']}>
              <h3 className={styles['chart-title']}>
                이전 차수 대비 직급별 인건비
              </h3>
              <div className={styles['chart-legend']}>
                <span className={styles['legend-item-pink']} />
                <span>{chartData.salaryPerGrades[0].adjustName}</span>
                <span className={styles['legend-item-blue']} />
                <span>{chartData.salaryPerGrades[1].adjustName}</span>
              </div>
            </div>
            <div className={styles['one-chart-container']}>
              <Bar
                data={{
                  labels: gradeNames,
                  datasets: (() => {
                    const [beforeAdjustName, currentAdjustName] =
                      chartData.salaryPerGrades.map((obj) => obj.adjustName);

                    return [
                      {
                        label: beforeAdjustName,
                        data: gradeNames.map(
                          (item) =>
                            chartData.salaryPerGrades[0].gradeSalaryMap[item] ??
                            0,
                        ),
                        backgroundColor: 'rgba(230, 150, 170, 0.5)',
                      },
                      {
                        label: currentAdjustName,
                        data: gradeNames.map(
                          (item) =>
                            chartData.salaryPerGrades[1].gradeSalaryMap[item] ??
                            0,
                        ),
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                      },
                    ];
                  })(),
                }}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    datalabels: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      grid: {
                        display: false, // ✅ 가로 grid 제거
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className={styles['two-chart-container']}>
            <div className={styles['single-chart-container']}>
              <h3 className={styles['chart-title']}>
                이전 차수 대비 연봉 구성 변화
              </h3>
              <div className={styles['one-chart-container']}>
                <Line
                  data={{
                    labels: chartData.annualSalaries.map(
                      (item) => item.adjustName,
                    ),
                    datasets: [
                      {
                        label: '총액',
                        data: chartData.annualSalaries.map(
                          (item) => item.totalSalary,
                        ),
                        backgroundColor: 'rgba(230, 150, 170, 0.5)',
                        borderColor: 'rgba(230, 150, 170, 0.5)',
                      },
                      {
                        label: '기준연봉',
                        data: chartData.annualSalaries.map(
                          (item) => item.stdSalary,
                        ),
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        borderColor: 'rgba(53, 162, 235, 0.5)',
                      },
                      {
                        label: '성과금',
                        data: chartData.annualSalaries.map(
                          (item) => item.hpoBonus,
                        ),
                        backgroundColor: 'rgba(255, 180, 64, 0.5)',
                        borderColor: 'rgba(255, 180, 64, 0.5)',
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                      datalabels: {
                        display: false,
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className={styles['single-chart-container']}>
              <h3 className={styles['chart-title']}>
                부서별 고성과조직 가산 대상 인원
              </h3>
              <div className={styles['one-chart-container']}>
                <PolarArea
                  data={{
                    labels: chartData.hpoPerDepartments.map(
                      (item) => item.departmentName,
                    ),
                    datasets: [
                      {
                        label: '부서 인원 수',
                        data: chartData.hpoPerDepartments.map(
                          (item) => item.count,
                        ),
                        backgroundColor: [
                          'rgba(230, 150, 170, 0.5)',
                          'rgba(54, 162, 235, 0.5)',
                          'rgba(255, 180, 64, 0.5)',
                          'rgba(166, 241, 224, 0.5)', // 연한 민트
                          'rgba(115, 199, 199, 0.5)', // 부드러운 청록
                          'rgba(194, 181, 255, 0.5)', // 연한 라벤더
                          'rgba(255, 199, 148, 0.5)', // 부드러운 오렌지/살구
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'right', // 👉 라벨을 오른쪽에 표시
                      },
                      datalabels: {
                        display: false,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={styles['table-container']}>
        <div className={styles['filter-sort-area']}>
          <FilterSort
            filterOptions={filterOptions}
            sortOptions={sortOptions}
            onSubmit={handleFilterSortModal}
            filters={filters}
            sortList={sorts}
          />

          <div className={styles['right-group']}>
            <div className={styles['switch-container']}>
              <div className={styles['switch-label']}>카드</div>
              <Switch
                isOn={tableMode}
                onClick={() => {
                  setTableMode((prev) => {
                    if (prev) {
                      setRowsPerPage(12);
                    } else {
                      setRowsPerPage(10);
                    }
                    return !prev;
                  });
                }}
              />
              <div className={styles['switch-label']}>테이블</div>
            </div>
            <div>
              <Button
                variant="secondary"
                size="large"
                label="엑셀다운로드"
                onClick={() => {
                  handleExcelDownload('adjustResult');
                }}
              />
              <a
                ref={aRef}
                href="about:blank"
                style={{ display: 'none' }}
                aria-hidden="true"
                tabIndex={-1}
              >
                엑셀 다운로드
              </a>
            </div>
          </div>
        </div>
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
