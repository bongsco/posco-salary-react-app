import { useState } from 'react';
import CustomSlider from './CustomSlider';

export default {
  title: 'UI/CustomSlider',
  component: CustomSlider,
  tags: ['autodocs'],
};

function Template() {
  const [min, setMin] = useState(10);
  const [max, setMax] = useState(90);

  return (
    <CustomSlider
      min={min}
      max={max}
      minLowerBound={0}
      maxUpperBound={200}
      step={1}
      onChange={(lower, upper) => {
        setMin(lower);
        setMax(upper);
      }}
    />
  );
}

export const Default = Template.bind();
