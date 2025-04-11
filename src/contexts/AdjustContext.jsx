import { createContext, useContext, useMemo } from 'react';
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
          `네트워크 상태 및 접근 경로의 연봉조정 ID(${id}) 등이 유효한지 확인해 주시기 바랍니다.`,
          'ADJUST_ID_FETCH_ERROR',
        );

        return {
          adjustId: id,
          title: null,
        };
      }

      return {
        adjustId: id,
        ...(await res.json()),
      };
    },
    {
      fallbackData: {
        adjustId: id,
        title: '로드 중...',
      },
    },
  );

  return (
    <AdjustContext.Provider value={useMemo(() => ({ adjust }), [adjust])}>
      <Outlet />
    </AdjustContext.Provider>
  );
}

/**
 * @returns {{
 *   adjust: {
 *     adjustId: number;
 *     title: string | null;
 *   }
 * }}
 */
export function useAdjustContext() {
  const context = useContext(AdjustContext);

  if (!context) {
    throw new Error(
      'useAdjustContext must be used in the scope of AdjustProvider',
    );
  }

  return context;
}
