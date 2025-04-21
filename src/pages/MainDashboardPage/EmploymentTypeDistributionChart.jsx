import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import useSWR from 'swr';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import useFetchWithAuth from '#hooks/useFetchWithAuth';
import styles from './main-chart-page.module.css';

// 기존 스타일 재사용

ChartJS.register(ArcElement, Tooltip, Legend);

function EmploymentTypeDistributionChart() {
  const { addError } = useErrorHandlerContext();
  const fetchWithAuth = useFetchWithAuth();

  const { data, isLoading } = useSWR('/employmentDistribution', async (url) => {
    const res = await fetchWithAuth(url);
    if (!res?.ok) {
      addError(
        `Sent request to ${url}, but got ${res.status}`,
        '신분별 인력 데이터를 불러올 수 없습니다.',
        'EMPLOYMENT_DISTRIBUTION_ERROR',
      );
      return null;
    }
    return res.json();
  });

  if (isLoading || !data) return <p>Loading...</p>;

  const labels = data.map((d) => d.employmentType);
  const counts = data.map((d) => d.count);
  const percentages = data.map((d) => d.percentage.toFixed(1));

  const maxIndex = data.reduce(
    (maxIdx, curr, idx, arr) =>
      curr.percentage > arr[maxIdx].percentage ? idx : maxIdx,
    0,
  );
  const topType = data[maxIndex].employmentType;
  const topPercent = data[maxIndex].percentage.toFixed(1);

  const chartData = {
    labels,
    datasets: [
      {
        label: '신분별 인원 수',
        data: counts,
        backgroundColor: [
          '#FFB5A7',
          '#FCD5CE',
          '#D8E2DC',
          '#A2D2FF',
          '#B5EAD7',
          '#C7CEEA',
          '#E2F0CB',
          '#FFDAC1',
        ],
        borderWidth: 1,
        borderColor: '#fff',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const index = ctx.dataIndex;
            return `${ctx.label}: ${counts[index]}명 (${percentages[index]}%)`;
          },
        },
      },
      legend: {
        position: 'right',
      },
      datalabels: false,
    },
  };

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.leftInfo}>
        <h3 className={styles.title}>신분별 인력 분포</h3>
        <p className={styles.description}>
          <strong>{topType}</strong> 점유율{' '}
          <strong className={styles.positive}>{topPercent}%</strong>로 가장 많음
        </p>
      </div>

      <div className={styles.rightChart}>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}

export default EmploymentTypeDistributionChart;
