import { useState } from 'react';
import CheckBox from './CheckBox';

export default function Test() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <CheckBox
      checked={isChecked}
      onClick={() => setIsChecked((prev) => !prev)}
    />
  );
}
