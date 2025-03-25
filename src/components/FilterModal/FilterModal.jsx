import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './filter-modal.module.css';
import Filter from './Filter/Filter';
import Sort from './Sort/Sort';
import Register from './Register/Register';
import Button from '#components/Button';

export default function FilterModal({ type, onSubmit, onClose }) {
  const [filterList, setFilterList] = useState([]);
  const [sortList, setSortList] = useState([]);
  const [registerData, setRegisterData] = useState({
    title: '',
    adjustmentType: '',
  });

  const handleAddFilter = (newFilter) => {
    setFilterList((prev) => [...prev, newFilter]);
  };

  const handleAddSort = (newSort) => {
    setSortList((prev) => [...prev, newSort]);
  };

  const handleRegisterChange = (updated) => {
    setRegisterData(updated);
  };

  const renderContent = () => {
    switch (type) {
      case 'filter':
        return (
          <Filter
            filters={filterList}
            onAddFilter={handleAddFilter}
            onRemoveFilter={(index) =>
              setFilterList((prev) => prev.filter((_, i) => i !== index))
            }
          />
        );
      case 'sort':
        return (
          <Sort
            sorts={sortList}
            onAddSort={handleAddSort}
            onRemoveSort={(index) =>
              setSortList((prev) => prev.filter((_, i) => i !== index))
            }
          />
        );
      case 'register':
        return <Register data={registerData} onChange={handleRegisterChange} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.filters}>
      {renderContent()}
      <div className={styles.buttonWrapper}>
        <Button
          variant="primary"
          label="추가"
          size="xsmall"
          onClick={() => {
            if (type === 'filter') onSubmit?.(filterList);
            else if (type === 'sort') onSubmit?.(sortList);
            else if (type === 'register') onSubmit?.(registerData);
          }}
        />

        <Button
          variant="secondary"
          label="닫기"
          size="xsmall"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
FilterModal.propTypes = {
  type: PropTypes.oneOf(['filter', 'sort', 'register']).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
