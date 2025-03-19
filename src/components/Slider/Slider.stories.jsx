import { fn } from '@storybook/test';
import CustomSlider from './CustomSlider';

export default {
  title: 'UI/CustomSlider',
  component: CustomSlider,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
};

export const Default = {
  args: {
    defaultRange: [10, 30],
    min: 0,
    max: 100,
    step: 1,
  },
};
