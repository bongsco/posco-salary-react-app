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
import PaybandConfigPage from '#pages/adjust-edit/criteria/PaybandConfig';
import PaybandApplyPage from '#pages/adjust-edit/main/PaybandApply';
import AdjSubjectCriteriaPage from '#pages/adjust-edit/criteria/AdjSubjectCriteria';
import OrganizationSubject from '#pages/adjust-edit/preparation/OrganizationSubject';
import CompensationPage from '#pages/adjust-edit/criteria/Compensation';
import HighOrganizationPage from '#pages/adjust-edit/preparation/HighOrganization';
import ResultPage from '#pages/adjust-edit/main/ResultPage';

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
              <Route path="subject" element={<AdjSubjectCriteriaPage />} />
              <Route path="payment-rate" element={<CompensationPage />} />
              <Route path="payband" element={<PaybandConfigPage />} />
            </Route>
            <Route path="preparation">
              <Route path="subject" element={<OrganizationSubject />} />
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
