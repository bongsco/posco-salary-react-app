import { useState, useEffect, useMemo } from 'react';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import styles from './result-page.module.css';
import PageNation from '#components/Pagination';
import ResultTableRow from './ResultTableRow';
import FilterSort from './FilterSort';
import '../../styles/table.css';
import Card from './Card';

export default function ResultPage() {
  const [result] = useState([
    {
      empNum: 'pd9292',
      name: '이은재',
      grade: 'P3',
      position: '부장',
      departmentName: '산기플랜트팀',
      rank: 'B+',
      salaryIncrementRate: 1.3,
      bonusIncretmentRate: 400,
      stdSalaryIncrementRate: 2.0,
      payband: '적용(상한)',
      salaryBefore: 10000000,
      salaryAfter: 200000000,
      totalSalaryBefore: 200000000,
      totalSalaryAfter: 300000000,
    },
    {
      empNum: 'pd1001',
      name: '김유진',
      grade: 'P2',
      position: '과장',
      departmentName: '기술연구소',
      rank: 'A',
      salaryIncrementRate: 2.1,
      bonusIncretmentRate: 500,
      stdSalaryIncrementRate: 2.2,
      payband: '미적용',
      salaryBefore: 8500000,
      salaryAfter: 9500000,
      totalSalaryBefore: 150000000,
      totalSalaryAfter: 160000000,
    },
    {
      empNum: 'pd1002',
      name: '박지훈',
      grade: 'P1',
      position: '대리',
      departmentName: '인사팀',
      rank: 'B',
      salaryIncrementRate: 1.5,
      bonusIncretmentRate: 350,
      stdSalaryIncrementRate: 1.8,
      payband: '적용(하한)',
      salaryBefore: 7200000,
      salaryAfter: 7700000,
      totalSalaryBefore: 120000000,
      totalSalaryAfter: 125000000,
    },
    {
      empNum: 'pd1003',
      name: '정예린',
      grade: 'P4',
      position: '부장',
      departmentName: '경영지원팀',
      rank: 'S',
      salaryIncrementRate: 2.5,
      bonusIncretmentRate: 600,
      stdSalaryIncrementRate: 3.0,
      payband: '적용(상한)',
      salaryBefore: 13000000,
      salaryAfter: 14500000,
      totalSalaryBefore: 210000000,
      totalSalaryAfter: 230000000,
    },
    {
      empNum: 'pd1004',
      name: '오상혁',
      grade: 'P3',
      position: '차장',
      departmentName: '영업팀',
      rank: 'A',
      salaryIncrementRate: 2.0,
      bonusIncretmentRate: 480,
      stdSalaryIncrementRate: 2.5,
      payband: '미적용',
      salaryBefore: 11000000,
      salaryAfter: 12000000,
      totalSalaryBefore: 180000000,
      totalSalaryAfter: 190000000,
    },
    {
      empNum: 'pd1005',
      name: '송지윤',
      grade: 'P1',
      position: '사원',
      departmentName: '홍보팀',
      rank: 'C',
      salaryIncrementRate: 1.1,
      bonusIncretmentRate: 200,
      stdSalaryIncrementRate: 1.2,
      payband: '적용(하한)',
      salaryBefore: 6800000,
      salaryAfter: 7000000,
      totalSalaryBefore: 100000000,
      totalSalaryAfter: 105000000,
    },
    {
      empNum: 'pd1006',
      name: '이서준',
      grade: 'P2',
      position: '대리',
      departmentName: '기획팀',
      rank: 'B+',
      salaryIncrementRate: 1.7,
      bonusIncretmentRate: 360,
      stdSalaryIncrementRate: 2.0,
      payband: '적용(상한)',
      salaryBefore: 8000000,
      salaryAfter: 8500000,
      totalSalaryBefore: 130000000,
      totalSalaryAfter: 140000000,
    },
    {
      empNum: 'pd1007',
      name: '홍수연',
      grade: 'P3',
      position: '과장',
      departmentName: '정보보안팀',
      rank: 'A',
      salaryIncrementRate: 2.2,
      bonusIncretmentRate: 520,
      stdSalaryIncrementRate: 2.6,
      payband: '미적용',
      salaryBefore: 9500000,
      salaryAfter: 10200000,
      totalSalaryBefore: 160000000,
      totalSalaryAfter: 170000000,
    },
    {
      empNum: 'pd1008',
      name: '강하늘',
      grade: 'P4',
      position: '이사',
      departmentName: '전략기획실',
      rank: 'S',
      salaryIncrementRate: 3.0,
      bonusIncretmentRate: 700,
      stdSalaryIncrementRate: 3.5,
      payband: '적용(상한)',
      salaryBefore: 15000000,
      salaryAfter: 16500000,
      totalSalaryBefore: 240000000,
      totalSalaryAfter: 260000000,
    },
    {
      empNum: 'pd1009',
      name: '최지민',
      grade: 'P2',
      position: '대리',
      departmentName: '총무팀',
      rank: 'B',
      salaryIncrementRate: 1.8,
      bonusIncretmentRate: 400,
      stdSalaryIncrementRate: 2.1,
      payband: '적용(하한)',
      salaryBefore: 7500000,
      salaryAfter: 8000000,
      totalSalaryBefore: 120000000,
      totalSalaryAfter: 125000000,
    },
    {
      empNum: 'pd992',
      name: '이은재',
      grade: 'P3',
      position: '부장',
      departmentName: '산기플랜트팀',
      rank: 'B+',
      salaryIncrementRate: 1.3,
      bonusIncretmentRate: 400,
      stdSalaryIncrementRate: 2.0,
      payband: '적용(상한)',
      salaryBefore: 10000000,
      salaryAfter: 200000000,
      totalSalaryBefore: 200000000,
      totalSalaryAfter: 300000000,
    },
    {
      empNum: 'pd101',
      name: '김유진',
      grade: 'P2',
      position: '과장',
      departmentName: '기술연구소',
      rank: 'A',
      salaryIncrementRate: 2.1,
      bonusIncretmentRate: 500,
      stdSalaryIncrementRate: 2.2,
      payband: '미적용',
      salaryBefore: 8500000,
      salaryAfter: 9500000,
      totalSalaryBefore: 150000000,
      totalSalaryAfter: 160000000,
    },
    {
      empNum: 'pd102',
      name: '박지훈',
      grade: 'P1',
      position: '대리',
      departmentName: '인사팀',
      rank: 'B',
      salaryIncrementRate: 1.5,
      bonusIncretmentRate: 350,
      stdSalaryIncrementRate: 1.8,
      payband: '적용(하한)',
      salaryBefore: 7200000,
      salaryAfter: 7700000,
      totalSalaryBefore: 120000000,
      totalSalaryAfter: 125000000,
    },
    {
      empNum: 'pd103',
      name: '정예린',
      grade: 'P4',
      position: '부장',
      departmentName: '경영지원팀',
      rank: 'S',
      salaryIncrementRate: 2.5,
      bonusIncretmentRate: 600,
      stdSalaryIncrementRate: 3.0,
      payband: '적용(상한)',
      salaryBefore: 13000000,
      salaryAfter: 14500000,
      totalSalaryBefore: 210000000,
      totalSalaryAfter: 230000000,
    },
    {
      empNum: 'pd104',
      name: '오상혁',
      grade: 'P3',
      position: '차장',
      departmentName: '영업팀',
      rank: 'A',
      salaryIncrementRate: 2.0,
      bonusIncretmentRate: 480,
      stdSalaryIncrementRate: 2.5,
      payband: '미적용',
      salaryBefore: 11000000,
      salaryAfter: 12000000,
      totalSalaryBefore: 180000000,
      totalSalaryAfter: 190000000,
    },
    {
      empNum: 'pd105',
      name: '송지윤',
      grade: 'P1',
      position: '사원',
      departmentName: '홍보팀',
      rank: 'C',
      salaryIncrementRate: 1.1,
      bonusIncretmentRate: 200,
      stdSalaryIncrementRate: 1.2,
      payband: '적용(하한)',
      salaryBefore: 6800000,
      salaryAfter: 7000000,
      totalSalaryBefore: 100000000,
      totalSalaryAfter: 105000000,
    },
    {
      empNum: 'pd106',
      name: '이서준',
      grade: 'P2',
      position: '대리',
      departmentName: '기획팀',
      rank: 'B+',
      salaryIncrementRate: 1.7,
      bonusIncretmentRate: 360,
      stdSalaryIncrementRate: 2.0,
      payband: '적용(상한)',
      salaryBefore: 8000000,
      salaryAfter: 8500000,
      totalSalaryBefore: 130000000,
      totalSalaryAfter: 140000000,
    },
    {
      empNum: 'pd107',
      name: '홍수연',
      grade: 'P3',
      position: '과장',
      departmentName: '정보보안팀',
      rank: 'A',
      salaryIncrementRate: 2.2,
      bonusIncretmentRate: 520,
      stdSalaryIncrementRate: 2.6,
      payband: '미적용',
      salaryBefore: 9500000,
      salaryAfter: 10200000,
      totalSalaryBefore: 160000000,
      totalSalaryAfter: 170000000,
    },
    {
      empNum: 'pd108',
      name: '강하늘',
      grade: 'P4',
      position: '이사',
      departmentName: '전략기획실',
      rank: 'S',
      salaryIncrementRate: 3.0,
      bonusIncretmentRate: 700,
      stdSalaryIncrementRate: 3.5,
      payband: '적용(상한)',
      salaryBefore: 15000000,
      salaryAfter: 16500000,
      totalSalaryBefore: 240000000,
      totalSalaryAfter: 260000000,
    },
    {
      empNum: 'pd109',
      name: '최지민',
      grade: 'P2',
      position: '대리',
      departmentName: '총무팀',
      rank: 'B',
      salaryIncrementRate: 1.8,
      bonusIncretmentRate: 400,
      stdSalaryIncrementRate: 2.1,
      payband: '적용(하한)',
      salaryBefore: 7500000,
      salaryAfter: 8000000,
      totalSalaryBefore: 120000000,
      totalSalaryAfter: 125000000,
    },
    {
      empNum: 'pd1s04',
      name: '오상혁',
      grade: 'P3',
      position: '차장',
      departmentName: '영업팀',
      rank: 'A',
      salaryIncrementRate: 2.0,
      bonusIncretmentRate: 480,
      stdSalaryIncrementRate: 2.5,
      payband: '미적용',
      salaryBefore: 11000000,
      salaryAfter: 12000000,
      totalSalaryBefore: 180000000,
      totalSalaryAfter: 190000000,
    },
    {
      empNum: 'pd1s05',
      name: '송지윤',
      grade: 'P1',
      position: '사원',
      departmentName: '홍보팀',
      rank: 'C',
      salaryIncrementRate: 1.1,
      bonusIncretmentRate: 200,
      stdSalaryIncrementRate: 1.2,
      payband: '적용(하한)',
      salaryBefore: 6800000,
      salaryAfter: 7000000,
      totalSalaryBefore: 100000000,
      totalSalaryAfter: 105000000,
    },
    {
      empNum: 'pd10s6',
      name: '이서준',
      grade: 'P2',
      position: '대리',
      departmentName: '기획팀',
      rank: 'B+',
      salaryIncrementRate: 1.7,
      bonusIncretmentRate: 360,
      stdSalaryIncrementRate: 2.0,
      payband: '적용(상한)',
      salaryBefore: 8000000,
      salaryAfter: 8500000,
      totalSalaryBefore: 130000000,
      totalSalaryAfter: 140000000,
    },
    {
      empNum: 'pd10s7',
      name: '홍수연',
      grade: 'P3',
      position: '과장',
      departmentName: '정보보안팀',
      rank: 'A',
      salaryIncrementRate: 2.2,
      bonusIncretmentRate: 520,
      stdSalaryIncrementRate: 2.6,
      payband: '미적용',
      salaryBefore: 9500000,
      salaryAfter: 10200000,
      totalSalaryBefore: 160000000,
      totalSalaryAfter: 170000000,
    },
    {
      empNum: 'pd1s08',
      name: '강하늘',
      grade: 'P4',
      position: '이사',
      departmentName: '전략기획실',
      rank: 'S',
      salaryIncrementRate: 3.0,
      bonusIncretmentRate: 700,
      stdSalaryIncrementRate: 3.5,
      payband: '적용(상한)',
      salaryBefore: 15000000,
      salaryAfter: 16500000,
      totalSalaryBefore: 240000000,
      totalSalaryAfter: 260000000,
    },
    {
      empNum: 'pd1s09',
      name: '최지민',
      grade: 'P2',
      position: '대리',
      departmentName: '총무팀',
      rank: 'B',
      salaryIncrementRate: 1.8,
      bonusIncretmentRate: 400,
      stdSalaryIncrementRate: 2.1,
      payband: '적용(하한)',
      salaryBefore: 7500000,
      salaryAfter: 8000000,
      totalSalaryBefore: 120000000,
      totalSalaryAfter: 125000000,
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
        options: [...new Set(result.map((item) => item.grade))],
        initialValue: '',
      },
      부서: {
        optionType: 'dropdown',
        options: [...new Set(result.map((item) => item.departmentName))],
        initialValue: '',
      },
      평가: {
        optionType: 'dropdown',
        options: [...new Set(result.map((item) => item.rank))],
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
    const nameMapping = {
      성명: 'name',
      직번: 'empNum',
      부서: 'departmentName',
      직급: 'grade',
      평가: 'rank',
      기준연봉: 'salaryAfter',
      계약연봉: 'totalSalaryAfter',
    };
    /* 해당 useEffect 안에 있는 정렬, 페이징 알고리즘은 나중에 DB Query로 해결할 예정 */
    /* 일단은 필터, 정렬, 페이지네이션이 돌아가기만 하는 코드로 냅둠 */

    let filteredData = result;
    // filters가 존재하고 비어있지 않으면 필터 적용
    if (filters.length > 0) {
      filteredData = result.filter((item) =>
        filters.every(({ key, value }) => {
          if (key === '성명' || key === '직번') {
            return (
              (value?.length ?? 0) === 0 ||
              item[nameMapping[key]].includes(value)
            );
          }
          return (
            (value?.length ?? 0) === 0 ||
            value?.includes(item[nameMapping[key]])
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
      setRowsPerPage(6);
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
            pageOptions={tableMode ? [5, 10, 20, 50] : [6, 12, 24, 30]}
          />
        </div>
      </div>
    </AdjustEditLayout>
  );
}
