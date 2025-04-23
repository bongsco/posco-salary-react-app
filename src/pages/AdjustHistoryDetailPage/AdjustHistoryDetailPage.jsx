import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { useAuth } from '#contexts/AuthContext';
import useFetchWithAuth from '#hooks/useFetchWithAuth';
import MobileLayout from '#layouts/MobileAppLayout';
import styles from './adjust-history-detail-page.module.css';

function numberWithCommas(x) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function AdjustHistoryDetailPage() {
  const { id } = useParams();
  const fetchWithAuth = useFetchWithAuth();
  const { auth } = useAuth();

  const { data } = useSWR(
    `/mobile/details/${id}`,
    async (url) => {
      const response = await fetchWithAuth(url, {
        method: 'GET',
        headers: {
          email: auth?.email,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      return response.json();
    },
    {
      fallbackData: {
        year: '...',
        orderNumber: '...',
        adjustType: '...',
        author: 'Loading...',
        baseDate: 'Loading...',
        exceptionStartDate: 'Loading...',
        exceptionEndDate: 'Loading...',
        name: 'Loading...',
        gradeName: 'Loading...',
        departmentName: 'Loading...',
        positionName: 'Loading...',
        hireDate: 'Loading...',
        employmentTypeName: 'Loading...',
        rankName: 'Loading...',
        salaryIncrementRate: 'Loading...',
        bonusMultiplier: 'Loading...',
        isInHpo: 'Loading...',
        hpoSalaryIncrementByRank: 'Loading...',
        hpoBonusMultiplier: 'Loading...',
        finalSalaryIncrementRate: 'Loading...',
        finalBonusMultiplier: 'Loading...',
        beforeStdSalary: 'Loading...',
        stdSalary: 'Loading...',
        hpoBonus: 'Loading...',
        isPaybandApplied: 'Loading...',
        contractSalary: 'Loading...',
      },
    },
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <MobileLayout
      path={[`${data.year}년 ${data.orderNumber}차 ${data.adjustType}`]}
      className={styles.page}
    >
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
              <td>{data.orderNumber}</td>
              <td>{data.adjustType}</td>
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
                <td>{data.gradeName}</td>
                <td>{data.departmentName}</td>
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
                <td>{data.employmentTypeName}</td>
                <td>{data.rankCode}</td>
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
                  평가차등 경영성과금 지급률
                  <br />
                  (평차금 + 고성과조직 가산률)
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {data.salaryIncrementRate}%
                  <br />
                  <span>
                    ({data.salaryIncrementRate}%,{data.hpoSalaryIncrementByRank}
                    %)
                  </span>
                </td>
                <td>
                  <span>
                    {data.finalBonusMultiplier}%
                    <br />({data.bonusMultiplier}% + {data.hpoBonusMultiplier}%)
                  </span>
                </td>
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
                <td>{numberWithCommas(data.beforeStdSalary)}</td>
                <td>{numberWithCommas(data.stdSalary)}</td>
                <td>{numberWithCommas(data.hpoBonus)}</td>
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
                <td>{data.isPaybandApplied}</td>
                <td>{data.contractSalary}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </MobileLayout>
  );
}
