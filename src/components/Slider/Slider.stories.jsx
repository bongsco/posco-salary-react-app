import { useState } from 'react';
import { fn } from '@storybook/test';
import PropTypes from 'prop-types';
import CustomSlider from './CustomSlider';

export default {
  title: 'UI/CustomSlider',
  component: CustomSlider,
  tags: ['autodocs'],
  argTypes: {
    minLowerBound: { control: 'number' },
    maxUpperBound: { control: 'number' },
    step: { control: 'number' },
  },
  args: {
    onChange: fn(),
  },
};

function Template({ minLowerBound, maxUpperBound, step, onChange }) {
  const [min, setMin] = useState(10);
  const [max, setMax] = useState(90);

  return (
    <CustomSlider
      min={min}
      max={max}
      minLowerBound={minLowerBound}
      maxUpperBound={maxUpperBound}
      step={step}
      onChange={(lower, upper) => {
        setMin(lower);
        setMax(upper);
        onChange(lower, upper);
      }}
    />
  );
}

Template.propTypes = {
  minLowerBound: PropTypes.number.isRequired,
  maxUpperBound: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const Default = Template.bind();
Default.args = {
  minLowerBound: 0,
  maxUpperBound: 200,
  step: 1,
};
