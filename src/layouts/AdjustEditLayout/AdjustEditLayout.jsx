import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useAdjustContext } from '#contexts/AdjustContext';
import Button from '#components/Button';
import AppLayout from '#layouts/AppLayout';
import Stepper from '#components/Stepper';
import useBlocker from '#hooks/UseBlocker';
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
  const { adjust, setPresentWorkingStepId } = useAdjustContext();

  useEffect(() => {
    setPresentWorkingStepId(stepId);
  }, [stepId, setPresentWorkingStepId]);

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
        <Stepper adjId={1} presentWorkingStepId={stepId} />
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
