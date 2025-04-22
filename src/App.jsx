import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { AdjustProvider } from '#contexts/AdjustContext';
import { AuthProvider } from '#contexts/AuthContext';
import AppLayout from '#layouts/AppLayout';
import RootLayout from '#layouts/RootLayout';
import AdjustHistoryPage from '#pages/AdjustHistoryPage';
import LoginPage from '#pages/LoginPage';
import RequireGroup from '#pages/LoginPage/RequireGroup';
import LogoutPage from '#pages/LogoutPage';
import MainDashboardPage from '#pages/MainDashboardPage';
import MainPage from '#pages/MainPage';
import TestPage from '#pages/TestPage';
import PaybandCriteriaPage from '#pages/adjust-edit/criteria/PaybandCriteriaPage';
import PaymentRateCriteriaPage from '#pages/adjust-edit/criteria/PaymentRateCriteriaPage';
import SubjectCriteriaPage from '#pages/adjust-edit/criteria/SubjectCriteriaPage';
import PaybandApplyPage from '#pages/adjust-edit/main/PaybandApplyPage';
import ResultPage from '#pages/adjust-edit/main/ResultPage';
import HpoApplyPage from '#pages/adjust-edit/preparation/HpoApplyPage';
import SubjectAssignPage from '#pages/adjust-edit/preparation/SubjectAssignPage';
import AdjustHistoryDetailPage from '#src/pages/AdjustHistoryDetailPage/AdjustHistoryDetailPage';
import constants from './constant';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <AuthProvider>
          <RequireGroup allowedGroups={[constants.group.MANAGER]}>
            <RootLayout />
          </RequireGroup>
        </AuthProvider>
      }
    >
      <Route path="personal">
        <Route index element={<AdjustHistoryPage />} />
        <Route path=":id" element={<AdjustHistoryDetailPage />} />
      </Route>
      <Route
        index
        element={
          <AppLayout title="메인" breadCrumbs={['메인']}>
            <MainDashboardPage />
          </AppLayout>
        }
      />

      <Route path="login" element={<LoginPage />} />
      <Route path="logout" element={<LogoutPage />} />
      <Route path="adjust/list" element={<MainPage />} />

      <Route path="adjust/edit">
        <Route path=":id" element={<AdjustProvider />}>
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

      <Route path="test" element={<TestPage />} />
    </Route>,
    {
      basename: process.env.PUBLIC_URL,
    },
  ),
);

export default router;
