// router.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import AppLayout from '#layouts/AppLayout';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import { AdjustProvider } from '#contexts/AdjustContext';
import TestEditPage from '#pages/TestEditPage';
import TestPage from '#pages/TestPage';
import RootLayout from '#layouts/RootLayout';
import AdjSubjectCriteriaPage from '#pages/AdjSubjectCriteria';

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
      <Route
        path="adjust/list"
        element={
          <AppLayout title="연봉조정 조회" breadCrumbs={['조정', '조회']} />
        }
      />
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
              <Route
                path="payband"
                element={
                  <AdjustEditLayout
                    prevStepPath="payment-rate"
                    nextStepPath="../preparation/target"
                    stepPaths={['기준 설정', 'Payband 설정']}
                  />
                }
              />
            </Route>
            <Route path="preparation">
              <Route
                path="target"
                element={
                  <AdjustEditLayout
                    prevStepPath="../criteria/payband"
                    nextStepPath="high-performance"
                    stepPaths={['사전 작업', '대상자 편성']}
                  />
                }
              />
              <Route
                path="high-performance"
                element={
                  <AdjustEditLayout
                    prevStepPath="target"
                    nextStepPath="../main/payband"
                    stepPaths={['사전 작업', '고성과조직 가산 대상 여부 설정']}
                  />
                }
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
