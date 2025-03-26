import PropTypes from 'prop-types';
import { fn } from '@storybook/test';
import FilterModal from '#components/TableOption/Filter';
import RegisterModal from '#components/Modal/Register';
import SortModal from '#components/TableOption/Sort';
import Modal from '#components/Modal/Modal';

function Template({
  type,
  option,
  onClose,
  onSubmit,
  prevFilters,
  prevSortList,
}) {
  if (type === 'filter') {
    return (
      <FilterModal
        option={option}
        onSubmit={onSubmit}
        onClose={onClose}
        prevFilters={prevFilters}
      />
    );
  }

  if (type === 'register') {
    return (
      <RegisterModal option={option} onSubmit={onSubmit} onClose={onClose} />
    );
  }

  if (type === 'sort') {
    return (
      <SortModal
        option={option}
        onSubmit={onSubmit}
        onClose={onClose}
        prevSortList={prevSortList}
      />
    );
  }

  return null;
}

Template.propTypes = {
  type: PropTypes.oneOf(['filter', 'register', 'sort']).isRequired,
  option: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  prevFilters: PropTypes.arrayOf([PropTypes.object]).isRequired,
  prevSortList: PropTypes.arrayOf([PropTypes.object]).isRequired,
};

export default {
  title: 'UI/Modal',
  component: Modal,
  args: {
    onSubmit: fn(),
  },
};

export const FilterModalStory = Template.bind({});
FilterModalStory.args = {
  type: 'filter',
  option: {
    연도: { initialValue: null, optionType: 'text' },
    날짜: { initialValue: null, optionType: 'date' },
    상태: {
      options: ['작업전', '작업중', '완료'],
      initialValue: '완료',
      optionType: 'dropdown',
    },
  },

  onClose: () => {},
};

export const RegisterModalStory = Template.bind({});
RegisterModalStory.args = {
  type: 'register',
  option: ['정기연봉조정', '승진자연봉조정', 'Base Up'],
  onClose: () => {},
};

export const SortModalStory = Template.bind({});
SortModalStory.args = {
  type: 'sort',
  option: {
    keys: ['연도', '월', '조정유형', '상태', '통합인사반영여부'],
    values: ['오름차순', '내림차순'],
  },
  onClose: () => {},
};

export const FilterModalStoryWithPrev = Template.bind({});
FilterModalStoryWithPrev.args = {
  type: 'filter',
  option: {
    연도: { initialValue: null, optionType: 'text' },
    날짜: { initialValue: null, optionType: 'date' },
    상태: {
      options: ['작업전', '작업중', '완료'],
      initialValue: '완료',
      optionType: 'dropdown',
    },
  },
  prevFilters: [
    { key: '연도', value: ['2023'] },
    { key: '상태', value: ['작업중'] },
    { key: '날짜', value: [new Date()] },
  ],
  onClose: () => {},
};

export const SortModalStoryWithPrev = Template.bind({});
SortModalStoryWithPrev.args = {
  type: 'sort',
  option: {
    keys: ['연도', '월', '조정유형', '상태', '통합인사반영여부'],
    values: ['오름차순', '내림차순'],
  },
  prevSortList: [
    { key: '연도', value: '오름차순' },
    { key: '상태', value: '내림차순' },
  ],
  onClose: () => {},
};
