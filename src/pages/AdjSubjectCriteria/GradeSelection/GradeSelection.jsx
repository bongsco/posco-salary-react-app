import PropTypes from 'prop-types';
import LabeledSwitch from '#components/LabeledSwitch';
import styles from '../adj-subject-criteria.module.css';

export default function GradeSelection({
  grades,
  onSwitchChange,
  selectAll,
  isCommitted,
}) {
  return (
    <div className={styles.selectSwitch}>
      <div className={styles.subTitle}>직급</div>
      <div className={styles.gradeWrapper}>
        {/* ✅ 전체 선택 버튼 */}
        <LabeledSwitch
          key="전체"
          label="전체"
          isChecked={Object.values(grades)
            .flat()
            .every((v) => v)}
          isCommitted={isCommitted}
          onClick={selectAll}
        />

        <div className={styles.frame2}>
          {/* ✅ 기존 div 구조 유지하면서 동적으로 LabeledSwitch 생성 */}
          <div className={styles.frame2}>
            <div className={styles.frame3}>
              {Object.keys(grades.allLeft).map((label) => (
                <LabeledSwitch
                  key={label}
                  label={label}
                  isChecked={grades.allLeft[label]}
                  isCommitted={isCommitted}
                  onClick={(tmp, isChecked) =>
                    onSwitchChange('allLeft', tmp, isChecked)
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
                    isCommitted={isCommitted}
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
                    isCommitted={isCommitted}
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
                    isCommitted={isCommitted}
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
                  isCommitted={isCommitted}
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
                    isCommitted={isCommitted}
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
                    isCommitted={isCommitted}
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
                    isCommitted={isCommitted}
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
      {/* <div className={styles.gradeWrapper}>
        <LabeledSwitch
          key="전체"
          label="전체"
          isChecked={Object.values(grades)
            .flat()
            .every((v) => v)}
          isCommitted={isCommitted}
          onClick={selectAll}
        />

        {Object.entries(grades).map(([category, items]) => (
          <div key={category} className={styles.gradeGroup}>
            {Object.entries(items).map(([label, value]) => (
              <LabeledSwitch
                key={label}
                label={label}
                isChecked={value}
                isCommitted={isCommitted}
                onClick={(tmp, isChecked) =>
                  onSwitchChange(category, tmp, isChecked)
                }
              />
            ))}
          </div>
        ))}
      </div> */}
    </div>
  );
}
// ✅ PropTypes 정의
GradeSelection.propTypes = {
  grades: PropTypes.objectOf(PropTypes.objectOf(PropTypes.bool)),
  onSwitchChange: PropTypes.func.isRequired,
  selectAll: PropTypes.func.isRequired,
  isCommitted: PropTypes.bool,
};

// ✅ 기본값 설정 (defaultProps)
GradeSelection.defaultProps = {
  grades: {
    allLeft: { P직군전체: false, R직군전체: false, A직군전체: false },
    allRight: { O직군전체: false, D직군전체: false, G직군전체: false },
    P: { P6: false, P5: false, P4: false, P3: false, P2: false, P1: false },
    R: { R3: false, R2: false, R1: false },
    A: { A3: false, A2: false, A1: false },
    O: { O3: false, O2: false, O1: false },
    D: { D3: false, D2: false, D1: false },
    G: { G3: false, G2: false, G1: false },
  },
  isCommitted: false,
};
