import { useState } from 'react';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import styles from './result-page.module.css';
import Button from '#components/Button';
import PageNation from '#components/Pagination';

export default function ResultPage() {
  /* 현재 페이지 수, 현재 테이블에 보여줄 데이터 수 */
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
              <div>
                <div>연봉</div>
                <div>
                  <div>기준연봉 조정전후</div>
                  <div>계약연봉총액 조정전후</div>
                </div>
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
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
              <div>
                <div>연봉</div>
                <div>
                  <div>기준연봉 조정전후</div>
                  <div>계약연봉총액 조정전후</div>
                </div>
              </div>
            </td>
          </tr>
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
