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
import useSWR from 'swr';
import Pagination from '#components/Pagination';
import { useAuth } from '#contexts/AuthContext';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import useFetchWithAuth from '#hooks/useFetchWithAuth';
import MobileAppLayout from '#layouts/MobileAppLayout';
import styles from './adjust-history-page.module.css';

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
    datalabels: {
      display: false,
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
    datalabels: {
      display: false,
    },
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
    .map(({ year, orderNumber }) => `${year}(${orderNumber})`);
}

export default function AdjustHistoryPage() {
  const fetchWithAuth = useFetchWithAuth();
  const { addError } = useErrorHandlerContext();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data: chartData } = useSWR(
    `/mobile/chartData`,
    async (url) => {
      try {
        const res = await fetchWithAuth(url, {
          headers: { email: auth.email },
        });

        if (!res.ok) {
          throw new Error(`네트워크 상태를 확인해 주시기 바랍니다`);
        }

        return res.json();
      } catch (error) {
        addError(
          '연봉조정 이력 조회 실패',
          error.message,
          'ADJUST_HISTORY_FETCH_ERROR',
        );
        return [];
      }
    },
    {
      keepPreviousData: true,
      fallback: [],
    },
  );

  const { data: adjustListData } = useSWR(
    `/mobile/adjusts?pageNum=${page}&pageSize=${rowsPerPage}`,
    async (url) => {
      try {
        const res = await fetchWithAuth(url, {
          headers: { email: auth.email },
        });

        if (!res.ok) {
          throw new Error(`네트워크 상태를 확인해 주시기 바랍니다`);
        }

        return res.json();
      } catch (error) {
        addError(
          '연봉조정 이력 조회 실패',
          error.message,
          'ADJUST_HISTORY_FETCH_ERROR',
        );
        return [];
      }
    },
    {
      keepPreviousData: true,
      fallback: [],
    },
  );

  return (
    <MobileAppLayout>
      <section className={styles.section}>
        <h2>연봉 인상 추이</h2>
        {chartData && (
          <>
            <div>
              <Bar
                key={`bar-${chartData.length}`}
                data={chartData
                  .slice()
                  .reverse()
                  .reduce(
                    (prev, { stdSalary, hpoBonus, bonusPrice }) => {
                      const newObj = { ...prev };

                      newObj.datasets[0].data = [
                        ...newObj.datasets[0].data,
                        stdSalary,
                      ];
                      newObj.datasets[1].data = [
                        ...newObj.datasets[1].data,
                        hpoBonus,
                      ];
                      newObj.datasets[2].data = [
                        ...newObj.datasets[2].data,
                        bonusPrice,
                      ];

                      return newObj;
                    },
                    {
                      labels: getLabels(chartData),
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
                data={chartData.reduce(
                  (prev, curr) => {
                    const newObj = { ...prev };

                    newObj.datasets[0].data = [
                      ...newObj.datasets[0].data,
                      curr.salaryIncrementRate,
                    ];
                    newObj.datasets[1].data = [
                      ...newObj.datasets[1].data,
                      curr.hpoSalaryIncrement,
                    ];

                    return newObj;
                  },
                  {
                    labels: getLabels(chartData),
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
            {adjustListData?.adjustList?.map(
              ({ id, year, orderNumber, adjustTypeName }) => (
                <tr key={id} onClick={() => navigate(`/${id}`)}>
                  <td>{year}</td>
                  <td>{orderNumber}</td>
                  <td>{adjustTypeName}</td>
                </tr>
              ),
            )}
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
          totalPage={adjustListData?.totalPages ?? 1}
        />
      </section>
    </MobileAppLayout>
  );
}
