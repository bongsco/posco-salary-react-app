import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '#components/Button';
import FilterModal from './Filter';
import SortModal from './Sort';
import styles from './table-option.module.css';

export default function TableOption({
  filterOption,
  sortOption,
  onSubmit,
  filters,
  sortList,
}) {
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  return (
    <div className={styles.leftGroup}>
      <div className={styles.filter}>
        <Button
          variant="secondary"
          size="round"
          label="필터 추가 +"
          onClick={() => {
            setShowSort(false);
            setShowFilter(true);
          }}
        />
        {showFilter && (
          <FilterModal
            option={filterOption}
            prevFilters={filters}
            onSubmit={(newFilters) => {
              onSubmit({ type: 'filter', payload: newFilters }); // ✅ 부모에서 관리
              setShowFilter(false);
            }}
            onClose={() => setShowFilter(false)}
          />
        )}
      </div>

      <div className={styles.filter}>
        <Button
          variant="secondary"
          size="round"
          label="정렬: 연도, 월, 등록일 ↓"
          onClick={() => {
            setShowFilter(false);
            setShowSort(true);
          }}
        />
        {showSort && (
          <SortModal
            option={sortOption}
            prevSortList={sortList}
            onSubmit={(newSortList) => {
              onSubmit({ type: 'sort', payload: newSortList }); // ✅ 부모에서 관리
              setShowSort(false);
            }}
            onClose={() => setShowSort(false)}
          />
        )}
      </div>
    </div>
  );
}

TableOption.propTypes = {
  filterOption: PropTypes.objectOf(
    PropTypes.shape({
      optionType: PropTypes.oneOf(['text', 'dropdown', 'date']).isRequired,
      initialValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date),
      ]),
      options: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      ),
    }),
  ).isRequired,
  sortOption: PropTypes.shape({
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.instanceOf(Date),
        ]),
      ).isRequired,
    }),
  ).isRequired,
  sortList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
