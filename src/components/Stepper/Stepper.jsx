import PropTypes from 'prop-types';
import React from 'react'; // 🔹 React.Fragment 사용을 위해 추가
import Step from './Step';
import styles from './stepper.module.css';

export default function Stepper({ steps }) {
  return (
    <div className={styles.stepper}>
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          {' '}
          <div className={styles.stepContainer}>
            <Step
              title={step.title}
              isComplete={step.isComplete}
              items={step.items}
            />
          </div>
          {index < steps.length - 1 && (
            <div className={styles.between}>
              <hr className={styles.hr} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

Stepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          state: PropTypes.oneOf(['complete', 'working', 'undone']).isRequired,
          date: PropTypes.string,
        }),
      ).isRequired,
    }),
  ).isRequired,
};
