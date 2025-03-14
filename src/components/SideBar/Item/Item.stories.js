import { fn } from '@storybook/test';

import Item from './Item';

export default {
  title: 'Layout/SideBar/Item',
  component: Item,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isActive: { control: 'boolean' },
    icon: {
      control: {
        type: 'select',
        options: ['home', 'person', 'card'],
      },
    },
  },
  args: { onClick: fn() },
};

export const Primary = {
  args: {
    icon: 'home',
    caption: 'Caption Here',
    isActive: false,
  },
};
