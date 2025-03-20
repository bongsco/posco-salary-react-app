import { fn } from '@storybook/test';
import LabeledSwitch from './LabeledSwitch';

export default {
  title: 'UI/LabeledSwitch',
  component: LabeledSwitch,
  argTypes: {
    label: { control: 'text' },
    isCommitted: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export const NotCheckedNotCommitted = {
  args: {
    label: 'Value',
    isCommitted: false,
    onClick: fn(),
  },
};

export const CheckedCommitted = {
  args: {
    label: 'Value',
    isCommitted: true,
    onClick: fn(),
  },
};

export const CheckedNotCommitted = {
  args: {
    label: 'Value',
    isCommitted: false,
    onClick: fn(),
  },
};

export const NotCheckedCommitted = {
  args: {
    label: 'Value',
    isCommitted: true,
    onClick: fn(),
  },
};
