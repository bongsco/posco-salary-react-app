import State from './State';

export default {
  title: 'UI/State',
  component: State,
};

export const Complete = {
  args: {
    status: 'complete',
    text: '완료',
  },
};

export const Working = {
  args: {
    status: 'working',
    text: '진행중',
  },
};

export const Warning = {
  args: {
    status: 'warning',
    text: '조치 필요',
  },
};
