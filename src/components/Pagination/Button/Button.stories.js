import Button from './Button';

export default {
  title: 'Components/Pagination/Button',
  component: Button,
  argTypes: {
    text: { control: 'text' }, // 버튼 텍스트 변경 가능
    onClick: { action: 'clicked' }, // 클릭 이벤트 확인 가능
    type: {
      control: { type: 'select', options: ['primary', 'sub'] }, // primary, sub 선택 가능
    },
  },
  args: {
    onClick: () => {}, // 기본 클릭 이벤트
  },
};

// ✅ "이전" 버튼 (Sub 스타일)
export const Previous = {
  args: {
    text: '이전',
    type: 'sub', // Sub 스타일
  },
};

// ✅ "다음" 버튼 (Primary 스타일)
export const Next = {
  args: {
    text: '다음',
    type: 'primary', // Primary 스타일
  },
};
