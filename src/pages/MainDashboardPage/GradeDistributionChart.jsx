import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import useSWR from 'swr';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import useFetchWithAuth from '#hooks/useFetchWithAuth';
import styles from './main-chart-page.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function GradeGroupDistributionChart() {
  const { addError } = useErrorHandlerContext();
  const fetchWithAuth = useFetchWithAuth();

  const { data, isLoading } = useSWR('/gradeDistribution', async (url) => {
    const res = await fetchWithAuth(url);
    if (!res?.ok) {
      addError(
        `Sent request to ${url}, but got ${res.status}`,
        '직급 분포 데이터를 불러올 수 없습니다.',
        'GRADE_GROUP_DISTRIBUTION_ERROR',
      );
      return null;
    }
    return res.json();
  });

  if (isLoading || !data) return <p>Loading...</p>;

  // 직군별로 그룹화
  const grouped = {};
  data.forEach(({ grade, count, percentage }) => {
    const group = grade.charAt(0);
    if (!grouped[group]) {
      grouped[group] = { count: 0, percentage: 0 };
    }
    grouped[group].count += count;
    grouped[group].percentage += percentage;
  });

  // 차트용 배열로 변환
  const rawGroups = Object.keys(grouped);
  const labels = rawGroups.map((g) => `직군 ${g}`);
  const counts = rawGroups.map((key) => grouped[key].count);
  const percentages = rawGroups.map((key) =>
    grouped[key].percentage.toFixed(1),
  );

  const topIndex = percentages.reduce(
    (maxIdx, curr, idx, arr) =>
      parseFloat(curr) > parseFloat(arr[maxIdx]) ? idx : maxIdx,
    0,
  );
  const topType = labels[topIndex]; // 예: '직군 P'
  const topPercent = percentages[topIndex]; // 예: '34.2'

  const pastelColors = [
    '#ffd6a5', // 살구 오렌지
    '#fdffb6', // 밝은 노랑
    '#caffbf', // 민트 그린
    '#9bf6ff', // 연하늘
    '#a0c4ff', // 연파랑
    '#bdb2ff', // 연보라
    '#ffc6ff', // 핑크
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: '직군별 인원 수',
        data: counts,
        backgroundColor: pastelColors.slice(0, counts.length),
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
        <h3 className={styles.title}>직군별 인력 분포</h3>
        <p className={styles.description}>
          <strong>{topType}</strong> 비율이{' '}
          <strong className={styles.positive}>{topPercent}%</strong>로 가장 높음
        </p>
      </div>

      <div className={styles.rightChart}>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}

export default GradeGroupDistributionChart;
