import LabeledSwitch from './LabeledSwitch';

export default {
  title: 'UI/LabeledSwitch',
  component: LabeledSwitch,
  argTypes: {
    label: { control: 'text' },
    isChecked: { control: 'boolean' },
    isCommitted: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
  tags: ['autodocs'],
};

export const NotCheckedNotCommitted = {
  args: {
    label: 'Value',
    isChecked: false,
    isCommitted: false,
  },
};

export const CheckedCommitted = {
  args: {
    label: 'Value',
    isChecked: true,
    isCommitted: true,
  },
};

export const CheckedNotCommitted = {
  args: {
    label: 'Value',
    isChecked: true,
    isCommitted: false,
  },
};

export const NotCheckedCommitted = {
  args: {
    label: 'Value',
    isChecked: false,
    isCommitted: true,
  },
};
