import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import Button from '#components/Button';
import SnackBar from '#components/SnackBar';
import Stepper from '#components/Stepper';
import { useAdjustContext } from '#contexts/AdjustContext';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import useBlocker from '#hooks/UseBlocker';
import useFetchWithAuth from '#hooks/useFetchWithAuth';
import AppLayout from '#layouts/AppLayout';
import styles from './adjust-edit-layout.module.css';

export default function AdjustEditLayout({
  children,
  prevStepPath = null,
  nextStepPath = null,
  stepPaths = [],
  onCommit = async () => {},
  onRollback = () => {},
  isCommitted,
  canMove = true,
  stepId,
  isLastStep = false,
}) {
  const { adjust } = useAdjustContext();
  const { addError } = useErrorHandlerContext();
  const navigate = useNavigate();
  const fetchWithAuth = useFetchWithAuth();

  const { data: stepperData, mutate } = useSWR(
    `/stepper/${adjust.adjustId}`,
    async (url) => {
      const fallBackData = {
        CRITERIA: [],
        PREPARATION: [],
        MAIN: [],
      };

      try {
        const res = await fetchWithAuth(url);
        const json = await res.json();

        if (!res?.ok) {
          addError(
            `연봉조정 단계 정보 조회 실패 (${res.status} ${res.statusText})`,
            `네트워크 상태 및 접근 경로의 연봉조정 ID(${adjust.adjustId}) 등이 유효한지 확인해 주시기 바랍니다.\n${json.message ?? json.error}`,
            'ADJUST_STEP_FETCH_ERROR',
          );

          return fallBackData;
        }

        return json.steps;
      } catch (e) {
        addError(
          `연봉조정 단계 정보 조회 실패`,
          `네트워크 상태 및 접근 경로의 연봉조정 ID(${adjust.adjustId}) 등이 유효한지 확인해 주시기 바랍니다.\n${e.message}}`,
          'ADJUST_STEP_FETCH_ERROR',
        );
      }

      return fallBackData;
    },
    {
      keepPreviousData: true,
    },
  );

  const { renderPrompt } = useBlocker(
    ({ currentLocation, nextLocation }) => {
      return (
        !(canMove && isCommitted) &&
        currentLocation?.pathname !== nextLocation?.pathname
      );
    },
    { message: '데이터가 저장되지 않았습니다. 그래도 이동하시겠습니까?' },
  );

  const setStepDone = async () => {
    try {
      const res = await fetchWithAuth(
        `/stepper/${adjust.adjustId}/step/${stepId}`,
        {
          method: 'PATCH',
        },
      );

      if (!res.ok) {
        const json = await res.json();

        addError(
          `연봉조정 단계 정보 저장 실패 (${res.status} ${res.statusText})`,
          `네트워크 상태 및 접근 경로의 연봉조정 ID(${adjust.adjustId}) 등이 유효한지 확인해 주시기 바랍니다.\n${json.message}`,
          'ADJUST_STEP_SAVE_ERROR',
        );
        return;
      }

      await mutate(`/stepper/${adjust.adjustId}`);
    } catch (e) {
      addError(
        `연봉조정 단계 정보 저장 실패`,
        `네트워크 상태 및 접근 경로의 연봉조정 ID(${adjust.adjustId}) 등이 유효한지 확인해 주시기 바랍니다. (${e.message})`,
        'ADJUST_STEP_SAVE_ERROR',
      );
    }
  };

  const [isSnackBarShowing, setIsSnackBarShowing] = useState(false);
  const [message, setMessage] = useState('');
  const timerRef = useRef(null);

  const handleSnackBar = (msg) => {
    setMessage(msg);
    setIsSnackBarShowing(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsSnackBarShowing(false);
      timerRef.current = null;
    }, 2000);
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <AppLayout
      title={
        stepPaths.length > 0 ? stepPaths[stepPaths.length - 1] : adjust.title
      }
      breadCrumbs={['조정', '등록', adjust.title, ...stepPaths]}
    >
      <div className={styles.stepperContainer}>
        <Stepper stepperData={stepperData} />
      </div>
      {children}
      <hr />
      <div className={styles.navigator}>
        {!isCommitted && (
          <>
            <Button
              variant="secondary"
              size="small"
              label="저장"
              onClick={async () => {
                try {
                  await onCommit(); // 실패 시 아래 로직 실행 안 됨
                  await setStepDone();
                  await mutate(`/stepper/${adjust.adjustId}`);
                  handleSnackBar('저장되었습니다.');
                } catch (error) {
                  handleSnackBar('저장에 실패했습니다.');
                  if (error.message !== '저장불가') {
                    addError(
                      `저장 실패`,
                      `${error.message}`,
                      'ADJUST_SAVE_ERROR',
                    );
                  }
                }
              }}
            />
            <Button
              variant="secondary"
              size="small"
              label="취소"
              onClick={onRollback}
            />
          </>
        )}
        {prevStepPath && (
          <Link to={`../${prevStepPath}`}>
            <Button variant="primary" size="small" label="이전단계" />
          </Link>
        )}
        {nextStepPath && (
          <Button
            variant="primary"
            size="small"
            label="다음단계"
            onClick={async () => {
              await setStepDone();
              navigate(`../${nextStepPath}`);
            }}
          />
        )}
        {isLastStep && (
          <Button
            variant="primary"
            size="small"
            label="시스템 반영"
            onClick={async () => {
              const res = await fetchWithAuth(
                `/adjust/${adjust.adjustId}/main/interface`,
                {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                },
              );
              if (!res.ok) {
                throw new Error('PATCH 요청 실패');
              }
              handleSnackBar('통합 인사 시스템에 반영이 완료되었습니다.');
              await mutate(`/stepper/${adjust.adjustId}`);
            }}
          />
        )}
      </div>
      {renderPrompt()}
      {isSnackBarShowing && <SnackBar message={message} />}
    </AppLayout>
  );
}

AdjustEditLayout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  prevStepPath: PropTypes.string,
  nextStepPath: PropTypes.string,
  stepPaths: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCommit: PropTypes.func,
  onRollback: PropTypes.func,
  isCommitted: PropTypes.bool,
  canMove: PropTypes.bool,
  stepId: PropTypes.string.isRequired,
  isLastStep: PropTypes.bool,
};

AdjustEditLayout.defaultProps = {
  prevStepPath: null,
  nextStepPath: null,
  onCommit: async () => {},
  onRollback: () => {},
  isCommitted: true,
  canMove: true,
  isLastStep: false,
};
