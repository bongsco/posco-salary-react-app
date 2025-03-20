import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

export default {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    mode: { control: { type: 'select', options: ['default', 'error', 'ok'] } },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'text' },
    customWidth: { control: 'text' },
    customHeight: { control: 'text' },
    onChange: { action: 'changed' },
  },
};

function InputStory({
  id,
  mode,
  placeholder,
  label,
  value,
  customWidth,
  customHeight,
  onChange,
}) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (newValue) => {
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Input
      id={id}
      mode={mode}
      placeholder={placeholder}
      label={label}
      value={inputValue}
      customWidth={customWidth}
      customHeight={customHeight}
      onChange={handleChange}
    />
  );
}

InputStory.propTypes = {
  id: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(['default', 'error', 'ok']).isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  customWidth: PropTypes.string.isRequired,
  customHeight: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export function Default({
  id,
  mode,
  placeholder,
  label,
  value,
  customWidth,
  customHeight,
  onChange,
}) {
  return (
    <InputStory
      id={id}
      mode={mode}
      placeholder={placeholder}
      label={label}
      value={value}
      customWidth={customWidth}
      customHeight={customHeight}
      onChange={onChange}
    />
  );
}
Default.args = {
  id: 'default-input',
  mode: 'default',
  placeholder: '플레이스 홀더 PlaceHolder',
  label: '여기에 입력 관련 메시지를 입력하세요.',
  value: '',
  customWidth: '225px',
  customHeight: '30px',
};
Default.propTypes = InputStory.propTypes;

export function Error({
  id,
  mode,
  placeholder,
  label,
  value,
  customWidth,
  customHeight,
  onChange,
}) {
  return (
    <InputStory
      id={id}
      mode={mode}
      placeholder={placeholder}
      label={label}
      value={value}
      customWidth={customWidth}
      customHeight={customHeight}
      onChange={onChange}
    />
  );
}
Error.args = {
  id: 'error-input',
  mode: 'error',
  placeholder: '플레이스 홀더 PlaceHolder',
  label: '여기에 입력 오류와 관련된 메시지를 입력해 주세요.',
  value: '',
  customWidth: '225px',
  customHeight: '30px',
};
Error.propTypes = InputStory.propTypes;

export function Ok({
  id,
  mode,
  placeholder,
  label,
  value,
  customWidth,
  customHeight,
  onChange,
}) {
  return (
    <InputStory
      id={id}
      mode={mode}
      placeholder={placeholder}
      label={label}
      value={value}
      customWidth={customWidth}
      customHeight={customHeight}
      onChange={onChange}
    />
  );
}
Ok.args = {
  id: 'ok-input',
  mode: 'ok',
  placeholder: '플레이스 홀더 PlaceHolder',
  label: '여기에 메시지를 입력해 주세요.',
  value: '',
  customWidth: '225px',
  customHeight: '30px',
};
Ok.propTypes = InputStory.propTypes;
