import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '#components/Button';
import FilterModal from './Filter';
import SortModal from './Sort';
import styles from './table-option.module.css';

export default function TableOption({ filterOption, sortOption, onSubmit }) {
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
            onSubmit={(filters) => {
              onSubmit({ type: 'filter', payload: filters });
              setShowFilter(false);
            }}
            onClose={() => setShowFilter(false)}
          />
        )}
      </div>
      <div className={styles.filterOne}>
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
            onSubmit={(sortList) => {
              onSubmit({ type: 'sort', payload: sortList });
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
  onSubmit: PropTypes.func.isRequired,
};
