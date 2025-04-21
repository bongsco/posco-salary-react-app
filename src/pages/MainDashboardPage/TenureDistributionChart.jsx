import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import useSWR from 'swr';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import useFetchWithAuth from '#hooks/useFetchWithAuth';
import styles from './main-chart-page.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels,
);

function TenureDistributionChart() {
  const { addError } = useErrorHandlerContext();
  const fetchWithAuth = useFetchWithAuth();

  const { data, isLoading } = useSWR('/tenureDistribution', async (url) => {
    const res = await fetchWithAuth(url);
    if (!res?.ok) {
      addError(
        `Request to ${url} failed with status ${res.status}`,
        '근속연차 분포 데이터를 불러올 수 없습니다.',
        'TENURE_DISTRIBUTION_ERROR',
      );
      return null;
    }
    return res.json();
  });

  if (isLoading || !data) return <p>Loading...</p>;

  const sortedData = [...data].sort((a, b) => a.year - b.year);

  // 평균 근속연수 계산
  const totalYears = sortedData.reduce((sum, d) => sum + d.year * d.count, 0);
  const totalPeople = sortedData.reduce((sum, d) => sum + d.count, 0);
  const averageYears = (totalYears / totalPeople).toFixed(1);

  // 구간 정의
  const ranges = [
    { label: '0~4', from: 0, to: 4 },
    { label: '5~10', from: 5, to: 10 },
    { label: '11~15', from: 11, to: 15 },
    { label: '16~20', from: 16, to: 20 },
    { label: '21년 이상', from: 21, to: Infinity },
  ];

  // 구간별 인원 합산
  const grouped = ranges.map(({ label, from, to }) => {
    const total = sortedData
      .filter((item) => item.year >= from && item.year <= to)
      .reduce((sum, item) => sum + item.count, 0);
    return { label, total };
  });

  // 가장 퇴직자 많은 구간 찾기
  const maxGroup = grouped.reduce(
    (max, curr) => (curr.total > max.total ? curr : max),
    grouped[0],
  );

  const labels = grouped.map((g) => g.label);
  const values = grouped.map((g) => g.total);
  const pastelColors = [
    '#FFA69E', // 0~4
    '#FFCB77', // 5~10
    '#A0CED9', // 11~15
    '#B5EAD7', // 16~20
    '#DABFFF', // 21년 이상
  ];
  const chartData = {
    labels,
    datasets: [
      {
        label: '인원 수',
        data: values,
        backgroundColor: pastelColors.slice(0, values.length),
      },
    ],
  };

  const options = {
    responsive: true,
    layout: {
      padding: {
        top: 30,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `인원 수: ${ctx.raw}명`,
        },
      },
      datalabels: {
        anchor: 'end',
        align: 'start',
        offset: -18,
        color: '#000',
        font: {
          weight: 'bold',
        },
        clip: false,
        formatter: (value) => `${value}명`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '근속 연차',
        },
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.leftInfo}>
        <h3 className={styles.title}>평균 근속연수</h3>
        <p className={styles.total}>
          <strong>{averageYears}</strong>
          <span style={{ fontSize: '1.2rem' }}>년</span>
        </p>
        <p className={styles.description}>
          최근 1년간 <span className={styles.positive}>{maxGroup.label}</span>
          년차의 현직자가 가장 많음
        </p>
      </div>
      <div className={styles.rightChart}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default TenureDistributionChart;
