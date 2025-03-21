import { useState } from 'react';
import Dropdown from '#components/Dropdown';
import Button from '#components/Button';
import styles from './filter-modal.module.css';

function FilterComponent() {
  /* 사용자가 선택한 필터 옵션 -> useState 적지 말고... */
  const [filters, setFilters] = useState([
    { key: '조정유형', value: '' },
    { key: '상태', value: '' },
  ]);

  const filterValues = {
    연도: [
      2008, 2009, 2010, 2011, 2012, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
      2019, 2020, 2021, 2022, 2023, 2024, 2025,
    ],
    월: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    조정유형: ['Base Up', '정기연봉조정', '승진자연봉조정'],
    상태: ['작업중', '작업전', '완료'],
    통합인사반영여부: ['반영', '미반영'],
  };

  const handleFilterChange = (index, newKey) => {
    const updatedFilters = [...filters];
    updatedFilters[index].key = newKey;
    updatedFilters[index].value = ''; // 키 변경 시 값 초기화
    setFilters(updatedFilters);
  };

  const handleValueChange = (index, newValue) => {
    const updatedFilters = [...filters];
    updatedFilters[index].value = newValue;
    setFilters(updatedFilters);
  };

  const handleRemoveFilter = (index) => {
    const updatedFilters = filters.filter((_, i) => i !== index);
    setFilters(updatedFilters);
  };

  const getFilteredOptions = (index) => {
    const selectedFilter = filters[index].key;
    return filterValues[selectedFilter] || [];
  };

  const handleAddFilter = () => {
    setFilters([...filters, { key: '조정유형', value: '' }]); // 새 필터 추가
  };

  return (
    <>
      <div className={styles['component-title']}>필터</div>
      {filters.map((filter, index) => (
        <div key={`${filter.key}`} className={styles['filter-row']}>
          <Dropdown
            placeHolder="필터 속성"
            options={Object.keys(filterValues)}
            size="small"
            onChange={(newKey) => handleFilterChange(index, newKey)}
          />
          <Dropdown
            placeHolder="속성 값"
            options={getFilteredOptions(index)}
            size="small"
            onChange={(newValue) => handleValueChange(newValue)}
            value={filter.value}
            disabled={!filter.key}
          />
          <button
            className={styles['remove-btn']}
            type="button"
            onClick={() => handleRemoveFilter(index)}
          >
            ✕
          </button>
        </div>
      ))}
      <div className={styles['button-area']}>
        <Button
          variant="primary"
          size="xs"
          label="추가"
          onClick={handleAddFilter}
        />
        <Button
          variant="secondary"
          size="xs"
          label="닫기"
          /* 해당 Filter Modal 부분을 닫게 만드는 onClick 이벤트 처리 */
          onClick={handleRemoveFilter}
        />
      </div>
    </>
  );
}

export default FilterComponent;
