import { useState } from 'react';
import Switch from './Switch';

export default {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    currentOn: { control: 'boolean' },
  },
};

function Template() {
  const [current, setCurrent] = useState(false);
  return (
    <Switch currentOn={current} onChanged={() => setCurrent((prev) => !prev)} />
  );
}

export const Default = Template.bind();
