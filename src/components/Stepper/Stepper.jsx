import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Step from './Step';
import styles from './stepper.module.css';

/**
 * @typedef {Object} step
 * @property {number} id
 * @property {string} text
 * @property {'DONE' | 'UNDONE'} state
 * @property {string} [date]
 * @property {string} url
 */

/**
 * @param {{
 *   stepperData: {
 *     CRITERIA: step[];
 *     PREPARATION: step[];
 *     MAIN: step[];
 *   };
 * }} props
 * @returns {{React.JSX.Element}}
 */
export default function Stepper({ stepperData }) {
  const location = useLocation();

  const mapper = ({ id, text, state, date, url }) => ({
    id,
    text,
    state: location.pathname.includes(url) ? 'WORKING' : state,
    date,
    url,
  });

  return (
    <div className={styles.stepper}>
      {stepperData?.CRITERIA && (
        <>
          <Step
            title="기준 설정"
            isComplete={
              stepperData.CRITERIA.filter(
                (detailStep) => detailStep.state === 'DONE',
              ).length === stepperData.CRITERIA.length
            }
            detailSteps={stepperData.CRITERIA.map(mapper)}
          />
          <div className={styles.between}>
            <hr className={styles.hr} />
          </div>
        </>
      )}
      {stepperData?.PREPARATION && (
        <>
          <Step
            title="사전 작업"
            isComplete={
              stepperData.PREPARATION.filter(
                (detailStep) => detailStep.state === 'DONE',
              ).length === stepperData.PREPARATION.length
            }
            detailSteps={stepperData.PREPARATION.map(mapper)}
          />
          <div className={styles.between}>
            <hr className={styles.hr} />
          </div>
        </>
      )}
      {stepperData?.MAIN && (
        <Step
          title="본 연봉조정"
          isComplete={
            stepperData.MAIN.filter((detailStep) => detailStep.state === 'DONE')
              .length === stepperData.MAIN.length
          }
          detailSteps={stepperData.MAIN.map(mapper)}
        />
      )}
    </div>
  );
}

Stepper.propTypes = {
  stepperData: PropTypes.shape({
    CRITERIA: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        date: PropTypes.date,
      }),
    ),
    PREPARATION: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        date: PropTypes.date,
      }),
    ),
    MAIN: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        date: PropTypes.date,
      }),
    ),
  }).isRequired,
};
