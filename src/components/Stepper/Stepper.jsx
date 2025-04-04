import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Step from './Step';
import styles from './stepper.module.css';
import mockStepperApiResponse from './mockStepperApiResponse';

export default function Stepper({ adjId, presentWorkingStepId }) {
  const [steps, setSteps] = useState({});

  useEffect(() => {
    setSteps(mockStepperApiResponse[adjId]);
  }, [adjId]);

  return (
    <div className={styles.stepper}>
      {steps?.['기준 설정'] && (
        <>
          <Step
            title="기준 설정"
            isComplete={
              steps['기준 설정'].filter(
                (detailStep) => detailStep.state === 'DONE',
              ).length === steps['기준 설정'].length
            }
            detailSteps={steps['기준 설정'].map(
              ({ id, text, state, date }) => ({
                id,
                text,
                state: presentWorkingStepId === id ? 'WORKING' : state,
                date,
              }),
            )}
          />
          <div className={styles.between}>
            <hr className={styles.hr} />
          </div>
        </>
      )}
      {steps?.['사전 작업'] && (
        <>
          <Step
            title="사전 작업"
            isComplete={
              steps['사전 작업'].filter(
                (detailStep) => detailStep.state === 'DONE',
              ).length === steps['사전 작업'].length
            }
            detailSteps={steps['사전 작업'].map(
              ({ id, text, state, date }) => ({
                id,
                text,
                state: presentWorkingStepId === id ? 'WORKING' : state,
                date,
              }),
            )}
          />
          <div className={styles.between}>
            <hr className={styles.hr} />
          </div>
        </>
      )}
      {steps?.['본 연봉조정'] && (
        <Step
          title="본 연봉조정"
          isComplete={
            steps['본 연봉조정'].filter(
              (detailStep) => detailStep.state === 'DONE',
            ).length === steps['본 연봉조정'].length
          }
          detailSteps={steps['본 연봉조정'].map(
            ({ id, text, state, date }) => ({
              id,
              text,
              state: presentWorkingStepId === id ? 'WORKING' : state,
              date,
            }),
          )}
        />
      )}
    </div>
  );
}

Stepper.propTypes = {
  adjId: PropTypes.number.isRequired,
  presentWorkingStepId: PropTypes.number.isRequired,
};
