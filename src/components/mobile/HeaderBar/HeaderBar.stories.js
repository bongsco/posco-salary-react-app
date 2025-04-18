import { fn } from '@storybook/test';
import HeaderBar from '#src/components/mobile/HeaderBar/HeaderBar';

export default {
  title: 'Layout/Mobile/HeaderBar',
  component: HeaderBar,
  tags: ['autodocs'],
  args: {
    onBackwardButtonClick: fn(),
  },
};

export const Primary = {};
