import { fn } from '@storybook/test';

import SubMenu from './SubMenu';

export default {
  title: 'Layout/SideBar/Category/SubMenu',
  component: SubMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isActive: { control: 'boolean' },
    subItems: { control: 'object' },
  },
  args: { onClick: fn() },
};

export const Primary = {
  args: {
    subItems: [
      {
        text: '옵션1',
        href: '/href/1',
        isActive: true,
      },
      {
        text: 'Option2',
        href: '/href/2',
        isActive: false,
      },
      {
        text: '옵션3',
        href: '/href/3',
        isActive: false,
      },
      {
        text: '옵션4',
        href: '/href/4',
        isActive: false,
      },
    ],
  },
};
