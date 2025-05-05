import { fn } from '@storybook/test';
import { icons } from '#components/SideBar/Icon';
import Item from './Item';

export default {
  title: 'Layout/SideBar/Item',
  component: Item,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: {
        type: 'select',
      },
      options: Object.keys(icons),
    },
  },
  args: { onClick: fn() },
};

export const Primary = {
  args: {
    icon: 'home',
    text: 'Caption Here',
  },
};
