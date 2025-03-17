import Button from './Button';

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: { control: { type: 'select', options: ['primary', 'secondary'] } },
    size: {
      control: {
        type: 'select',
        options: ['xsmall', 'small', 'medium', 'large', 'custom'],
      },
    },
    label: { control: 'text' },
    customSize: { control: 'object' },
    onClick: { action: 'clicked' },
  },
  tags: ['autodocs'],
};

export const Primary = {
  args: {
    variant: 'primary',
    size: 'large',
    label: '엑셀다운로드',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    size: 'large',
    label: '엑셀다운로드',
  },
};

export const CustomSize = {
  args: {
    variant: 'primary',
    size: 'custom',
    label: '선택',
    customSize: { width: '117px', height: '26px' },
  },
};
