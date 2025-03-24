import { useState } from 'react';
import Switch from './Switch';

export default {
  title: 'UI/Form/Switch',
  component: Switch,
  tags: ['autodocs'],
};

function Template() {
  const [isOn, setIsOn] = useState(true);

  return <Switch isOn={isOn} onClick={() => setIsOn((prev) => !prev)} />;
}

export const Default = Template.bind({});
