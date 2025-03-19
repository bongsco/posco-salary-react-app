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
    initialMin: 10,
    initialMax: 90,
    minLowerBound: 0,
    maxUpperBound: 100,
    step: 1,
  },
};
