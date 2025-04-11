import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import Button from '#components/Button';
import Stepper from '#components/Stepper';
import { useAdjustContext } from '#contexts/AdjustContext';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import useBlocker from '#hooks/UseBlocker';
import AppLayout from '#layouts/AppLayout';
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
}) {
  const { adjust } = useAdjustContext();
  const { addError } = useErrorHandlerContext();
  const { data: stepperData, mutate } = useSWR(
    `/api/stepper/${adjust.adjustId}`,
    async (url) => {
      const res = await fetch(url);

      if (!res?.ok) {
        addError(
          `연봉조정 단계 정보 조회 실패 (${res.status} ${res.statusText})`,
          `네트워크 상태 및 접근 경로의 연봉조정 ID(${adjust.adjustId}) 등이 유효한지 확인해 주시기 바랍니다.`,
          'ADJUST_STEP_FETCH_ERROR',
        );

        return {
          CRITERIA: [],
          PREPARATION: [],
          MAIN: [],
        };
      }

      const json = await res.json();
      return json.steps;
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
              onClick={() => {
                onCommit();
                mutate();
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
          <Link to={`../${nextStepPath}`}>
            <Button variant="primary" size="small" label="다음단계" />
          </Link>
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
};

AdjustEditLayout.defaultProps = {
  prevStepPath: null,
  nextStepPath: null,
  onCommit: () => {},
  onRollback: () => {},
  isCommitted: true,
  canMove: true,
};
