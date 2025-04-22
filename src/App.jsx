import { isMobile } from 'react-device-detect';
import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { AdjustProvider } from '#contexts/AdjustContext';
import { AuthProvider } from '#contexts/AuthContext';
import { ErrorHandlerProvider } from '#contexts/ErrorHandlerContext';
import AppLayout from '#layouts/AppLayout';
import MobileRootLayout from '#layouts/MobileRootLayout';
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
        <ErrorHandlerProvider>
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        </ErrorHandlerProvider>
      }
    >
      {isMobile ? (
        <Route
          element={
            <RequireGroup
              allowedGroups={[
                constants.group.MANAGER,
                constants.group.EMPLOYEES,
              ]}
            >
              <MobileRootLayout />
            </RequireGroup>
          }
        >
          <Route index element={<AdjustHistoryPage />} />
          <Route path=":id" element={<AdjustHistoryDetailPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      ) : (
        <Route path="/">
          <Route
            element={
              <RequireGroup allowedGroups={[constants.group.MANAGER]}>
                <RootLayout />
              </RequireGroup>
            }
          >
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

            <Route path="adjust/edit/:id" element={<AdjustProvider />}>
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

            <Route path="test" element={<TestPage />} />
          </Route>
        </Route>
      )}
    </Route>,
  ),
  {
    basename: process.env.PUBLIC_URL,
  },
);

export default router;
