import SideBar from './SideBar';

export default {
  title: 'Layout/SideBar',
  component: SideBar,
  tags: ['autodocs'],
};

export const Primary = {
  args: {
    data: [
      {
        elementType: 'item',
        text: '페이지1',
        href: '/page1',
        isActive: true,
        icon: 'home',
      },
      {
        elementType: 'category',
        text: '카테고리1',
        isOpen: false,
        icon: 'card',
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
        ],
      },
      {
        elementType: 'item',
        text: '페이지2',
        href: '/page2',
        isActive: false,
        icon: 'person',
      },
      {
        elementType: 'category',
        text: '카테고리2',
        isOpen: true,
        icon: 'gear',
        subItems: [
          {
            text: '옵션1',
            href: '/href/1',
            isActive: false,
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
    ],
  },
};
