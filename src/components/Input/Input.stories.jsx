import { fn } from '@storybook/test';
import Input from './Input';

export default {
  title: 'UI/Input',
  component: Input,
  argTypes: {
    mode: { control: { type: 'select', options: ['primary', 'error', 'ok'] } },
    placeholder: { control: 'text' },
    label: 'text',
    onFocus: { action: 'focused' },
    onBlur: { action: 'blurred' },
  },
};

export const Default = {
  args: {
    mode: 'primary',
    placeholder: '플레이스 홀더 PlaceHolder',
    label: '',
    onFocus: fn(),
    onBlur: fn(),
  },
};

export const Error = {
  args: {
    mode: 'error',
    placeholder: '플레이스 홀더 PlaceHolder',
    label: '여기에 입력 오류와 관련된 메시지를 입력해 주세요.',
    onFocus: fn(),
    onBlur: fn(),
  },
};

export const Ok = {
  args: {
    mode: 'ok',
    placeholder: '플레이스 홀더 PlaceHolder',
    label: '여기에 메시지를 입력해 주세요.',
    onFocus: fn(),
    onBlur: fn(),
  },
};
