import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React from 'react';
import { Chart } from 'react-chartjs-2';
// ✅ Chart로 변경
import useSWR from 'swr';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import fetchApi from '#utils/fetch';

// import styles from './main-chart-page.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartDataLabels,
);

const colorMap = ['#74c0fc', '#ffd43b', '#63e6be', '#ff8787', '#b197fc'];

function SalaryGradeTrendChart() {
  const { addError } = useErrorHandlerContext();
  const { data, isLoading } = useSWR('/salaryGradeTrend', async (url) => {
    const res = await fetchApi(url);
    if (!res?.ok) {
      addError(
        `Request to ${url} failed with status ${res.status}`,
        '직급에 대한 연봉 데이터를 불러올 수 없습니다.',
        'SALARY_GRADE_TREND_ERROR',
      );
      return null;
    }
    return res.json();
  });

  if (isLoading || !Array.isArray(data)) return <p>Loading...</p>;

  const groups = [...new Set(data.map((d) => d.grade.charAt(0)))].sort();

  const groupYearMap = {};
  groups.forEach((group) => {
    const groupData = data
      .filter((d) => d.grade.startsWith(group))
      .sort((a, b) => b.year - a.year);

    const latestYears = [...new Set(groupData.map((d) => d.year))]
      .slice(0, 4)
      .sort();

    groupYearMap[group] = latestYears.map((year) => {
      const total = groupData
        .filter((d) => d.year === year)
        .reduce((sum, d) => sum + d.totalSalary, 0);
      return { year, total: Math.round(total / 100000000) };
    });
  });

  const allYears = [
    ...new Set(
      Object.values(groupYearMap)
        .flat()
        .map((d) => d.year),
    ),
  ].sort();

  const avgDataset = {
    type: 'line',
    label: '4개년 평균',
    data: groups.map((g) => {
      const values = groupYearMap[g]?.map((e) => e.total) || [];
      const avg =
        values.reduce((sum, val) => sum + val, 0) / (values.length || 1);
      return parseFloat(avg.toFixed(1));
    }),
    borderColor: '#4263eb',
    backgroundColor: '#4263eb',
    pointBackgroundColor: '#4263eb',
    pointBorderColor: '#fff',
    pointRadius: 5,
    pointHoverRadius: 7,
    showLine: true,
    order: allYears.length + 1,
  };

  const barDatasets = allYears.map((year, i) => ({
    label: `${year}년`,
    data: groups.map((g) => {
      const entry = groupYearMap[g]?.find((e) => e.year === year);
      return entry ? entry.total : 0;
    }),
    backgroundColor: colorMap[i % colorMap.length],
    barThickness: 13,
    borderRadius: 6,
    order: i,
  }));

  const chartData = {
    labels: groups.map((g) => `${g}직군`),
    datasets: [...barDatasets, avgDataset],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 12 },
          padding: 12,
        },
      },
      tooltip: {
        backgroundColor: '#f1f3f5',
        titleColor: '#212529',
        bodyColor: '#212529',
        borderColor: '#dee2e6',
        borderWidth: 1,
        callbacks: {
          label: (ctx) =>
            ctx.dataset.label === '4개년 평균'
              ? `평균: ${ctx.raw}억`
              : `${ctx.dataset.label}: ${ctx.raw}억`,
        },
      },
      datalabels: {
        display: (ctx) => ctx.dataset.label === '4개년 평균',
        color: '#4263eb',
        anchor: 'end',
        align: 'start',
        offset: 4,
        font: {
          weight: 'bold',
          size: 11,
        },
        formatter: (value) => `${value}억`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          font: { size: 14 },
        },
        ticks: {
          font: { size: 12 },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '총 인건비 (억 원)',
          font: { size: 14 },
        },
        ticks: {
          stepSize: 50,
          font: { size: 12 },
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        maxWidth: 800,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <h3 style={{ marginBottom: '1rem' }}>직군별 총 인건비</h3>
      <p
        style={{
          fontSize: '1.1rem',
          color: '#555',
          marginBottom: '1.2rem',
          lineHeight: 1.5,
        }}
      >
        각 직군에 대해{' '}
        <span style={{ color: '#4263eb', fontWeight: 600 }}>최근 4년간</span>의
        총 인건비 변화
      </p>
      <Chart type="bar" data={chartData} options={options} />
    </div>
  );
}

export default SalaryGradeTrendChart;
