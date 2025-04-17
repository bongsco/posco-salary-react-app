// MainChartPage.jsx
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import useSWR from 'swr';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import fetchApi from '#utils/fetch';
import styles from './main-chart-page.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  LineController,
  BarController,
  Legend,
  Tooltip,
);

function MainChartPage() {
  const { addError } = useErrorHandlerContext();

  const { data, isLoading } = useSWR('/headcount-trend', async (url) => {
    const res = await fetchApi(url);
    if (!res?.ok) {
      addError(
        `Sent request to ${url}, but got ${res.status}`,
        '차트 데이터를 불러올 수 없습니다.',
        'CHART_FETCH_ERROR',
      );
      return null;
    }
    return res.json();
  });

  if (isLoading || !data) return <p>Loading...</p>;

  // 최근 차수 10개만 사용
  const recentData = data.slice(-10);

  const labels = recentData.map((item) => item.adjustCycle);
  const headcounts = recentData.map((item) => item.headcount);
  const changeRates = recentData.map((item) => item.changeRate);
  const latestHeadcount = headcounts.at(-1) ?? 0;

  const avgChangeRate = (
    recentData.reduce((sum, d) => sum + d.changeRate, 0) / recentData.length
  ).toFixed(1);

  const diffs = [];

  for (let i = 1; i < recentData.length; i += 1) {
    const delta = recentData[i].changeRate - recentData[i - 1].changeRate;
    diffs.push(delta);
  }

  const avgChange = (
    diffs.reduce((sum, d) => sum + d, 0) / diffs.length
  ).toFixed(1);

  // 막대 차트 데이터
  const barData = {
    labels,
    datasets: [
      {
        label: '총 인원',
        data: headcounts,
        backgroundColor: '#4c6ef5',
      },
    ],
  };

  // 점 그래프 데이터
  const lineData = {
    labels,
    datasets: [
      {
        label: '증감률(전년 대비)',
        data: changeRates,
        borderColor: '#fab005',
        backgroundColor: '#fab005',
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false,
        tension: 0.4,
        showLine: false,
      },
    ],
  };

  return (
    <div className={styles.card}>
      <div className={styles.chartWrapper}>
        {/* 왼쪽 설명 영역 */}
        <div className={styles.leftInfo}>
          <h2 className={styles.title}>총 인력 현황</h2>
          <p className={styles.total}>
            <strong>{latestHeadcount.toLocaleString()}</strong>명
          </p>
          <p className={styles.description}>
            평균 인원 변화율{' '}
            <span className={styles.positive}>{avgChangeRate}%</span> 증가
            <br />
            증감률 변화폭 <span className={styles.negative}>
              {-avgChange}%
            </span>{' '}
            감소
          </p>
          <div className={styles.legend}>
            <span className={styles.barLegend}>⬤ 총 인원</span>
            <span className={styles.lineLegend}>⬤ 증감률 (전년 대비)</span>
          </div>
        </div>

        {/* 오른쪽 그래프 영역 */}
        <div className={styles.rightChart}>
          <div className={styles.lineChart}>
            <Line
              data={lineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: (ctx) => `증감률: ${ctx.raw}%`,
                    },
                  },
                  datalabels: false,
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: { display: true, text: '증감률 (%)' },
                  },
                  x: {
                    display: false,
                    ticks: {
                      align: 'center',
                    },
                  },
                },
              }}
            />
          </div>

          <div className={styles.barChart}>
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  datalabels: false,
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: { display: true, text: '총 인원' },
                  },
                  x: {
                    title: { display: true, text: '조정 년도' },
                    ticks: {
                      align: 'center',
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainChartPage;
