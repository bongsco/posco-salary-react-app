import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import styles from '../modal.module.css';
import Dropdown from '#components/Dropdown';

export default function FilterModal({ option, onSubmit, onClose }) {
  const [filters, setFilters] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isKeyOpen, setIsKeyOpen] = useState(false);
  const [isValueOpen, setIsValueOpen] = useState(false);

  const handleAddFilter = () => {
    if (selectedKey && selectedValue) {
      setFilters((prev) => [
        ...prev,
        { key: selectedKey, value: selectedValue },
      ]);
      setSelectedKey(null);
      setSelectedValue(null);
    }
  };

  const handleRemoveFilter = (index) => {
    setFilters((prev) => prev.filter((_, i) => i !== index));
  };

  const keys = Object.keys(option);

  return (
    <Modal onSubmit={() => onSubmit?.(filters)} onClose={onClose}>
      <span className={styles.title}>필터</span>

      <div className={styles.dropdownWrapper}>
        <Dropdown
          placeHolder="필터 항목 선택"
          options={keys}
          selectedValue={selectedKey}
          isOpen={isKeyOpen}
          onChange={(val) => {
            setSelectedKey(val);
            setSelectedValue(null);
            setIsKeyOpen(false);
          }}
          onClick={() => setIsKeyOpen((prev) => !prev)}
          customWidth="133px"
          error={false}
        />

        <Dropdown
          placeHolder="값 선택"
          options={
            selectedKey && option[selectedKey]
              ? option[selectedKey].options.map(String)
              : []
          }
          selectedValue={selectedValue}
          isOpen={isValueOpen}
          onChange={(val) => {
            setSelectedValue(val);
            setIsValueOpen(false);
          }}
          onClick={() => setIsValueOpen((prev) => !prev)}
          customWidth="133px"
          error={false}
        />

        <button
          type="button"
          className={styles.plusButton}
          onClick={handleAddFilter}
        >
          <span className={styles.plus}>+</span>
        </button>
      </div>

      <div className={styles.filterWrapper}>
        {filters.map((filter, index) => (
          <div key={`${filter.key}-${filter.value}`} className={styles.filter}>
            <span className={styles.filterName}>
              {filter.key} : {filter.value}
            </span>
            <button
              type="button"
              onClick={() => handleRemoveFilter(index)}
              className={styles.removeButton}
            >
              <span className={styles.remove}>X</span>
            </button>
          </div>
        ))}
      </div>
    </Modal>
  );
}

FilterModal.propTypes = {
  option: PropTypes.objectOf(
    PropTypes.shape({
      options: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      ).isRequired,
      currentSelectedValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    }),
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
