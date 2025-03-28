import { fn } from '@storybook/test';
import CustomDatePicker from './CustomDatePicker';

export default {
  title: 'UI/Form/Inputs/CustomDatePicker',
  component: CustomDatePicker,
  tags: ['autodocs'],
  argTypes: {
    isDisabled: { control: 'boolean' },
    isSaved: { control: 'boolean' },
    hasError: { control: 'boolean' },
    customWidth: { control: 'text' },
    minWidth: { control: 'text' },
    maxWidth: { control: 'text' },
    message: { control: 'text' },
  },
  args: { onChange: fn() }, // ✅ Storybook에서 onChange 이벤트 추적 가능
};

// ✅ 기본 스토리
export const Default = {
  args: {
    isDisabled: false,
    isSaved: true,
    hasError: false,
  },
};

// ✅ 저장된 상태 (isSaved = true)
export const SavedState = {
  args: {
    isDisabled: false,
    isSaved: true,
    hasError: false,
  },
};

// ✅ 비활성화된 상태 (isActive = true)
export const Disabled = {
  args: {
    isDisabled: true,
    isSaved: true,
    hasError: false,
  },
};

export const Error = {
  args: {
    isDisabled: false,
    isSaved: true,
    hasError: true,
    message: '날짜를 선택해주세요',
  },
};
