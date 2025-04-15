import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from '#components/Button';
import RegisterModal from '#components/Modal/Register';
import TableOption from '#components/TableOption';
import styles from './main-page.module.css';

function FilterSort({
  filterOptions,
  onTableOptionSubmit,
  onRegisterSubmit,
  sortOptions,
  filters,
  sortList,
}) {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleRegisterClick = () => {
    setIsRegisterModalOpen((prev) => !prev);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  return (
    <div className={styles['filter-sort-area']}>
      <div className={styles['left-group']}>
        <TableOption
          filterOption={filterOptions}
          sortOption={sortOptions}
          onSubmit={onTableOptionSubmit}
          filters={filters}
          sortList={sortList}
        />
      </div>

      <div className={styles['right-group']}>
        {/* <Button variant="secondary" size="large" label="엑셀다운로드" />  */}
        <div className={styles['button-modal']}>
          <Button
            variant="primary"
            size="large"
            label="새 연봉 조정 등록"
            onClick={handleRegisterClick}
          />
          {isRegisterModalOpen && (
            <RegisterModal
              option={['정기연봉조정', '승진자연봉조정', 'Base Up']}
              onSubmit={(data) => {
                onRegisterSubmit(data);
                handleCloseRegisterModal();
              }}
              onClose={handleCloseRegisterModal}
              top="130%"
              right={0}
            />
          )}
        </div>
      </div>
    </div>
  );
}

FilterSort.propTypes = {
  filterOptions: PropTypes.arrayOf().isRequired,
  sortOptions: PropTypes.arrayOf().isRequired,
  filters: PropTypes.arrayOf().isRequired,
  sortList: PropTypes.arrayOf().isRequired,
  onTableOptionSubmit: PropTypes.func.isRequired,
  onRegisterSubmit: PropTypes.func.isRequired,
};

export default FilterSort;
