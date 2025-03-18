import InputPage from './InputPage';

export default {
  title: 'UI/Pagination/InputPage',
  component: InputPage,
  argTypes: {
    currentPage: { control: 'number' }, // 페이지 입력을 숫자로 조정 가능
    onPageChange: { action: 'changed' }, // 입력 값 변경 감지
  },
  args: {
    currentPage: 1, // 기본 페이지 1
  },
};

// ✅ 기본 InputPage
export const Default = {
  args: {
    currentPage: 1,
  },
};

// ✅ 입력 필드에서 다른 값으로 변경 가능
export const CustomPage = {
  args: {
    currentPage: 5, // 예제: 5페이지
  },
};
