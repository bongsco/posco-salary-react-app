import { useState } from 'react';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import styles from './result-page.module.css';
import Button from '#components/Button';
import PageNation from '#components/Pagination';
import ResultTableRow from './ResultTableRow';

export default function ResultPage() {
  /* 현재 페이지 수, 현재 테이블에 보여줄 데이터 수 */
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
    // ... (15개 더 있음)
  ]);

  return (
    <AdjustEditLayout
      prevStepPath="payband"
      stepPaths={['본 연봉조정', '조정 결과 미리보기']}
      isCommitted
      canMove
    >
      <h2>정기 연봉 조정 결과</h2>
      <div className={styles['filter-sort-area']}>
        <div className={styles['right-group']}>
          <Button variant="secondary" size="large" label="엑셀다운로드" />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <td>직번</td>
            <td>성명</td>
            <td>직급</td>
            <td>직책</td>
            <td>부서</td>
            <td>평가</td>
            <td>평차연봉인상률</td>
            <td>평차금인상률</td>
            <td>기준연봉인상률</td>
            <td>Payband</td>
            <td>
              <div className={styles['salary-td']}>
                <div>연봉</div>
                <div className={styles['salary-bundle']}>
                  <div className={styles['salary-detail']}>
                    기준연봉 조정전후
                  </div>
                  <div className={styles['salary-detail']}>
                    계약연봉총액 조정전후
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
          {result.map((row) => (
            <ResultTableRow key={row.empNum} item={row} />
          ))}
        </tbody>
      </table>
      <div className={styles['page-nation-area']}>
        <PageNation
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </div>
    </AdjustEditLayout>
  );
}
