// router.jsx
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { AdjustProvider } from '#contexts/AdjustContext';
import AppLayout from '#layouts/AppLayout';
import RootLayout from '#layouts/RootLayout';
import MainDashboardPage from '#pages/MainDashboardPage';
import MainPage from '#pages/MainPage';
import TestEditPage from '#pages/TestEditPage';
import TestPage from '#pages/TestPage';
import PaybandCriteriaPage from '#pages/adjust-edit/criteria/PaybandCriteriaPage';
import PaymentRateCriteriaPage from '#pages/adjust-edit/criteria/PaymentRateCriteriaPage';
import SubjectCriteriaPage from '#pages/adjust-edit/criteria/SubjectCriteriaPage';
import PaybandApplyPage from '#pages/adjust-edit/main/PaybandApplyPage';
import ResultPage from '#pages/adjust-edit/main/ResultPage';
import HpoApplyPage from '#pages/adjust-edit/preparation/HpoApplyPage';
import SubjectAssignPage from '#pages/adjust-edit/preparation/SubjectAssignPage';
import AdjustHistoryDetailPage from '#src/pages/AdjustHistoryDetailPage/AdjustHistoryDetailPage';
import AdjustHistoryPage from '#src/pages/AdjustHistoryPage/AdjustHistoryPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="personal">
        <Route element={<AdjustHistoryPage />} />
        <Route path=":id" element={<AdjustHistoryDetailPage />} />
      </Route>
      <Route element={<RootLayout />}>
        <Route
          index
          element={
            <AppLayout title="메인" breadCrumbs={['메인']}>
              <MainDashboardPage />
            </AppLayout>
          }
        />
        <Route path="test" element={<TestPage />} />
        <Route
          path="personal"
          element={
            <AppLayout
              title="개인 연봉 조회"
              breadCrumbs={['개인 연봉 조회']}
            />
          }
        />
        <Route
          path="formula"
          element={
            <AppLayout title="계산식 관리" breadCrumbs={['계산식 관리']} />
          }
        />
        <Route path="adjust/list" element={<MainPage />} />
        <Route path="adjust/edit">
          <Route
            index
            element={
              <AppLayout title="연봉조정 등록" breadCrumbs={['조정', '등록']} />
            }
          />
          <Route path=":id" element={<AdjustProvider />}>
            <Route path="test-edit" element={<TestEditPage />} />
            <Route path="annual">
              <Route path="criteria">
                <Route path="subject" element={<SubjectCriteriaPage />} />
                <Route
                  path="payment-rate"
                  element={<PaymentRateCriteriaPage />}
                />
                <Route path="payband" element={<PaybandCriteriaPage />} />
              </Route>
              <Route path="preparation">
                <Route path="subject" element={<SubjectAssignPage />} />
                <Route path="high-performance" element={<HpoApplyPage />} />
              </Route>
              <Route path="main">
                <Route path="payband" element={<PaybandApplyPage />} />
                <Route path="result" element={<ResultPage />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>,
  ),
  {
    basename: process.env.PUBLIC_URL,
  },
);

export default router;
