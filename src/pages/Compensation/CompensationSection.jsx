import PropTypes from 'prop-types';
import Input from '#components/Input';
import CompensationTable from './CompensationTable';
import styles from './compensation-page.module.css';

export default function CompensationSection({
  title,
  description,
  value,
  onInputChange,
  inputError,
  tableData,
  originalTableData,
  onTableChange,
  valueKey,
  onAddGradeRow,
}) {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <p className={styles.description}>{description}</p>

      <div className={styles.inputContainer}>
        <span className={styles.inputLabel}>고성과조직 가산률</span>
        <Input
          value={value}
          onChange={onInputChange}
          mode={inputError ? 'error' : 'default'}
          customWidth={50}
          customHeight={30}
        />
        <span className={styles.inputLabel}>%</span>
      </div>

      {inputError && (
        <div className={styles.errorMessage}>
          고성과조직 가산률을 입력해 주세요.
        </div>
      )}

      <CompensationTable
        currentData={tableData}
        originalData={originalTableData}
        onChange={onTableChange}
        valueKey={valueKey}
        onAddGradeRow={onAddGradeRow}
      />
    </div>
  );
}

CompensationSection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  inputError: PropTypes.bool.isRequired,
  tableData: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.shape({
        value1: PropTypes.number.isRequired,
        value2: PropTypes.number.isRequired,
      }),
    ),
  ).isRequired,
  originalTableData: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.shape({
        value1: PropTypes.number.isRequired,
        value2: PropTypes.number.isRequired,
      }),
    ),
  ).isRequired,
  onTableChange: PropTypes.func.isRequired,
  valueKey: PropTypes.oneOf(['value1', 'value2']).isRequired,
  onAddGradeRow: PropTypes.func.isRequired,
};
