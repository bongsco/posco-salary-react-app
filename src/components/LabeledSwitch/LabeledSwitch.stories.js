import LabeledSwitch from './LabeledSwitch';

export default {
  title: 'UI/LabeledSwitch',
  component: LabeledSwitch,
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    committed: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
  tags: ['autodocs'],
};

export const NotCheckedNotCommitted = {
  args: {
    label: 'Value',
    checked: false,
    committed: false,
  },
};

export const CheckedCommitted = {
  args: {
    label: 'Value',
    checked: true,
    committed: true,
  },
};

export const CheckedNotCommitted = {
  args: {
    label: 'Value',
    checked: true,
    committed: false,
  },
};

export const NotCheckedCommitted = {
  args: {
    label: 'Value',
    checked: false,
    committed: true,
  },
};
