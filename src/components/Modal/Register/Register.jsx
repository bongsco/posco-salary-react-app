import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import styles from '../modal.module.css';
import Input from '#components/Input';
import Dropdown from '#components/Dropdown';

export default function Register({ onSubmit, onClose }) {
  const [title, setTitle] = useState('');
  const [adjustmentType, setAdjustmentType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const adjustmentOptions = ['정기연봉조정', '승진자연봉조정', 'Base Up'];

  return (
    <Modal
      onSubmit={() => onSubmit?.({ title, adjustmentType })}
      onClose={onClose}
    >
      <span className={styles.title}>연봉조정 등록</span>

      <div className={styles.registerWrapper}>
        <span className={styles.label}>조정 제목</span>
        <Input
          id="adjustment-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="조정 제목을 입력하세요"
          mode="default"
          customWidth={213}
          customHeight={32}
        />
      </div>

      <div className={styles.registerWrapper}>
        <span className={styles.label}>조정 유형</span>
        <Dropdown
          placeHolder="조정 유형 선택"
          options={adjustmentOptions}
          selectedValue={adjustmentType}
          isOpen={isOpen}
          onChange={(val) => {
            setAdjustmentType(val);
            setIsOpen(false);
          }}
          onClick={() => setIsOpen((prev) => !prev)}
          customWidth={213}
        />
      </div>
    </Modal>
  );
}

Register.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
