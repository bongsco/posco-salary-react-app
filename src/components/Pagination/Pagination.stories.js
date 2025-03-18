import Pagination from './Pagination';

export default {
  title: 'UI/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: { type: 'number', min: 1, max: 10 } }, // ✅ 현재 페이지 조정 가능
    onPageChange: { action: 'changed' }, // ✅ Storybook 액션 로깅
  },
  args: {
    currentPage: 1, // 기본값
  },
};

// ✅ 기본 Pagination 스토리
export const Default = {
  args: {
    currentPage: 1,
  },
};
