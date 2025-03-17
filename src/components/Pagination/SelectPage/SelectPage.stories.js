import SelectPage from './SelectPage';

export default {
  title: 'Components/Pagination/SelectPage',
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

// ✅ 10페이지에서 시작하는 경우
export const Page10 = {
  args: {
    currentPage: 10,
  },
};

// ✅ 마지막 페이지 (20페이지)
export const LastPage = {
  args: {
    currentPage: 20,
  },
};
