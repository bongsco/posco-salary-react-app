import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import useSWR from 'swr';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import fetchApi from '#utils/fetch';

ChartJS.register(ArcElement, Tooltip, Legend);

function EmploymentTypeDistributionChart() {
  const { addError } = useErrorHandlerContext();

  const { data, isLoading } = useSWR('/employmentDistribution', async (url) => {
    const res = await fetchApi(url);
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

  const chartData = {
    labels,
    datasets: [
      {
        label: '신분별 인원 수',
        data: counts,
        backgroundColor: [
          '#4c6ef5',
          '#845ef7',
          '#20c997',
          '#fab005',
          '#e64980',
          '#228be6',
          '#12b886',
          '#ffa94d',
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
      <h3>신분별 인력 분포</h3>
      <Doughnut data={chartData} options={options} />
    </div>
  );
}

export default EmploymentTypeDistributionChart;
