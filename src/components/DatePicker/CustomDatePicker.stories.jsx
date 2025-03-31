import PropTypes from 'prop-types';
// import { fn } from '@storybook/test';
import { useState } from 'react';
import CustomDatePicker from './CustomDatePicker';

export default {
  title: 'UI/Form/Inputs/CustomDatePicker',
  component: CustomDatePicker,
  tags: ['autodocs'],
  argTypes: {
    isDisabled: { control: 'boolean' },
    isSaved: { control: 'boolean' },
    hasError: { control: 'boolean' },
    customWidth: { control: 'text' },
    minWidth: { control: 'text' },
    maxWidth: { control: 'text' },
    message: { control: 'text' },
  },
};

// ✅ props spreading 없이 개별 명시
function Template({
  date,
  isDisabled,
  isSaved,
  hasError,
  customWidth,
  minWidth,
  maxWidth,
  message,
  onChange,
}) {
  return (
    <CustomDatePicker
      isDisabled={isDisabled}
      isSaved={isSaved}
      hasError={hasError}
      customWidth={customWidth}
      minWidth={minWidth}
      maxWidth={maxWidth}
      message={message}
      date={date}
      onChange={onChange}
    />
  );
}

Template.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isSaved: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
  message: PropTypes.string,
  customWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  minWidth: PropTypes.string,
};

Template.defaultProps = {
  message: null,
  customWidth: null,
  maxWidth: null,
  minWidth: null,
};

export function Default() {
  const [date, setDate] = useState(null);
  return (
    <Template
      isDisabled={false}
      isSaved
      hasError={false}
      date={date}
      onChange={setDate}
    />
  );
}

export function SavedState() {
  const [date, setDate] = useState(null);
  return (
    <Template
      isDisabled={false}
      isSaved
      hasError={false}
      date={date}
      onChange={setDate}
    />
  );
}

export function Disabled() {
  const [date, setDate] = useState(null);
  return (
    <Template
      isDisabled
      isSaved
      hasError={false}
      date={date}
      onChange={setDate}
    />
  );
}

export function Error() {
  const [date, setDate] = useState(null);
  return (
    <Template
      isDisabled={false}
      isSaved
      hasError
      message="날짜를 선택해주세요"
      date={date}
      onChange={setDate}
    />
  );
}
