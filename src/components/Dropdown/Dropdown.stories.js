import Dropdown from './Dropdown';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
};

export const Default = {
  args: {
    options: ['정기연봉조정', 'BaseUp', '승진자연봉조정'], // options 배열 전달
    error: false,
    currentValue: null,
    placeHolder: 'Dropdown 메뉴',
    onChanged: () => {},
  },
};

export const WithErrorNoMessage = {
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
    ],
    error: true,
    currentValue: null,
    placeHolder: 'Dropdown 메뉴',
    onChanged: () => {},
  },
};

export const WithMessageNoError = {
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
    ],
    error: false,
    message: '안내 메시지',
    currentValue: null,
    placeHolder: 'Dropdown 메뉴',
    onChanged: () => {},
  },
};

export const WithMessageAndError = {
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
    ],
    error: true,
    message: '오류 메시지',
    currentValue: null,
    placeHolder: 'Dropdown 메뉴',
    onChanged: () => {},
  },
};
