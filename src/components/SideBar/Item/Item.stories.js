import { fn } from '@storybook/test';

import Item from './Item';
import { icons } from '#components/SideBar/Icon';

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
