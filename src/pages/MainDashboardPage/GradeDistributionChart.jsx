import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import useSWR from 'swr';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import fetchApi from '#utils/fetch';

ChartJS.register(ArcElement, Tooltip, Legend);

function GradeGroupDistributionChart() {
  const { addError } = useErrorHandlerContext();

  const { data, isLoading } = useSWR('/gradeDistribution', async (url) => {
    const res = await fetchApi(url);
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

  const chartData = {
    labels,
    datasets: [
      {
        label: '직군별 인원 수',
        data: counts,
        backgroundColor: [
          '#4c6ef5',
          '#845ef7',
          '#20c997',
          '#fab005',
          '#e64980',
          '#228be6',
          '#12b886',
        ],
        borderWidth: 1,
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
    <div style={{ width: '100%', maxWidth: 600 }}>
      <h3>직군별 인력 분포</h3>
      <Doughnut data={chartData} options={options} />
    </div>
  );
}

export default GradeGroupDistributionChart;
