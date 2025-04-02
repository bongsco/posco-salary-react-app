import { useState, useEffect, useMemo } from 'react';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import styles from './result-page.module.css';
import PageNation from '#components/Pagination';
import ResultTableRow from './ResultTableRow';
import FilterSort from './FilterSort';
import Card from './Card';
import sortObject from '#utils/sortObject';

export default function ResultPage() {
  const [result] = useState([
    {
      직번: 'pd9292',
      성명: '이은재',
      직급: 'P3',
      position: '부장',
      부서: '산기플랜트팀',
      평가: 'B+',
      salaryIncrementRate: 1.3,
      bonusIncretmentRate: 400,
      stdSalaryIncrementRate: 2.0,
      payband: '적용(상한)',
      salaryBefore: 10000000,
      기준연봉: 200000000,
      totalSalaryBefore: 200000000,
      계약연봉: 300000000,
    },
    {
      직번: 'pd1001',
      성명: '김유진',
      직급: 'P2',
      position: '과장',
      부서: '기술연구소',
      평가: 'A',
      salaryIncrementRate: 2.1,
      bonusIncretmentRate: 500,
      stdSalaryIncrementRate: 2.2,
      payband: '미적용',
      salaryBefore: 8500000,
      기준연봉: 9500000,
      totalSalaryBefore: 150000000,
      계약연봉: 160000000,
    },
    {
      직번: 'pd1002',
      성명: '박지훈',
      직급: 'P1',
      position: '대리',
      부서: '인사팀',
      평가: 'B',
      salaryIncrementRate: 1.5,
      bonusIncretmentRate: 350,
      stdSalaryIncrementRate: 1.8,
      payband: '적용(하한)',
      salaryBefore: 7200000,
      기준연봉: 7700000,
      totalSalaryBefore: 120000000,
      계약연봉: 125000000,
    },
    {
      직번: 'pd1003',
      성명: '정예린',
      직급: 'P4',
      position: '부장',
      부서: '경영지원팀',
      평가: 'S',
      salaryIncrementRate: 2.5,
      bonusIncretmentRate: 600,
      stdSalaryIncrementRate: 3.0,
      payband: '적용(상한)',
      salaryBefore: 13000000,
      기준연봉: 14500000,
      totalSalaryBefore: 210000000,
      계약연봉: 230000000,
    },
    {
      직번: 'pd1004',
      성명: '오상혁',
      직급: 'P3',
      position: '차장',
      부서: '영업팀',
      평가: 'A',
      salaryIncrementRate: 2.0,
      bonusIncretmentRate: 480,
      stdSalaryIncrementRate: 2.5,
      payband: '미적용',
      salaryBefore: 11000000,
      기준연봉: 12000000,
      totalSalaryBefore: 180000000,
      계약연봉: 190000000,
    },
    {
      직번: 'pd1005',
      성명: '송지윤',
      직급: 'P1',
      position: '사원',
      부서: '홍보팀',
      평가: 'C',
      salaryIncrementRate: 1.1,
      bonusIncretmentRate: 200,
      stdSalaryIncrementRate: 1.2,
      payband: '적용(하한)',
      salaryBefore: 6800000,
      기준연봉: 7000000,
      totalSalaryBefore: 100000000,
      계약연봉: 105000000,
    },
    {
      직번: 'pd1006',
      성명: '이서준',
      직급: 'P2',
      position: '대리',
      부서: '기획팀',
      평가: 'B+',
      salaryIncrementRate: 1.7,
      bonusIncretmentRate: 360,
      stdSalaryIncrementRate: 2.0,
      payband: '적용(상한)',
      salaryBefore: 8000000,
      기준연봉: 8500000,
      totalSalaryBefore: 130000000,
      계약연봉: 140000000,
    },
    {
      직번: 'pd1007',
      성명: '홍수연',
      직급: 'P3',
      position: '과장',
      부서: '정보보안팀',
      평가: 'A',
      salaryIncrementRate: 2.2,
      bonusIncretmentRate: 520,
      stdSalaryIncrementRate: 2.6,
      payband: '미적용',
      salaryBefore: 9500000,
      기준연봉: 10200000,
      totalSalaryBefore: 160000000,
      계약연봉: 170000000,
    },
    {
      직번: 'pd1008',
      성명: '강하늘',
      직급: 'P4',
      position: '이사',
      부서: '전략기획실',
      평가: 'S',
      salaryIncrementRate: 3.0,
      bonusIncretmentRate: 700,
      stdSalaryIncrementRate: 3.5,
      payband: '적용(상한)',
      salaryBefore: 15000000,
      기준연봉: 16500000,
      totalSalaryBefore: 240000000,
      계약연봉: 260000000,
    },
    {
      직번: 'pd1009',
      성명: '최지민',
      직급: 'P2',
      position: '대리',
      부서: '총무팀',
      평가: 'B',
      salaryIncrementRate: 1.8,
      bonusIncretmentRate: 400,
      stdSalaryIncrementRate: 2.1,
      payband: '적용(하한)',
      salaryBefore: 7500000,
      기준연봉: 8000000,
      totalSalaryBefore: 120000000,
      계약연봉: 125000000,
    },
    {
      직번: 'pd92921',
      성명: '이은재',
      직급: 'P3',
      position: '부장',
      부서: '산기플랜트팀',
      평가: 'B+',
      salaryIncrementRate: 1.3,
      bonusIncretmentRate: 400,
      stdSalaryIncrementRate: 2.0,
      payband: '적용(상한)',
      salaryBefore: 10000000,
      기준연봉: 200000000,
      totalSalaryBefore: 200000000,
      계약연봉: 300000000,
    },
    {
      직번: 'pd10011',
      성명: '김유진',
      직급: 'P2',
      position: '과장',
      부서: '기술연구소',
      평가: 'A',
      salaryIncrementRate: 2.1,
      bonusIncretmentRate: 500,
      stdSalaryIncrementRate: 2.2,
      payband: '미적용',
      salaryBefore: 8500000,
      기준연봉: 9500000,
      totalSalaryBefore: 150000000,
      계약연봉: 160000000,
    },
    {
      직번: 'pd10021',
      성명: '박지훈',
      직급: 'P1',
      position: '대리',
      부서: '인사팀',
      평가: 'B',
      salaryIncrementRate: 1.5,
      bonusIncretmentRate: 350,
      stdSalaryIncrementRate: 1.8,
      payband: '적용(하한)',
      salaryBefore: 7200000,
      기준연봉: 7700000,
      totalSalaryBefore: 120000000,
      계약연봉: 125000000,
    },
    {
      직번: 'pd10031',
      성명: '정예린',
      직급: 'P4',
      position: '부장',
      부서: '경영지원팀',
      평가: 'S',
      salaryIncrementRate: 2.5,
      bonusIncretmentRate: 600,
      stdSalaryIncrementRate: 3.0,
      payband: '적용(상한)',
      salaryBefore: 13000000,
      기준연봉: 14500000,
      totalSalaryBefore: 210000000,
      계약연봉: 230000000,
    },
    {
      직번: 'pd10041',
      성명: '오상혁',
      직급: 'P3',
      position: '차장',
      부서: '영업팀',
      평가: 'A',
      salaryIncrementRate: 2.0,
      bonusIncretmentRate: 480,
      stdSalaryIncrementRate: 2.5,
      payband: '미적용',
      salaryBefore: 11000000,
      기준연봉: 12000000,
      totalSalaryBefore: 180000000,
      계약연봉: 190000000,
    },
    {
      직번: 'pd10051',
      성명: '송지윤',
      직급: 'P1',
      position: '사원',
      부서: '홍보팀',
      평가: 'C',
      salaryIncrementRate: 1.1,
      bonusIncretmentRate: 200,
      stdSalaryIncrementRate: 1.2,
      payband: '적용(하한)',
      salaryBefore: 6800000,
      기준연봉: 7000000,
      totalSalaryBefore: 100000000,
      계약연봉: 105000000,
    },
    {
      직번: 'pd10061',
      성명: '이서준',
      직급: 'P2',
      position: '대리',
      부서: '기획팀',
      평가: 'B+',
      salaryIncrementRate: 1.7,
      bonusIncretmentRate: 360,
      stdSalaryIncrementRate: 2.0,
      payband: '적용(상한)',
      salaryBefore: 8000000,
      기준연봉: 8500000,
      totalSalaryBefore: 130000000,
      계약연봉: 140000000,
    },
    {
      직번: 'pd10071',
      성명: '홍수연',
      직급: 'P3',
      position: '과장',
      부서: '정보보안팀',
      평가: 'A',
      salaryIncrementRate: 2.2,
      bonusIncretmentRate: 520,
      stdSalaryIncrementRate: 2.6,
      payband: '미적용',
      salaryBefore: 9500000,
      기준연봉: 10200000,
      totalSalaryBefore: 160000000,
      계약연봉: 170000000,
    },
    {
      직번: 'pd10081',
      성명: '강하늘',
      직급: 'P4',
      position: '이사',
      부서: '전략기획실',
      평가: 'S',
      salaryIncrementRate: 3.0,
      bonusIncretmentRate: 700,
      stdSalaryIncrementRate: 3.5,
      payband: '적용(상한)',
      salaryBefore: 15000000,
      기준연봉: 16500000,
      totalSalaryBefore: 240000000,
      계약연봉: 260000000,
    },
    {
      직번: 'pd10091',
      성명: '최지민',
      직급: 'P2',
      position: '대리',
      부서: '총무팀',
      평가: 'B',
      salaryIncrementRate: 1.8,
      bonusIncretmentRate: 400,
      stdSalaryIncrementRate: 2.1,
      payband: '적용(하한)',
      salaryBefore: 7500000,
      기준연봉: 8000000,
      totalSalaryBefore: 120000000,
      계약연봉: 125000000,
    },
  ]);

  /* 현재 페이지 수, 현재 테이블에 보여줄 데이터 수 */
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [tableMode, setTableMode] = useState(true);

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
    const totalPages = Math.ceil(sortedData.length / rowsPerPage);

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
  }, [result, currentPage, rowsPerPage, filters, sorts]);

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
                  <td className={styles['table-small-cell']}>평차금인상률</td>
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
