import Modal from './Modal';
import Filter from '#components/Modal/Filter';
import Register from '#components/Modal/Register';
import Sort from '#components/Modal/Sort';

export default {
  title: 'UI/Modal',
  component: Modal,
};

// ✅ 1. Filter 예시
export function FilterModalStory() {
  const option = {
    연도: {
      options: [2008, 2009, 2010],
      currentSelectedValue: null,
    },
    상태: {
      options: ['작업전', '작업중', '완료'],
      currentSelectedValue: '완료',
    },
  };

  return <Filter option={option} onSubmit={() => {}} onClose={() => {}} />;
}

// ✅ 2. Register 예시
export function RegisterModalStory() {
  const adjustmentOptions = ['정기연봉조정', '승진자연봉조정', 'Base Up'];

  return (
    <Register
      option={adjustmentOptions}
      onSubmit={() => {}}
      onClose={() => {}}
    />
  );
}

export function SortModalStory() {
  const sortOption = {
    keys: ['연도', '월', '조정유형', '상태', '통합인사반영여부'],
    values: ['오름차순', '내림차순'],
  };

  return <Sort option={sortOption} onSubmit={() => {}} onClose={() => {}} />;
}
