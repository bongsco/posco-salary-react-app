import CheckBox from './CheckBox';

export default {
  title: 'UI/CheckBox',
  component: CheckBox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
  },
};

export const Checked = {
  args: {
    checked: true,
  },
};

export const Unchecked = {
  args: {
    checked: false,
  },
};
