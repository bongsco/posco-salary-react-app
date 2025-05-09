import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import useFetchWithAuth from '#hooks/useFetchWithAuth';
import AppLayout from '#layouts/AppLayout';

export default function TestPage() {
  const fetchWithAuth = useFetchWithAuth();
  const { addError } = useErrorHandlerContext();
  useSWR('/notfound', async (url) => {
    const res = await fetchWithAuth(url);
    // 상태 코드가 200-299 범위가 아니더라도,
    // 파싱 시도를 하고 에러를 던집니다.
    if (!res?.ok) {
      addError(
        `Sent Request to /notfound (${process.env.REACT_APP_API_URL}) and the connection refused.`,
        'error message',
        'CONNECTION_REFUSED',
      );
    }

    return res.json();
  });

  return (
    <AppLayout title="테스트 페이지 Test Page" breadCrumbs={['테스트']}>
      <p>
        This page is for the test.
        <br />
        테스트 페이지입니다.
      </p>
      <ul>
        <li>
          <Link to="/adjust/edit/1/annual/criteria/subject">
            연봉조정등록/기준설정/대상자기준설정
          </Link>
        </li>
        <li>
          <Link to="/adjust/edit/1/annual/criteria/payment-rate">
            연봉조정등록/기준설정/보상지급률설정
          </Link>
        </li>
        <li>
          <Link to="/adjust/edit/1/annual/criteria/payband">
            연봉조정등록/기준설정/payband설정
          </Link>
        </li>
        <li>
          <Link to="/adjust/edit/1/annual/preparation/subject">
            연봉조정등록/사전작업/대상자편성
          </Link>
        </li>
        <li>
          <Link to="/adjust/edit/1/annual/preparation/high-performance">
            연봉조정등록/본연봉조정/고성과조직가산대상여부
          </Link>
        </li>
        <li>
          <Link to="/adjust/edit/1/annual/main/result">
            연봉조정등록/본연봉조정/조정결과미리보기
          </Link>
        </li>
        <li>
          <Link to="/adjust/edit/1/annual/main/payband">
            연봉조정등록/본연봉조정/Payband적용
          </Link>
        </li>
      </ul>
      <hr />
    </AppLayout>
  );
}
