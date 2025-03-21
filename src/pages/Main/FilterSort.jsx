import Button from '#components/Button';
import styles from './main-page.module.css';

function FilterSort() {
  const filterButtonVariant = 'secondary';
  const filterButtonSize = 'round';
  const filterButtonLabel = '필터 추가 +';

  const sortButtonVariant = 'secondary';
  const sortButtonSize = 'round';
  const sortButtonLabel = '정렬: 연도, 월, 등록일 ↓';

  const excelDownloadButtonVariant = 'secondary';
  const excelDownloadButtonSize = 'large';
  const excelDownloadButtonLabel = '엑셀다운로드';

  const salaryAdjustmentAddButtonVariant = 'primary';
  const salaryAdjustmentAddButtonSize = 'large';
  const salaryAdjustmentAddButtonLabel = '새 연봉 조정 등록';

  return (
    <div className={styles['filter-sort-area']}>
      <div className={styles['left-group']}>
        <Button
          variant={filterButtonVariant}
          size={filterButtonSize}
          label={filterButtonLabel}
        />
        <Button
          variant={sortButtonVariant}
          size={sortButtonSize}
          label={sortButtonLabel}
        />
      </div>

      <div className={styles['right-group']}>
        <Button
          variant={excelDownloadButtonVariant}
          size={excelDownloadButtonSize}
          label={excelDownloadButtonLabel}
        />
        <Button
          variant={salaryAdjustmentAddButtonVariant}
          size={salaryAdjustmentAddButtonSize}
          label={salaryAdjustmentAddButtonLabel}
        />
      </div>
    </div>
  );
}

export default FilterSort;
