import { fn } from '@storybook/test';
import CustomDatePicker from './CustomDatePicker';

export default {
  title: 'UI/CustomDatePicker',
  component: CustomDatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isDisabled: { control: 'boolean' },
    isSaved: { control: 'boolean' },
    hasError: { control: 'boolean' },
  },
  args: { onChange: fn() }, // ✅ Storybook에서 onChange 이벤트 추적 가능
};

// ✅ 기본 스토리
export const Default = {
  args: {
    isDisabled: false,
    isSaved: false,
  },
};

// ✅ 저장된 상태 (isSaved = true)
export const SavedState = {
  args: {
    isDisabled: false,
    isSaved: true,
  },
};

// ✅ 비활성화된 상태 (isActive = true)
export const Disabled = {
  args: {
    isDisabled: true,
    isSaved: true,
  },
};

export const Error = {
  args: {
    isSaved: true,
    hasError: true,
  },
};
