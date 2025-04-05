import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Step from './Step';
import styles from './stepper.module.css';
import mockStepperApiResponse from './mockStepperApiResponse';

export default function Stepper({ adjId }) {
  const [steps, setSteps] = useState({});
  const location = useLocation();

  useEffect(() => {
    setSteps(mockStepperApiResponse[adjId]);
  }, [adjId]);

  return (
    <div className={styles.stepper}>
      {steps?.기준설정 && (
        <>
          <Step
            title="기준설정"
            isComplete={
              steps.기준설정.filter((detailStep) => detailStep.state === 'DONE')
                .length === steps.기준설정.length
            }
            detailSteps={steps.기준설정.map(
              ({ id, text, state, date, url }) => ({
                id,
                text,
                state: location.pathname.includes(url) ? 'WORKING' : state,
                date,
                url,
              }),
            )}
          />
          <div className={styles.between}>
            <hr className={styles.hr} />
          </div>
        </>
      )}
      {steps?.사전작업 && (
        <>
          <Step
            title="사전작업"
            isComplete={
              steps.사전작업.filter((detailStep) => detailStep.state === 'DONE')
                .length === steps.사전작업.length
            }
            detailSteps={steps.사전작업.map(
              ({ id, text, state, date, url }) => ({
                id,
                text,
                state: location.pathname.includes(url) ? 'WORKING' : state,
                date,
                url,
              }),
            )}
          />
          <div className={styles.between}>
            <hr className={styles.hr} />
          </div>
        </>
      )}
      {steps.본연봉조정 && (
        <Step
          title="본연봉조정"
          isComplete={
            steps.본연봉조정.filter((detailStep) => detailStep.state === 'DONE')
              .length === steps.본연봉조정.length
          }
          detailSteps={steps.본연봉조정.map(
            ({ id, text, state, date, url }) => ({
              id,
              text,
              state: location.pathname.includes(url) ? 'WORKING' : state,
              date,
              url,
            }),
          )}
        />
      )}
    </div>
  );
}

Stepper.propTypes = {
  adjId: PropTypes.number.isRequired,
};
