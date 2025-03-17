import CheckBox from './CheckBox';

export default {
  title: 'Components/CheckBox',
  component: CheckBox,
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
