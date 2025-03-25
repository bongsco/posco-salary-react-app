import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../filter-modal.module.css';
import Input from '#components/Input';
import Dropdown from '#components/Dropdown';

export default function Register({ data }) {
  const [title, setTitle] = useState(data.title || '');
  const [adjustmentType, setAdjustmentType] = useState(
    data.adjustmentType || null,
  );
  const [isOpen, setIsOpen] = useState(false);

  const adjustmentOptions = ['정기연봉조정', '승진자연봉조정', 'Base Up'];

  // useEffect(() => {
  //   onChange({ title, adjustmentType });
  // }, [title, adjustmentType]);

  // useEffect(() => {
  //   setTitle(data.title || '');
  //   setAdjustmentType(data.adjustmentType || null);
  // }, [data]);

  return (
    <>
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
          error={false}
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
    </>
  );
}
Register.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    adjustmentType: PropTypes.string, // '정기연봉조정' | '승진자연봉조정' | 'Base Up'
  }).isRequired,
  // onChange: PropTypes.func.isRequired,
};
