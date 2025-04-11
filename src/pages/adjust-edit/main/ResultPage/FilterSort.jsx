import PropTypes from 'prop-types';
import Button from '#components/Button';
import Switch from '#components/Switch';
import TableOption from '#components/TableOption';
import styles from './result-page.module.css';

function FilterSort({
  filterOptions,
  onSubmit,
  sortOptions,
  filters,
  sortList,
  tableMode,
  setTableMode,
  onClickExcelDownloadButton,
}) {
  const excelDownloadButtonVariant = 'secondary';
  const excelDownloadButtonSize = 'large';
  const excelDownloadButtonLabel = '엑셀다운로드';

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
        <div className={styles['switch-container']}>
          <div className={styles['switch-label']}>카드</div>
          <Switch
            isOn={tableMode}
            onClick={() => setTableMode((prev) => !prev)}
          />
          <div className={styles['switch-label']}>테이블</div>
        </div>
        <Button
          variant={excelDownloadButtonVariant}
          size={excelDownloadButtonSize}
          label={excelDownloadButtonLabel}
          onClick={() => {
            onClickExcelDownloadButton();
          }}
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
  tableMode: PropTypes.bool.isRequired,
  setTableMode: PropTypes.func.isRequired,
  onClickExcelDownloadButton: PropTypes.func.isRequired,
};

export default FilterSort;
