import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Dropdown from '#components/Dropdown';
import styles from '../modal.module.css';

export default function SortModal({ option, onSubmit, onClose }) {
  const [sorts, setSorts] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isKeyOpen, setIsKeyOpen] = useState(false);
  const [isValueOpen, setIsValueOpen] = useState(false);

  const handleAddSort = () => {
    if (selectedKey && selectedValue) {
      setSorts((prev) => [...prev, { key: selectedKey, value: selectedValue }]);
      setSelectedKey(null);
      setSelectedValue(null);
    }
  };

  const handleRemoveSort = (index) => {
    setSorts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Modal onSubmit={() => onSubmit?.(sorts)} onClose={onClose}>
      <span className={styles.title}>정렬</span>

      <div className={styles.dropdownWrapper}>
        <Dropdown
          placeHolder="정렬 항목"
          options={option.keys}
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
          placeHolder="정렬 방식"
          options={option.values}
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
          onClick={handleAddSort}
        >
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
              onClick={() => handleRemoveSort(index)}
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

SortModal.propTypes = {
  option: PropTypes.shape({
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
