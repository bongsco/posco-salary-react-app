import { fn } from '@storybook/test';
import TableSelectIndicator from './TableSelectIndicator';

export default {
  title: 'UI/TableSelectIndicator',
  component: TableSelectIndicator,
  tags: ['autodocs'],
  argTypes: {
    checkedItemCount: { control: 'number' },
  },
  args: {
    onSelect: fn(),
    onClear: fn(),
  },
};

// ✅ 기본 Pagination 스토리
export const Default = {
  args: {
    checkedItemCount: 5,
  },
};
