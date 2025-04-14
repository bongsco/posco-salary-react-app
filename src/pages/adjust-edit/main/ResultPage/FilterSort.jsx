import PropTypes from 'prop-types';
import TableOption from '#components/TableOption';
import styles from './result-page.module.css';

function FilterSort({
  filterOptions,
  onSubmit,
  sortOptions,
  filters,
  sortList,
}) {
  return (
    <div className={styles['left-group']}>
      <TableOption
        filterOption={filterOptions}
        sortOption={sortOptions}
        onSubmit={onSubmit}
        filters={filters}
        sortList={sortList}
      />
    </div>
  );
}

FilterSort.propTypes = {
  filterOptions: PropTypes.arrayOf().isRequired,
  sortOptions: PropTypes.arrayOf().isRequired,
  filters: PropTypes.arrayOf().isRequired,
  sortList: PropTypes.arrayOf().isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FilterSort;
