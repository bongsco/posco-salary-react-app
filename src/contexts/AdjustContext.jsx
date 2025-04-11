import { createContext, useCallback, useContext, useMemo } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';

const AdjustContext = createContext();

export function AdjustProvider() {
  const { addError } = useErrorHandlerContext();
  const { id } = useParams();
  const { data: adjust } = useSWR(
    `/api/adjust/${id}`,
    async (url) => {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        addError(
          `연봉조정 정보 조회 실패 (${res.status} ${res.statusText})`,
          `네트워크 상태 및 접근 경로를 확인해 주시기 바랍니다.`,
          'ADJUST_ID_FETCH_ERROR',
        );

        return null;
      }

      return res.json();
    },
    {
      fallbackData: {
        title: '로드 중...',
      },
    },
  );

  const getTitle = useCallback(() => {
    return adjust?.title;
  }, [adjust]);

  return (
    <AdjustContext.Provider
      value={useMemo(() => ({ adjust, getTitle }), [adjust, getTitle])}
    >
      <Outlet />
    </AdjustContext.Provider>
  );
}

export function useAdjustContext() {
  const context = useContext(AdjustContext);

  if (!context) {
    throw new Error(
      'useAdjustContext must be used in the scope of AdjustProvider',
    );
  }

  return context;
}
