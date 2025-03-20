import Input from './Input';

export default {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    mode: { control: { type: 'select', options: ['default', 'error', 'ok'] } },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    customWidth: { control: 'number' },
    customHeight: { control: 'number' },
    onChange: { action: 'changed' },
    initialValue: { control: 'text' },
  },
  args: {
    id: 'input',
    initialValue: 'initialValue 초기값',
    customWidth: 225,
    customHeight: 30,
    placeholder: 'Placeholder 플레이스홀더',
  },
};

export const Default = {
  args: {
    mode: 'default',
    label: '여기에 입력 관련 메시지를 입력하세요.',
  },
};

export const Error = {
  args: {
    mode: 'error',
    label: '여기에 입력 관련 메시지를 입력하세요.',
  },
};

export const Ok = {
  args: {
    mode: 'ok',
    label: '여기에 입력 관련 메시지를 입력하세요.',
  },
};
