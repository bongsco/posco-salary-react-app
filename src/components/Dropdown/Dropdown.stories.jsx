import { useState } from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';

export default {
  title: 'UI/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
};

function Template({ options, error, placeHolder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <Dropdown
      options={options}
      error={error}
      placeHolder={placeHolder}
      selectedValue={selectedValue}
      isOpen={isOpen}
      onChange={(newValue) => {
        setIsOpen((prev) => !prev);
        setSelectedValue(newValue);
      }}
      onClick={() => setIsOpen((prev) => !prev)}
    />
  );
}

Template.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  error: PropTypes.bool.isRequired,
  placeHolder: PropTypes.string.isRequired,
};

export const Default = Template.bind({});
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
};
