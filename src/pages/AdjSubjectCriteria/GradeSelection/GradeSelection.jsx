import PropTypes from 'prop-types';
import LabeledSwitch from '#components/LabeledSwitch';
import styles from '../adj-subject-criteria.module.css';

export default function GradeSelection({
  grades,
  onSwitchChange,
  committedStates,
  hasError,
}) {
  const renderGroupSwitch = (groupKey) => {
    const group = grades[groupKey];
    const isGroupChecked = group.all;
    const isGroupCommitted = committedStates[groupKey].all;

    return (
      <LabeledSwitch
        key={`${groupKey}-all`}
        label={`${groupKey}직군전체`}
        isChecked={isGroupChecked}
        isCommitted={isGroupCommitted}
        onClick={(_, isChecked) => onSwitchChange(groupKey, 'all', isChecked)}
        isCheckedInitially={isGroupChecked}
      />
    );
  };

  const renderGroupRow = (groupKey) => (
    <div className={styles.groupRow} key={groupKey}>
      {renderGroupSwitch(groupKey)}
      {Object.keys(grades[groupKey])
        .filter((key) => key !== 'all')
        .map((label) => (
          <LabeledSwitch
            key={label}
            label={label}
            isChecked={grades[groupKey][label]}
            isCommitted={committedStates[groupKey][label]}
            onClick={(_, isChecked) =>
              onSwitchChange(groupKey, label, isChecked)
            }
            isCheckedInitially={grades[groupKey][label]}
          />
        ))}
    </div>
  );

  return (
    <div className={styles.selectSwitch}>
      <div className={styles.subTitle}>직급</div>
      {hasError && (
        <div className={styles.errorMessage}>
          한 가지 이상의 직급을 선택해 주세요.
        </div>
      )}
      <div className={styles.gradeWrapper}>
        <LabeledSwitch
          label="전체"
          isChecked={grades.all}
          isCommitted={committedStates.all}
          onClick={(_, isChecked) => onSwitchChange('all', '전체', isChecked)}
          isCheckedInitially={grades.all}
        />

        {['P', 'R', 'A', 'O', 'D', 'G'].map((groupKey) =>
          renderGroupRow(groupKey),
        )}
      </div>
    </div>
  );
}

GradeSelection.propTypes = {
  grades: PropTypes.shape({
    all: PropTypes.bool.isRequired,
    P: PropTypes.objectOf(PropTypes.bool).isRequired,
    R: PropTypes.objectOf(PropTypes.bool).isRequired,
    A: PropTypes.objectOf(PropTypes.bool).isRequired,
    O: PropTypes.objectOf(PropTypes.bool).isRequired,
    D: PropTypes.objectOf(PropTypes.bool).isRequired,
    G: PropTypes.objectOf(PropTypes.bool).isRequired,
  }).isRequired,
  onSwitchChange: PropTypes.func.isRequired,
  hasError: PropTypes.bool,
  committedStates: PropTypes.shape({
    all: PropTypes.bool.isRequired,
    P: PropTypes.objectOf(PropTypes.bool).isRequired,
    R: PropTypes.objectOf(PropTypes.bool).isRequired,
    A: PropTypes.objectOf(PropTypes.bool).isRequired,
    O: PropTypes.objectOf(PropTypes.bool).isRequired,
    D: PropTypes.objectOf(PropTypes.bool).isRequired,
    G: PropTypes.objectOf(PropTypes.bool).isRequired,
  }).isRequired,
};

GradeSelection.defaultProps = {
  hasError: false,
};
