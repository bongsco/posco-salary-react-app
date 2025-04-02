import PropTypes from 'prop-types';
import Button from '#components/Button';
import styles from './high-organization-page.module.css';
import TableOption from '#components/TableOption';

function FilterSort({
  filterOptions,
  onSubmit,
  sortOptions,
  filters,
  sortList,
}) {
  return (
    <div className={styles['filter-sort-area']}>
      <div className={styles['left-group']}>
        <TableOption
          filterOption={filterOptions}
          sortOption={sortOptions}
          onSubmit={onSubmit}
          filters={filters}
          sortList={sortList}
        />
      </div>

      <div className={styles['right-group']}>
        <Button
          variant="secondary"
          size="large"
          label="엑셀다운로드"
          onClick={() => {}}
        />
      </div>
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
