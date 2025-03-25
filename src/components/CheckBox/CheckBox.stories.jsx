import { useState } from 'react';
import CheckBox from './CheckBox';

export default {
  title: 'UI/Form/CheckBox',
  component: CheckBox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
  },
};

function Template() {
  const [isChecked, setIsChecked] = useState(true);
  return (
    <CheckBox
      isChecked={isChecked}
      onClick={() => {
        setIsChecked((prev) => {
          return !prev;
        });
      }}
    />
  );
}

export const Default = Template.bind();
