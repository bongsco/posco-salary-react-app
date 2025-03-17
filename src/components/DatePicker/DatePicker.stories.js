import CustomDatePicker from './CustomDatePicker';

export default {
  title: 'Example/DatePicker',
  component: CustomDatePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    selectedDate: { control: 'date' },
    disabled: { control: 'boolean' },
    saved: { control: 'boolean' }, // ✅ saved 옵션 추가
  },
  args: {
    selectedDate: new Date(),
    disabled: false,
    saved: false, // 기본값 false
  },
};

// 기본 스토리
export const Default = {
  args: {
    selectedDate: new Date(),
    saved: false, // 기본값 false
  },
};

// 비활성화된 상태
export const Disabled = {
  args: {
    selectedDate: new Date(),
    disabled: true,
    saved: false,
  },
};

// ✅ 저장된 상태 (새로운 스토리)
export const Saved = {
  args: {
    selectedDate: new Date(),
    saved: true, // 저장된 상태
  },
};
