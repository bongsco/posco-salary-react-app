import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../filter-modal.module.css';
import Dropdown from '#components/Dropdown';

export default function Sort({ sorts, onAddSort, onRemoveSort }) {
  const sortOptions = ['오름차순', '내림차순'];
  const sortKeys = ['연도', '월', '조정유형', '상태', '통합인사반영여부'];

  const [selectedKey, setSelectedKey] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isKeyOpen, setIsKeyOpen] = useState(false);
  const [isValueOpen, setIsValueOpen] = useState(false);

  const handleAdd = () => {
    if (selectedKey && selectedValue) {
      onAddSort({ key: selectedKey, value: selectedValue });
      setSelectedKey(null);
      setSelectedValue(null);
    }
  };

  return (
    <>
      <span className={styles.title}>정렬</span>
      <div className={styles.dropdownWrapper}>
        <Dropdown
          placeHolder="정렬 항목"
          options={sortKeys}
          selectedValue={selectedKey}
          isOpen={isKeyOpen}
          onChange={(val) => {
            setSelectedKey(val);
            setSelectedValue(null);
            setIsKeyOpen(false);
          }}
          onClick={() => setIsKeyOpen((prev) => !prev)}
          customWidth={133}
        />

        <Dropdown
          placeHolder="정렬 방식"
          options={sortOptions}
          selectedValue={selectedValue}
          isOpen={isValueOpen}
          onChange={(val) => {
            setSelectedValue(val);
            setIsValueOpen(false);
          }}
          onClick={() => setIsValueOpen((prev) => !prev)}
          customWidth={133}
        />

        <button type="button" className={styles.plusButton} onClick={handleAdd}>
          <span className={styles.plus}>+</span>
        </button>
      </div>

      <div className={styles.filterWrapper}>
        {sorts.map((sort, index) => (
          <div key={`${sort.key}-${sort.value}`} className={styles.filter}>
            <span className={styles.filterName}>
              {sort.key} : {sort.value}
            </span>
            <button
              type="button"
              onClick={() => onRemoveSort(index)}
              className={styles.removeButton}
            >
              <span className={styles.remove}>X</span>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

Sort.propTypes = {
  sorts: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired, // 정렬 방향: '오름차순' | '내림차순'
    }),
  ).isRequired,
  onAddSort: PropTypes.func.isRequired,
  onRemoveSort: PropTypes.func.isRequired,
};
