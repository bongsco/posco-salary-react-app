import PropTypes from 'prop-types';
import FilterComponent from './FilterComponent';
import SortComponent from './SortComponent';
import SalaryAdjustmentForm from './SalaryAdjustmentForm';
import styles from './filter-modal.module.css'; // CSS Modules import

function FilterModal({ type }) {
  const renderComponent = () => {
    switch (type) {
      case 'filter':
        return <FilterComponent />;
      case 'sort':
        return <SortComponent />;
      case 'salaryAdjustmentForm':
        return <SalaryAdjustmentForm />;
      default:
        return null;
    }
  };

  return <div className={styles.filters}>{renderComponent()}</div>;
}

FilterModal.propTypes = {
  type: PropTypes.string.isRequired,
};

export default FilterModal;
