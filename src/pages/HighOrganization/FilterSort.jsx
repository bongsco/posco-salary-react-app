import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '#components/Button';
import styles from './high-organization-page.module.css';
import FilterModal from '#components/Modal/Filter';
import SortModal from '#components/Modal/Sort';

function FilterSort({
  filterOptions,
  onFilterClick,
  sortOptions,
  onSortClick,
}) {
  const filterButtonVariant = 'secondary';
  const filterButtonSize = 'round';
  const filterButtonLabel = '필터 추가 +';

  const sortButtonVariant = 'secondary';
  const sortButtonSize = 'round';
  const sortButtonLabel = '정렬: 연도, 월, 등록일 ↓';

  const excelDownloadButtonVariant = 'secondary';
  const excelDownloadButtonSize = 'large';
  const excelDownloadButtonLabel = '엑셀다운로드';

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  const handleFilterClick = () => {
    setIsFilterModalOpen((prev) => !prev);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleSortClick = () => {
    setIsSortModalOpen((prev) => !prev);
  };

  const handleCloseSortModal = () => {
    setIsSortModalOpen(false);
  };

  return (
    <div className={styles['filter-sort-area']}>
      <div className={styles['left-group']}>
        <div className={styles['button-modal']}>
          {/* modal들 위치 설정을 위해 button-modal div 추가 */}
          <Button
            variant={filterButtonVariant}
            size={filterButtonSize}
            label={filterButtonLabel}
            onClick={handleFilterClick}
          />
          {isFilterModalOpen && (
            <div className={styles.modal}>
              <FilterModal
                type="filter"
                option={filterOptions}
                onSubmit={(data) => {
                  onFilterClick(data);
                }}
                onClose={handleCloseFilterModal}
              />
            </div>
          )}
        </div>
        <div className={styles['button-modal']}>
          <Button
            variant={sortButtonVariant}
            size={sortButtonSize}
            label={sortButtonLabel}
            onClick={handleSortClick}
          />
          {isSortModalOpen && (
            <div className={styles.modal}>
              <SortModal
                option={sortOptions}
                onSubmit={onSortClick}
                onClose={handleCloseSortModal}
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles['right-group']}>
        <Button
          variant={excelDownloadButtonVariant}
          size={excelDownloadButtonSize}
          label={excelDownloadButtonLabel}
        />
      </div>
    </div>
  );
}

FilterSort.propTypes = {
  filterOptions: PropTypes.arrayOf().isRequired,
  sortOptions: PropTypes.arrayOf().isRequired,
  onFilterClick: PropTypes.func.isRequired,
  onSortClick: PropTypes.func.isRequired,
};

export default FilterSort;
