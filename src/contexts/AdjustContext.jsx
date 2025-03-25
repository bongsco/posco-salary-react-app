import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

function getMockAdjust(id) {
  return {
    id,
    title: `2025 1차 정기연봉조정 (더미데이터, ID ${id})`,
  };
}

const AdjustContext = createContext();

export function AdjustProvider() {
  const [adjust, setAdjust] = useState({});
  const { id } = useParams();

  useEffect(() => {
    setAdjust(getMockAdjust(id));
  }, [id]);

  return (
    <AdjustContext.Provider value={useMemo(() => ({ adjust }), [adjust])}>
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
