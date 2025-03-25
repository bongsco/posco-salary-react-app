import { useState } from 'react';
import Dropdown from '#components/Dropdown';
import styles from './filter-modal.module.css';

export default function FilterModal() {
  const options = [
    '오름차순',
    '내림차순',
    '작업중',
    '작업전',
    '완료',
    '정기연봉조정',
    'BaseUp',
    '승진자연봉조정',
    '김종하',
    '김현아',
    '김서영',
    '이은재',
    '한상진',
  ];

  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  return (
    <div className={styles.filters}>
      필터
      <div className={styles.filter}>
        <Dropdown
          placeHolder="상태"
          options={options}
          error={false}
          selectedValue={selectedStatus}
          isOpen={isStatusOpen}
          onChange={(value) => {
            setSelectedStatus(value);
            setIsStatusOpen(false); // 선택 시 닫기
          }}
          onClick={() => setIsStatusOpen((prev) => !prev)}
        />

        {/* 아래 Dropdown도 동작 추가 필요 시 동일한 패턴으로 관리 */}
        <Dropdown
          placeHolder="상태"
          options={options}
          error={false}
          selectedValue={selectedStatus}
          isOpen={isStatusOpen}
          onChange={(value) => {
            setSelectedStatus(value);
            setIsStatusOpen(false); // 선택 시 닫기
          }}
          onClick={() => setIsStatusOpen((prev) => !prev)}
        />

        <div className={styles.button}>
          <span className={styles.plus}>+</span>
        </div>
      </div>
    </div>
  );
}
