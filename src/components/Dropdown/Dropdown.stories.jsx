import { fn } from '@storybook/test';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';

export default {
  title: 'UI/Form/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'array' },
    error: { control: 'boolean' },
    message: { control: 'text' },
    placeHolder: { control: 'text' },
    customWidth: { control: 'number' },
  },
  args: {
    onChange: fn(),
    message: '',
    customWidth: 200,
  },
};

function Template({
  options,
  error,
  placeHolder,
  message,
  onChange,
  customWidth,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <Dropdown
      options={options}
      error={error}
      placeHolder={placeHolder}
      message={message}
      selectedValue={selectedValue}
      isOpen={isOpen}
      onChange={(newValue) => {
        setIsOpen((prev) => !prev);
        setSelectedValue(newValue);
        onChange(newValue);
      }}
      onClick={() => setIsOpen((prev) => !prev)}
      customWidth={customWidth}
    />
  );
}

Template.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  error: PropTypes.bool.isRequired,
  placeHolder: PropTypes.string.isRequired,
  message: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  customWidth: PropTypes.number,
};

Template.defaultProps = {
  message: '',
  customWidth: 200,
};

export const Default = Template.bind();
Default.args = {
  options: [
    '오름차순',
    '내림차순',
    '작업중',
    '작업전',
    '완료',
    '정기연봉조정',
    'BaseUp',
    '승진자연봉조정',
    '김종하',
    '김현아',
    '김서영',
    '이은재',
    '한상진',
  ],
  error: false,
  placeHolder: 'Dropdown 메뉴',
  message: '메시지입니다.',
};
