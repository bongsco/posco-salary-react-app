import { fn } from '@storybook/test';
import Input from './Input';

export default {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    mode: { control: { type: 'select', options: ['primary', 'error', 'ok'] } },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'text' },
    customSize: {
      control: 'object',
      description: 'Custom size for input',
      defaultValue: { width: '225px', height: '30px' },
    },
  },
  args: {
    onFocus: fn(),
    onBlur: fn(),
    onChange: fn(),
  },
};

export const Default = {
  args: {
    id: 'default-input',
    mode: 'default',
    placeholder: '플레이스 홀더 PlaceHolder',
    label: '여기에 입력 관련 메시지를 입력하세요.',
    value: '',
    customSize: { width: '225px', height: '30px' },
  },
};

export const Error = {
  args: {
    id: 'error-input',
    mode: 'error',
    placeholder: '플레이스 홀더 PlaceHolder',
    label: '여기에 입력 오류와 관련된 메시지를 입력해 주세요.',
    value: '',
    customSize: { width: '225px', height: '30px' },
  },
};

export const Ok = {
  args: {
    id: 'ok-input',
    mode: 'ok',
    placeholder: '플레이스 홀더 PlaceHolder',
    label: '여기에 메시지를 입력해 주세요.',
    value: '',
    customSize: { width: '225px', height: '30px' },
  },
};
