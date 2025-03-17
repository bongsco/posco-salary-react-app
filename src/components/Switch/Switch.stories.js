import Switch from './Switch';

export default {
  title: 'Components/Switch',
  component: Switch,
};

export const Default = {
  args: {
    currentOn: false,
    onChanged: () => {},
  },
};

export const TrueValue = {
  args: {
    currentOn: true,
    onChanged: () => {},
  },
};
