import PropTypes from 'prop-types';
import styles from './table-select-indicator.module.css';

export default function TableSelectIndicator({
  checkedItemCount,
  onSelect,
  onClear,
}) {
  return (
    <div className={styles.tableSelectIndicatorContainer}>
      <div className={styles.selectedCountText}>
        {checkedItemCount}개 선택됨
      </div>
      <button type="button" className={styles.actionButton} onClick={onSelect}>
        전체 선택
      </button>
      <button type="button" className={styles.actionButton} onClick={onClear}>
        선택 취소
      </button>
    </div>
  );
}

TableSelectIndicator.propTypes = {
  checkedItemCount: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};
