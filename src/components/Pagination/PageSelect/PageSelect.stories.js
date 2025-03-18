import SelectPage from './PageSelect';

export default {
  title: 'UI/Pagination/SelectPage',
  component: SelectPage,
  argTypes: {
    currentPage: { control: { type: 'number', min: 1, max: 20 } }, // 페이지 선택 범위 설정
    onPageChange: { action: 'changed' }, // 이벤트 감지 가능
  },
  args: {
    currentPage: 1, // 기본 페이지 값
  },
};

// ✅ 기본 SelectPage (1페이지)
export const Default = {
  args: {
    currentPage: 1,
  },
};
