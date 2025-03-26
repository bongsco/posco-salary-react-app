import PropTypes from 'prop-types';
import { fn } from '@storybook/test';
import FilterModal from '#components/Modal/Filter';
import RegisterModal from '#components/Modal/Register';
import SortModal from '#components/Modal/Sort';
import Modal from '#components/Modal/Modal';

function Template({ type, option, onClose, onSubmit }) {
  if (type === 'filter') {
    return (
      <FilterModal option={option} onSubmit={onSubmit} onClose={onClose} />
    );
  }

  if (type === 'register') {
    return (
      <RegisterModal option={option} onSubmit={onSubmit} onClose={onClose} />
    );
  }

  if (type === 'sort') {
    return <SortModal option={option} onSubmit={onSubmit} onClose={onClose} />;
  }

  return null;
}

Template.propTypes = {
  type: PropTypes.oneOf(['filter', 'register', 'sort']).isRequired,
  option: PropTypes.oneOfType([
    PropTypes.object, // for filter & sort
    PropTypes.arrayOf(PropTypes.string), // for register
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
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
    연도: { options: [2008, 2009, 2010], currentSelectedValue: null },
    상태: {
      options: ['작업전', '작업중', '완료'],
      currentSelectedValue: '완료',
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
