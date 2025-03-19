import { fn } from '@storybook/test';

import Category from './Category';
import { icons } from '#components/SideBar/Icon';

export default {
  title: 'Layout/SideBar/Category',
  component: Category,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpenInitially: { control: 'boolean' },
    icon: {
      control: {
        type: 'select',
      },
      options: Object.keys(icons),
    },
    subItems: { control: { type: 'object' } },
  },
  args: {
    onClick: fn(),
    subItems: [
      {
        text: '서브아이템1',
        href: '/category/sub/1',
        isActive: true,
      },
      {
        text: '서브아이템2',
        href: '/category/sub/2',
        isActive: false,
      },
      {
        text: '서브아이템3',
        href: '/category/sub/3',
        isActive: false,
      },
      {
        text: '서브아이템4',
        href: '/category/sub/4',
        isActive: false,
      },
    ],
  },
};

export const Open = {
  args: {
    icon: 'home',
    text: 'Caption Here',
    isOpenInitially: true,
  },
};

export const Closed = {
  args: {
    icon: 'home',
    text: 'Caption Here',
    isOpenInitially: false,
  },
};
