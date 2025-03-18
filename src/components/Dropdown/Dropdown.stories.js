import { fn } from '@storybook/test';
import Dropdown from './Dropdown';

export default {
  title: 'UI/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
};

export const Default = {
  args: {
    options: [
      '오름차순',
      '내림차순',
      '작업중',
      '작업전',
      '완료',
      '정기연봉조정',
      'BaseUp',
      '승진자연봉조정',
      '김종하',
      '김현아',
      '김서영',
      '이은재',
      '한상진',
    ],
    error: false,
    initialIndex: 0,
    placeHolder: 'Dropdown 메뉴',
  },
};
