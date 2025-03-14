import State from './State';

export default {
  title: 'Components/State',
  component: State,
};

export const Complete = {
  args: {
    status: '완료',
  },
};

export const Working = {
  args: {
    status: '작업중',
  },
};

export const Warning = {
  args: {
    status: '조치필요',
  },
};
