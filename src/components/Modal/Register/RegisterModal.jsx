import PropTypes from 'prop-types';
import { useState } from 'react';
import CustomDatePicker from '#components/DatePicker';
import Dropdown from '#components/Dropdown';
import Modal from '../Modal';
import styles from '../modal.module.css';

export default function RegisterModal({
  option,
  onSubmit,
  onClose,
  left,
  right,
  top,
  bottom,
}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [adjustmentType, setAdjustmentType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal
      onSubmit={() => onSubmit?.({ adjustmentType, startDate, endDate })}
      onClose={onClose}
      left={left}
      right={right}
      top={top}
      bottom={bottom}
    >
      <span className={styles.title}>연봉조정 등록</span>

      <div className={styles.registerWrapper}>
        <span className={styles.label}>조정유형</span>
        <Dropdown
          placeHolder="조정 유형 선택"
          options={option}
          selectedValue={adjustmentType}
          isOpen={isOpen}
          onChange={(val) => {
            setAdjustmentType(val);
            setIsOpen(false);
          }}
          onClick={() => setIsOpen((prev) => !prev)}
          customWidth="213px"
          error={false}
        />
      </div>

      <div className={styles.registerWrapper}>
        <span className={styles.label}>시작일자</span>
        <CustomDatePicker
          isSaved="true"
          customWidth="213px"
          date={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>

      <div className={styles.registerWrapper}>
        <span className={styles.label}>종료일자</span>
        <CustomDatePicker
          isSaved="true"
          customWidth="213px"
          date={endDate}
          onChange={(date) => setEndDate(date)}
        />
      </div>
    </Modal>
  );
}

RegisterModal.propTypes = {
  option: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

RegisterModal.defaultProps = {
  left: 'auto',
  right: 'auto',
  top: 'auto',
  bottom: 'auto',
};
