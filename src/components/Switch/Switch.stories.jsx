import { fn } from '@storybook/test';
import Switch from './Switch';

export default {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
};

export const Default = {
  args: {
    initialOn: false,
  },
};
