import { useEffect, useCallback } from 'react';
import { useBlocker as useBlockerCore, useLocation } from 'react-router-dom';

const useBlocker = (when, alertOptions) => {
  const {
    state,
    location: nextLocation,
    reset,
    proceed,
  } = useBlockerCore(when);
  const currentLocation = useLocation();

  const renderPrompt = useCallback(() => {
    if (state !== 'blocked') return null;

    return (
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          background: '#fff',
          padding: '1rem',
          border: '1px solid #ccc',
          zIndex: 9999,
        }}
      >
        <p>{alertOptions?.message || '페이지를 나가시겠습니까? '}</p>
        <button type="button" onClick={proceed} style={{ marginLeft: '8px' }}>
          예
        </button>
        <button type="button" onClick={reset}>
          아니오
        </button>
      </div>
    );
  }, [state, alertOptions?.message, proceed, reset]);

  useEffect(() => {
    const shouldBlock =
      (typeof when === 'boolean' && when) ||
      (typeof when === 'function' &&
        when({
          currentLocation,
          nextLocation,
          historyAction: 'PUSH',
        }));

    if (shouldBlock && typeof window !== 'undefined') {
      // eslint-disable-next-line no-undef
      window.onbeforeunload = (e) => {
        e.preventDefault();
        e.returnValue = '';
        return '';
      };
    } else if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-undef
      window.onbeforeunload = null;
    }

    return () => {
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line no-undef
        window.onbeforeunload = null;
      }
    };
  }, [when, state, currentLocation, nextLocation]);

  return { state, reset, proceed, renderPrompt };
};

export default useBlocker;
