// router.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import AppLayout from '#layouts/AppLayout';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import RootLayout from '#layouts/RootLayout';
import { AdjustProvider } from '#contexts/AdjustContext';
import TestEditPage from '#pages/TestEditPage';
import TestPage from '#pages/TestPage';
import MainPage from '#pages/Main';
import PaybandConfigPage from '#pages/PaybandConfig';
import AdjSubjectCriteriaPage from '#pages/AdjSubjectCriteria';
import OrganizationSubject from '#pages/OrganizationSubject';
import HighOrganizationPage from '#pages/HighOrganization';

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
              <Route
                path="payment-rate"
                element={
                  <AdjustEditLayout
                    prevStepPath="target"
                    nextStepPath="payband"
                    stepPaths={['기준 설정', '보상지급률 설정']}
                  />
                }
              />
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
              <Route
                path="payband"
                element={
                  <AdjustEditLayout
                    prevStepPath="../preparation/high-performance"
                    nextStepPath="result"
                    stepPaths={['본 연봉조정', 'Payband 적용']}
                  />
                }
              />
              <Route
                path="result"
                element={
                  <AdjustEditLayout
                    prevStepPath="payband"
                    stepPaths={['본 연봉조정', '조정 결과 미리보기']}
                  />
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
