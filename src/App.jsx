// router.jsx
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { AdjustProvider } from '#contexts/AdjustContext';
import AppLayout from '#layouts/AppLayout';
import RootLayout from '#layouts/RootLayout';
import LoginPage from '#pages/LoginPage';
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route
        index
        element={<AppLayout title="메인" breadCrumbs={['메인']} />}
      />
      <Route path="test" element={<TestPage />} />
      <Route path="login" element={<LoginPage />} />
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
      <Route path="adjust/list" element={<MainPage />} />

      <Route path="adjust/edit">
        <Route
          index
          element={
            <RequireGroup allowedGroups={['bongsco_manager']}>
              <AppLayout title="연봉조정 등록" breadCrumbs={['조정', '등록']} />
            </RequireGroup>
          }
        />
        <Route path=":id" element={<AdjustProvider />}>
          <Route
            path="test-edit"
            element={
              <RequireGroup allowedGroups={['bongsco_manager']}>
                <TestEditPage />
              </RequireGroup>
            }
          />
          <Route path="annual">
            <Route path="criteria">
              <Route
                path="subject"
                element={
                  <RequireGroup allowedGroups={['bongsco_manager']}>
                    <SubjectCriteriaPage />
                  </RequireGroup>
                }
              />
              <Route
                path="payment-rate"
                element={
                  <RequireGroup allowedGroups={['bongsco_manager']}>
                    <PaymentRateCriteriaPage />
                  </RequireGroup>
                }
              />
              <Route
                path="payband"
                element={
                  <RequireGroup allowedGroups={['bongsco_manager']}>
                    <PaybandCriteriaPage />
                  </RequireGroup>
                }
              />
            </Route>
            <Route path="preparation">
              <Route
                path="subject"
                element={
                  <RequireGroup allowedGroups={['bongsco_manager']}>
                    <SubjectAssignPage />
                  </RequireGroup>
                }
              />
              <Route
                path="high-performance"
                element={
                  <RequireGroup allowedGroups={['bongsco_manager']}>
                    <HpoApplyPage />
                  </RequireGroup>
                }
              />
            </Route>
            <Route path="main">
              <Route
                path="payband"
                element={
                  <RequireGroup allowedGroups={['bongsco_manager']}>
                    <PaybandApplyPage />
                  </RequireGroup>
                }
              />
              <Route
                path="result"
                element={
                  <RequireGroup allowedGroups={['bongsco_manager']}>
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
