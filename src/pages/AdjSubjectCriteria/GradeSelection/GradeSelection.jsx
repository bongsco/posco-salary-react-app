import PropTypes from 'prop-types';
import LabeledSwitch from '#components/LabeledSwitch';
import styles from '../adj-subject-criteria.module.css';

export default function GradeSelection({
  grades,
  onSwitchChange,
  committedStates,
  hasError,
}) {
  return (
    <div className={styles.selectSwitch}>
      <div className={styles.subTitle}>직급</div>
      {hasError && (
        <div className={styles.errorMessage}>
          한 가지 이상의 직급을 선택해 주세요.
        </div>
      )}
      <div className={styles.gradeWrapper}>
        {/* ✅ 전체 선택 버튼 */}
        <LabeledSwitch
          label="전체"
          isChecked={Object.values(grades)
            .filter((group) => typeof group === 'object')
            .flatMap((group) => Object.values(group))
            .every((v) => v === true)}
          isCommitted={committedStates.all['전체']}
          onClick={(tmp, isChecked) => onSwitchChange('all', '전체', isChecked)}
          isCheckedInitially={grades.all['전체']}
        />

        <div className={styles.frame2}>
          <div className={styles.frame2}>
            <div className={styles.frame3}>
              {Object.keys(grades.allLeft).map((label) => (
                <LabeledSwitch
                  key={label}
                  label={label}
                  isChecked={grades.allLeft[label]}
                  isCommitted={committedStates.allLeft[label]}
                  onClick={(tmp, isChecked) =>
                    onSwitchChange('allLeft', label, isChecked)
                  }
                  isCheckedInitially={grades.allLeft[label]}
                />
              ))}
            </div>

            <div className={styles.frame3}>
              <div className={styles.buttons}>
                {Object.keys(grades.P).map((label) => (
                  <LabeledSwitch
                    key={label}
                    label={label}
                    isChecked={grades.P[label]}
                    isCommitted={committedStates.P[label]}
                    onClick={(tmp, isChecked) =>
                      onSwitchChange('P', tmp, isChecked)
                    }
                    isCheckedInitially={grades.P[label]}
                  />
                ))}
              </div>
              <div className={styles.buttons2}>
                {Object.keys(grades.R).map((label) => (
                  <LabeledSwitch
                    key={label}
                    label={label}
                    isChecked={grades.R[label]}
                    isCommitted={committedStates.R[label]}
                    onClick={(tmp, isChecked) =>
                      onSwitchChange('R', tmp, isChecked)
                    }
                    isCheckedInitially={grades.R[label]}
                  />
                ))}
              </div>
              <div className={styles.buttons2}>
                {Object.keys(grades.A).map((label) => (
                  <LabeledSwitch
                    key={label}
                    label={label}
                    isChecked={grades.A[label]}
                    isCommitted={committedStates.A[label]}
                    onClick={(tmp, isChecked) =>
                      onSwitchChange('A', tmp, isChecked)
                    }
                    isCheckedInitially={grades.A[label]}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className={styles.frame2}>
            <div className={styles.frame3}>
              {Object.keys(grades.allRight).map((label) => (
                <LabeledSwitch
                  key={label}
                  label={label}
                  isChecked={grades.allRight[label]}
                  isCommitted={committedStates.allRight[label]}
                  onClick={(tmp, isChecked) =>
                    onSwitchChange('allRight', tmp, isChecked)
                  }
                  isCheckedInitially={grades.allRight[label]}
                />
              ))}
            </div>

            <div className={styles.frame3}>
              <div className={styles.buttons2}>
                {Object.keys(grades.O).map((label) => (
                  <LabeledSwitch
                    key={label}
                    label={label}
                    isChecked={grades.O[label]}
                    isCommitted={committedStates.O[label]}
                    onClick={(tmp, isChecked) =>
                      onSwitchChange('O', tmp, isChecked)
                    }
                    isCheckedInitially={grades.O[label]}
                  />
                ))}
              </div>
              <div className={styles.buttons2}>
                {Object.keys(grades.D).map((label) => (
                  <LabeledSwitch
                    key={label}
                    label={label}
                    isChecked={grades.D[label]}
                    isCommitted={committedStates.D[label]}
                    onClick={(tmp, isChecked) =>
                      onSwitchChange('D', tmp, isChecked)
                    }
                    isCheckedInitially={grades.D[label]}
                  />
                ))}
              </div>
              <div className={styles.buttons2}>
                {Object.keys(grades.G).map((label) => (
                  <LabeledSwitch
                    key={label}
                    label={label}
                    isChecked={grades.G[label]}
                    isCommitted={committedStates.G[label]}
                    onClick={(tmp, isChecked) =>
                      onSwitchChange('G', tmp, isChecked)
                    }
                    isCheckedInitially={grades.G[label]}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// ✅ PropTypes 정의
GradeSelection.propTypes = {
  grades: PropTypes.objectOf(PropTypes.objectOf(PropTypes.bool)).isRequired,
  onSwitchChange: PropTypes.func.isRequired,
  hasError: PropTypes.bool,
  committedStates: PropTypes.shape({
    all: PropTypes.objectOf(PropTypes.bool),
    allLeft: PropTypes.objectOf(PropTypes.bool),
    allRight: PropTypes.objectOf(PropTypes.bool),
    P: PropTypes.objectOf(PropTypes.bool),
    R: PropTypes.objectOf(PropTypes.bool),
    A: PropTypes.objectOf(PropTypes.bool),
    O: PropTypes.objectOf(PropTypes.bool),
    D: PropTypes.objectOf(PropTypes.bool),
    G: PropTypes.objectOf(PropTypes.bool),
  }).isRequired,
};

// ✅ 기본값 설정 (defaultProps)
GradeSelection.defaultProps = {
  hasError: false,
};
