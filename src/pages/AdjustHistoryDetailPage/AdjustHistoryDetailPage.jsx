import { useParams } from 'react-router-dom';
import MobileLayout from '#layouts/MobileLayout';
import styles from './adjust-history-detail-page.module.css';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function AdjustHistoryDetailPage() {
  const { id } = useParams();

  const data = {
    id,
    title: '2024년 1차 정기연봉조정',
    year: 2024,
    order: 1,
    type: '정기연봉조정',
    author: '홍길동',
    baseDate: '2024-01-01',
    exceptionStartDate: '2024-01-01',
    exceptionEndDate: '2024-01-31',
    name: '홍길동',
    grade: 'P1',
    rank: 'B',
    dept: '대충 뭔가 엄청 긴 부서 이름 예시',
    positionName: '직책이 뭐 있더라',
    hireDate: '2020-01-01',
    employmentType: '연봉직',
    salaryIncrementByRank: 1.3,
    hpoSalaryIncrement: 1.2,
    bonusMultiplierByRank: 400,
    hpoBonusMultiplier: 150,
    bonus: 5000000,
    stdSalaryBefore: 48382000,
    stdSalaryAfter: 49000000,
    payband: '미적용',
    finalSalary: 52500000,
  };

  return (
    <MobileLayout path={[data.title]} className={styles.page}>
      <h2>{data.title}</h2>
      <section className={styles.section}>
        <h3>개요</h3>
        <table>
          <thead>
            <tr>
              <td>연도</td>
              <td>차수</td>
              <td>종류</td>
              <td>등록자</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.year}</td>
              <td>{data.order}</td>
              <td>{data.type}</td>
              <td>{data.author}</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <td>기준일</td>
              <td colSpan="3">대상제외일자</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.baseDate}</td>
              <td colSpan="3">
                {data.exceptionStartDate} ~ {data.exceptionEndDate}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className={styles.section}>
        <h3>조정 당시 기준 본인 정보</h3>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <td>이름</td>
                <td>직급</td>
                <td colSpan="2">부서</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.name}</td>
                <td>{data.grade}</td>
                <td>{data.dept}</td>
              </tr>
            </tbody>
          </table>
          <table className={styles.table}>
            <thead>
              <tr>
                <td>직책</td>
                <td>채용일자</td>
                <td>급여기준</td>
                <td>평가</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.positionName}</td>
                <td>{data.hireDate}</td>
                <td>{data.employmentType}</td>
                <td>{data.rank}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className={styles.section}>
        <h3>조정 결과</h3>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <td>
                  평가차등 연봉인상률
                  <br />
                  (평차연, 고성과조직 가산률)
                </td>
                <td>
                  평가차등 연봉인상률
                  <br />
                  (평차연, 고성과조직 가산률)
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {(data.salaryIncrementByRank *
                    (data.hpoSalaryIncrement + 100)) /
                    100}
                  %<br />
                  <span>
                    ({data.salaryIncrementByRank}, {data.hpoSalaryIncrement})
                  </span>
                </td>
                <td>{data.hpoSalaryIncrement}%</td>
              </tr>
            </tbody>
          </table>
          <table className={styles.table}>
            <thead>
              <tr>
                <td>조정전 기준연봉</td>
                <td>조정후 기준연봉</td>
                <td>경영성과금</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{numberWithCommas(data.stdSalaryBefore)}</td>
                <td>{numberWithCommas(data.stdSalaryAfter)}</td>
                <td>{numberWithCommas(data.bonus)}</td>
              </tr>
            </tbody>
          </table>
          <table className={styles.table}>
            <thead>
              <tr>
                <td>Payband</td>
                <td>계약연봉</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.payband}</td>
                <td>{data.finalSalary}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </MobileLayout>
  );
}
