import { useState } from 'react';
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
    customWidth: { control: 'number' },
    customHeight: { control: 'number' },
    onChange: { action: 'changed' },
    value: { control: 'text' },
  },
  args: {
    id: 'input',
    value: 'value 초기값',
    customWidth: 225,
    customHeight: 30,
    placeholder: 'Placeholder 플레이스홀더',
  },
};

function Template({
  value: initialValue,
  onChange,
  id,
  mode,
  placeholder,
  label,
  customWidth,
  customHeight,
}) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e);
  };

  return (
    <Input
      id={id}
      mode={mode}
      placeholder={placeholder}
      label={label}
      customWidth={customWidth}
      customHeight={customHeight}
      value={value}
      onChange={handleChange}
    />
  );
}

Template.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  mode: PropTypes.oneOf(['default', 'error', 'ok']),
  placeholder: PropTypes.string,
  label: PropTypes.string,
  customWidth: PropTypes.number,
  customHeight: PropTypes.number,
};

Template.defaultProps = {
  placeholder: '',
  label: '',
  id: '',
  mode: 'default',
  customWidth: 225,
  customHeight: 30,
};

export const Default = Template.bind({});
Default.args = {
  mode: 'default',
  label: '여기에 입력 관련 메시지를 입력하세요.',
};

export const Error = Template.bind({});
Error.args = {
  mode: 'error',
  label: '여기에 입력 관련 메시지를 입력하세요.',
};

export const Ok = Template.bind({});
Ok.args = {
  mode: 'ok',
  label: '여기에 입력 관련 메시지를 입력하세요.',
};
