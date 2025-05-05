import { useCallback, useEffect } from 'react';
import { useBlocker as useBlockerCore, useLocation } from 'react-router-dom';
import Button from '#components/Button';
import styles from './use-blocker.module.css';

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
      <div className={`${styles.container}`}>
        <p className={`${styles.message}`}>
          {alertOptions?.message || '페이지를 나가시겠습니까? '}
        </p>
        <div className={`${styles.button_group}`}>
          <Button
            onClick={proceed}
            label="예"
            size="xsmall"
            variant="secondary"
          />
          <Button
            onClick={reset}
            label="아니오"
            size="xsmall"
            variant="secondary"
          />
        </div>
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
