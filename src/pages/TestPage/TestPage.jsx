import { Link } from 'react-router-dom';
import Stepper from '#components/Stepper';
import AppLayout from '#layouts/AppLayout';

export default function TestPage() {
  return (
    <AppLayout title="테스트 페이지 Test Page" breadCrumbs={['테스트']}>
      <p>
        This page is for the test.
        <br />
        테스트 페이지입니다.
      </p>
      <ul>
        <li>
          <Link to="/adjust/edit/0/annual/criteria/target">
            연봉조정등록/기준설정/대상자기준설정
          </Link>
        </li>
        <li>
          <Link to="/adjust/edit/0/annual/preparation/high-performance">
            연봉조정등록/사전작업/고성과조직가산대상여부설정
          </Link>
        </li>
        <li>
          <Link to="/adjust/edit/0/annual/main/result">
            연봉조정등록/본연봉조정/조정결과미리보기
          </Link>
        </li>
      </ul>
      <hr />
      <Stepper adjId={1} />
      <hr />
      <Stepper adjId={2} />
      <hr />
      <Stepper adjId={3} />
    </AppLayout>
  );
}
