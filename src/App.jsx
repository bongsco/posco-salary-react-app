import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { AdjustProvider } from '#contexts/AdjustContext';
import { AuthProvider } from '#contexts/AuthContext';
import AppLayout from '#layouts/AppLayout';
import RootLayout from '#layouts/RootLayout';
import LoginPage from '#pages/LoginPage';
import AuthRedirect from '#pages/LoginPage/AuthRedirect';
import LoginGuard from '#pages/LoginPage/LoginGuard';
import RequireGroup from '#pages/LoginPage/RequireGroup';
import LogoutPage from '#pages/LogoutPage';
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
import constants from './constant';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <AuthProvider>
          <RootLayout />
        </AuthProvider>
      }
    >
      <Route index element={<AuthRedirect />} />
      <Route path="test" element={<TestPage />} />
      <Route
        path="login"
        element={
          <LoginGuard>
            <LoginPage />
          </LoginGuard>
        }
      />
      <Route path="logout" element={<LogoutPage />} />
      <Route
        path="personal"
        element={
          <AppLayout title="개인 연봉 조회" breadCrumbs={['개인 연봉 조회']} />
        }
      />
      <Route
        path="formula"
        element={
          <AppLayout title="계산식 관리" breadCrumbs={['계산식 관리']} />
        }
      />
      <Route
        path="adjust/list"
        element={
          <RequireGroup allowedGroups={[constants.group.MANAGER]}>
            <MainPage />
          </RequireGroup>
        }
      />

      <Route path="adjust/edit">
        <Route
          index
          element={
            <RequireGroup allowedGroups={[constants.group.MANAGER]}>
              <AppLayout title="연봉조정 등록" breadCrumbs={['조정', '등록']} />
            </RequireGroup>
          }
        />
        <Route path=":id" element={<AdjustProvider />}>
          <Route
            path="test-edit"
            element={
              <RequireGroup allowedGroups={[constants.group.MANAGER]}>
                <TestEditPage />
              </RequireGroup>
            }
          />
          <Route path="annual">
            <Route path="criteria">
              <Route
                path="subject"
                element={
                  <RequireGroup allowedGroups={[constants.group.MANAGER]}>
                    <SubjectCriteriaPage />
                  </RequireGroup>
                }
              />
              <Route
                path="payment-rate"
                element={
                  <RequireGroup allowedGroups={[constants.group.MANAGER]}>
                    <PaymentRateCriteriaPage />
                  </RequireGroup>
                }
              />
              <Route
                path="payband"
                element={
                  <RequireGroup allowedGroups={[constants.group.MANAGER]}>
                    <PaybandCriteriaPage />
                  </RequireGroup>
                }
              />
            </Route>
            <Route path="preparation">
              <Route
                path="subject"
                element={
                  <RequireGroup allowedGroups={[constants.group.MANAGER]}>
                    <SubjectAssignPage />
                  </RequireGroup>
                }
              />
              <Route
                path="high-performance"
                element={
                  <RequireGroup allowedGroups={[constants.group.MANAGER]}>
                    <HpoApplyPage />
                  </RequireGroup>
                }
              />
            </Route>
            <Route path="main">
              <Route
                path="payband"
                element={
                  <RequireGroup allowedGroups={[constants.group.MANAGER]}>
                    <PaybandApplyPage />
                  </RequireGroup>
                }
              />
              <Route
                path="result"
                element={
                  <RequireGroup allowedGroups={[constants.group.MANAGER]}>
                    <ResultPage />
                  </RequireGroup>
                }
              />
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
