import Switch from './Switch';

export default {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    initialOn: { control: 'boolean' },
  },
};

const data = { toggle1: false };
export const Default = {
  args: {
    initialOn: data.toggle1,
    onClick: (value) => {
      data.toggle1 = value;
      console.log(`새로운 값: ${value}`);
    },
  },
};
