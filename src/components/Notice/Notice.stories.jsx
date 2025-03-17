import Notice from './Notice';

export default {
  title: 'UI/Notice',
  component: Notice,
  argTypes: {
    title: { control: 'text' },
    message: { control: 'text' },
    onClose: { action: 'closed' },
  },
};

export const Default = {
  args: {
    title: '오류가 발생했습니다.',
    message: '오류 메시지를 여기에 작성해주세요.',
  },
};
