import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import Pagination from '#components/Pagination';
import MobileLayout from '#src/layouts/MobileLayout/MobileLayout';
import styles from './adjust-history-page.module.css';

const mockData = [
  {
    adjustId: 5,
    연도: 2024,
    차수: 5,
    종류: '정기연봉조정',
    stdSalary: 29921343,
    stdSalaryIncrRate: 1.6,
    hpoStdSalaryIncrRate: 4,
    bonus: 10000000,
    stdBonus: 5000000,
  },
  {
    adjustId: 4,
    연도: 2024,
    차수: 4,
    종류: '정기연봉조정',
    stdSalary: 28912222,
    stdSalaryIncrRate: 1.4,
    hpoStdSalaryIncrRate: 5,
    bonus: 5000000,
    stdBonus: 4000000,
  },
  {
    adjustId: 3,
    연도: 2024,
    차수: 3,
    종류: '정기연봉조정',
    stdSalary: 26911111,
    stdSalaryIncrRate: 1.6,
    hpoStdSalaryIncrRate: 4.5,
    bonus: 10000000,
    stdBonus: 5000000,
  },
  {
    adjustId: 2,
    연도: 2024,
    차수: 2,
    종류: '정기연봉조정',
    stdSalary: 25812222,
    stdSalaryIncrRate: 2.0,
    hpoStdSalaryIncrRate: 2.2,
    bonus: 10000000,
    stdBonus: 3000000,
  },
  {
    adjustId: 1,
    연도: 2024,
    차수: 1,
    종류: '정기연봉조정',
    stdSalary: 24600000,
    stdSalaryIncrRate: 1.4,
    hpoStdSalaryIncrRate: 4.4,
    bonus: 5000000,
    stdBonus: 2000000,
  },
];

const barChartOptions = {
  plugins: {
    title: {
      display: false,
      text: 'history',
    },
    legend: {
      display: true,
      position: 'top',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const lineChartOptions = {
  responsive: true,
  interaction: {
    intersect: false,
    axis: 'x',
  },
  plugins: {
    title: {
      display: false,
      text: 'Step',
    },
    fill: true,
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
);

function getLabels(data) {
  return data
    .slice()
    .reverse()
    .map(({ 연도, 차수 }) => `${연도}(${차수})`);
}

export default function AdjustHistoryPage() {
  const data = mockData;
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  return (
    <MobileLayout>
      <section className={styles.section}>
        <h2>연봉 인상 추이</h2>
        {data && (
          <>
            <div>
              <Bar
                key={`bar-${data.length}`}
                data={data
                  .slice()
                  .reverse()
                  .reduce(
                    (prev, { stdSalary, bonus, stdBonus }) => {
                      const newObj = { ...prev };

                      newObj.datasets[0].data = [
                        ...newObj.datasets[0].data,
                        stdSalary,
                      ];
                      newObj.datasets[1].data = [
                        ...newObj.datasets[1].data,
                        bonus,
                      ];
                      newObj.datasets[2].data = [
                        ...newObj.datasets[2].data,
                        stdBonus,
                      ];

                      return newObj;
                    },
                    {
                      labels: getLabels(data),
                      datasets: [
                        {
                          label: '기준연봉',
                          stack: 'Stack 0',
                          backgroundColor: 'rgb(255, 99, 132)',
                          data: [],
                        },
                        {
                          label: '경영성과금',
                          stack: 'Stack 0',
                          backgroundColor: 'rgb(75, 192, 192)',
                          data: [],
                        },
                        {
                          label: '경영성과금 기준금액',
                          stack: 'Stack 1',
                          backgroundColor: 'rgb(53, 162, 235)',
                          data: [],
                        },
                      ],
                    },
                  )}
                options={barChartOptions}
              />
            </div>
            <div>
              <Line
                data={data.reduce(
                  (prev, curr) => {
                    const newObj = { ...prev };

                    newObj.datasets[0].data = [
                      ...newObj.datasets[0].data,
                      curr.stdSalaryIncrRate,
                    ];
                    newObj.datasets[1].data = [
                      ...newObj.datasets[1].data,
                      curr.hpoStdSalaryIncrRate,
                    ];

                    return newObj;
                  },
                  {
                    labels: getLabels(data),
                    datasets: [
                      {
                        label: '기준연봉 인상률',
                        data: [],
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgb(255, 99, 132)',
                      },
                      {
                        label: '고성과조직 가산률',
                        data: [],
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgb(53, 162, 235)',
                      },
                    ],
                  },
                )}
                options={lineChartOptions}
              />
            </div>
          </>
        )}
      </section>
      <section className={styles.section}>
        <h2>상세 이력 조회</h2>
        <table>
          <thead>
            <tr>
              <td>연도</td>
              <td>차수</td>
              <td>종류</td>
            </tr>
          </thead>
          <tbody>
            {mockData.slice(0, 5).map(({ adjustId, 연도, 차수, 종류 }) => (
              <tr
                key={adjustId}
                onClick={() => navigate(`/personal/adjust/${adjustId}`)}
              >
                <td>{연도}</td>
                <td>{차수}</td>
                <td>{종류}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={page}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
          onRowsPerPageChange={(newRowsPerPage) => {
            setRowsPerPage(newRowsPerPage);
          }}
          totalPage={Math.ceil(mockData.length / rowsPerPage)}
        />
      </section>
    </MobileLayout>
  );
}
