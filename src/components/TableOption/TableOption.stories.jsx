import { fn } from '@storybook/test';
import PropTypes from 'prop-types';
import TableOption from '#components/TableOption';

export default {
  title: 'UI/TableOption',
  component: TableOption,
  tags: ['autodocs'],
  args: {
    filterOption: {
      상태: {
        optionType: 'dropdown',
        options: ['진행중', '완료'],
        initialValue: '',
      },
      연도: { optionType: 'text', initialValue: '' },
    },
    sortOption: {
      keys: ['연도', '상태'],
      values: ['오름차순', '내림차순'],
    },
    onSubmit: fn(),
  },
};

function Template({ filterOption, sortOption, onSubmit }) {
  return (
    <TableOption
      filterOption={filterOption}
      sortOption={sortOption}
      onSubmit={onSubmit}
    />
  );
}

export const WithInternalModals = Template.bind({});

Template.propTypes = {
  filterOption: PropTypes.objectOf(
    PropTypes.shape({
      optionType: PropTypes.oneOf(['text', 'dropdown', 'date']).isRequired,
      initialValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date),
      ]),
      options: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      ),
    }),
  ).isRequired,
  sortOption: PropTypes.shape({
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
