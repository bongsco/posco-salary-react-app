// router.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import AppLayout from '#layouts/AppLayout';
import RootLayout from '#layouts/RootLayout';
import { AdjustProvider } from '#contexts/AdjustContext';
import TestEditPage from '#pages/TestEditPage';
import TestPage from '#pages/TestPage';
import MainPage from '#pages/Main';
import PaybandConfigPage from '#pages/PaybandConfig';
import PaybandApplyPage from '#pages/PaybandApply';
import AdjSubjectCriteriaPage from '#pages/AdjSubjectCriteria';
import OrganizationSubject from '#pages/OrganizationSubject';
import CompensationPage from '#pages/Compensation';
import HighOrganizationPage from '#pages/HighOrganization';
import ResultPage from '#pages/ResultPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route
        index
        element={<AppLayout title="메인" breadCrumbs={['메인']} />}
      />
      <Route path="test" element={<TestPage />} />
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
            <AppLayout title="연봉조정 등록" breadCrumbs={['조정', '등록']} />
          }
        />
        <Route path=":id" element={<AdjustProvider />}>
          <Route path="test-edit" element={<TestEditPage />} />
          <Route path="annual">
            <Route path="criteria">
              <Route path="target" element={<AdjSubjectCriteriaPage />} />
              <Route path="payment-rate" element={<CompensationPage />} />
              <Route path="payband" element={<PaybandConfigPage />} />
            </Route>
            <Route path="preparation">
              <Route path="target" element={<OrganizationSubject />} />
              <Route
                path="high-performance"
                element={<HighOrganizationPage />}
              />
            </Route>
            <Route path="main">
              <Route path="payband" element={<PaybandApplyPage />} />
              <Route path="result" element={<ResultPage />} />
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
