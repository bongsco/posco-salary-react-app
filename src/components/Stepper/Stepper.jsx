import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Step from './Step';
import styles from './stepper.module.css';
import mockStepperApiResponse from './mockStepperApiResponse';

const constants = {
  CRITERIA: '기준 설정',
  PRE: '사전 작업',
  MAIN: '본 연봉조정',
};

export default function Stepper({ adjId }) {
  const [steps, setSteps] = useState({});

  useEffect(() => {
    setSteps(mockStepperApiResponse[adjId]);
  }, [adjId]);

  return (
    <div className={styles.stepper}>
      {steps?.CRITERIA && (
        <>
          <Step
            title={constants.CRITERIA}
            isComplete={
              steps.CRITERIA.filter((detailStep) => detailStep.state === 'DONE')
                .length === steps.CRITERIA.length
            }
            detailSteps={steps.CRITERIA}
          />
          <div className={styles.between}>
            <hr className={styles.hr} />
          </div>
        </>
      )}
      {steps?.PRE && (
        <>
          <Step
            title={constants.PRE}
            isComplete={
              steps.PRE.filter((detailStep) => detailStep.state === 'DONE')
                .length === steps.PRE.length
            }
            detailSteps={steps.PRE}
          />
          <div className={styles.between}>
            <hr className={styles.hr} />
          </div>
        </>
      )}
      {steps?.MAIN && (
        <Step
          title={constants.MAIN}
          isComplete={
            steps.CRITERIA.filter((detailStep) => detailStep.state === 'DONE')
              .length === steps.MAIN.length
          }
          detailSteps={steps.MAIN}
        />
      )}
    </div>
  );
}

Stepper.propTypes = {
  adjId: PropTypes.number.isRequired,
};
