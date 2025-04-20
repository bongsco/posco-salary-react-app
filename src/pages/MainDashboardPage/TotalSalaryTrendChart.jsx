// pages/TotalSalaryTrendChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import useSWR from 'swr';
import fetchApi from '#utils/fetch';
import styles from './main-chart-page.module.css';

function TotalSalaryTrendChart() {
  const { data, isLoading } = useSWR('/totalSalaryTrend', async (url) => {
    const res = await fetchApi(url);
    if (!res?.ok) return null;
    return res.json();
  });

  if (isLoading || !data) return <p>Loading...</p>;

  const { averageSalary, increaseRate, salaryRanges } = data;

  const labels = salaryRanges.map((r) => r.range);
  const counts = salaryRanges.map((r) => r.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: '인원 수',
        data: counts,
        backgroundColor: [
          '#a5d8ff',
          '#74c0fc',
          '#4dabf7',
          '#339af0',
          '#228be6',
          '#1c7ed6',
          '#1971c2',
        ].slice(0, counts.length),
        borderRadius: 6,
        barThickness: 80,
      },
    ],
  };

  const options = {
    responsive: true,
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
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: '인원 수' },
        grid: { display: false },
      },
    },
  };

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.leftInfo}>
        <h3 className={styles.title}>평균 급여 현황</h3>
        <p className={styles.total}>
          <strong>{Math.round(averageSalary / 10000).toLocaleString()}</strong>
          만원
        </p>
        <p className={styles.description}>
          전년 대비 평균연봉{' '}
          <span
            className={increaseRate >= 0 ? styles.positive : styles.negative}
          >
            {increaseRate}%
          </span>{' '}
          {increaseRate >= 0 ? '증가' : '감소'}
        </p>
      </div>

      <div className={styles.rightChart}>
        <div className={styles.barChart}>
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
}

export default TotalSalaryTrendChart;
