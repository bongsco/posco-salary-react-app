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
        options: ['진행전 ', '진행중', '완료'],
        initialValue: '',
      },
      연도: { optionType: 'text', initialValue: '' },
      입사일: { optionType: 'date', initialValue: '' },
    },
    sortOption: {
      keys: ['연도', '상태'],
      values: ['오름차순', '내림차순'],
    },
    onSubmit: fn(),
  },
};

// ✅ 기본 템플릿
function Template({ filterOption, sortOption, onSubmit, filters, sortList }) {
  return (
    <TableOption
      filterOption={filterOption}
      sortOption={sortOption}
      filters={filters}
      sortList={sortList}
      onSubmit={onSubmit}
    />
  );
}

// ✅ 기본 상태: 빈 필터/정렬
export const Default = Template.bind({});
Default.args = {
  filters: [],
  sortList: [],
};

// ✅ 초기 필터/정렬값이 있는 상태
export const WithInitialState = Template.bind({});
WithInitialState.args = {
  filters: [
    { key: '상태', value: ['진행중'] },
    { key: '연도', value: ['2024'] },
  ],
  sortList: [{ key: '연도', value: '내림차순' }],
};

// ✅ PropTypes 정의
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
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.instanceOf(Date),
        ]),
      ).isRequired,
    }),
  ).isRequired,
  sortList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
