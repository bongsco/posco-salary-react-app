import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import Button from '#components/Button';
import Stepper from '#components/Stepper';
import { useAdjustContext } from '#contexts/AdjustContext';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import useBlocker from '#hooks/UseBlocker';
import AppLayout from '#layouts/AppLayout';
import fetchApi from '#utils/fetch';
import styles from './adjust-edit-layout.module.css';

export default function AdjustEditLayout({
  children,
  prevStepPath = null,
  nextStepPath = null,
  stepPaths = [],
  onCommit = () => {},
  onRollback = () => {},
  isCommitted,
  canMove = true,
  stepId,
}) {
  const { adjust } = useAdjustContext();
  const { addError } = useErrorHandlerContext();
  const navigate = useNavigate();
  const { data: stepperData, mutate } = useSWR(
    `/stepper/${adjust.adjustId}`,
    async (url) => {
      const fallBackData = {
        CRITERIA: [],
        PREPARATION: [],
        MAIN: [],
      };

      try {
        const res = await fetchApi(url);
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

  const onNextStepClick = async () => {
    try {
      const res = await fetchApi(`/stepper/${adjust.adjustId}/step/${stepId}`, {
        method: 'PATCH',
      });

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
      navigate(`../${nextStepPath}`);
    } catch (e) {
      addError(
        `연봉조정 단계 정보 저장 실패`,
        `네트워크 상태 및 접근 경로의 연봉조정 ID(${adjust.adjustId}) 등이 유효한지 확인해 주시기 바랍니다. (${e.message})`,
        'ADJUST_STEP_SAVE_ERROR',
      );
    }
  };

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
              onClick={onCommit}
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
            onClick={onNextStepClick}
          />
        )}
      </div>
      {renderPrompt()}
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
};

AdjustEditLayout.defaultProps = {
  prevStepPath: null,
  nextStepPath: null,
  onCommit: () => {},
  onRollback: () => {},
  isCommitted: true,
  canMove: true,
};
