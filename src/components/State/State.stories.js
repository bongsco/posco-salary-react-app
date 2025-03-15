import State from './State';

export default {
  title: 'Components/State',
  component: State,
};

export const Complete = {
  args: {
    status: 'complete',
  },
};

export const Working = {
  args: {
    status: 'working',
  },
};

export const Warning = {
  args: {
    status: 'warning',
  },
};
