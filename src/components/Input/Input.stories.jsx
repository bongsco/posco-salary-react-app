import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

export default {
  title: 'UI/Input',
  component: Input,
  argTypes: {
    mode: { control: { type: 'select', options: ['primary', 'error', 'ok'] } },
    fontWeight: { control: { type: 'range', min: 100, max: 900, step: 100 } },
    placeholder: { control: 'text' },
    label: 'text',
  },
};

function Template({ mode, fontWeight, placeholder, label, onFocus, onBlur }) {
  return (
    <Input
      mode={mode}
      fontWeight={fontWeight}
      placeholder={placeholder}
      label={label}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}

export const Default = Template.bind({});
Default.args = {
  mode: 'primary',
  fontWeight: 400,
  placeholder: '플레이스 홀더 PlaceHolder',
  label: '',
};

export const Error = Template.bind({});
Error.args = {
  mode: 'error',
  fontWeight: 400,
  placeholder: '플레이스 홀더 PlaceHolder',
  label: '여기에 입력 오류와 관련된 메시지를 입력해 주세요.',
};

export const Ok = Template.bind({});
Ok.args = {
  mode: 'ok',
  fontWeight: 400,
  placeholder: '플레이스 홀더 PlaceHolder',
  label: '여기에 메시지를 입력해 주세요.',
};

Template.defaultProps = {
  mode: 'primary',
  fontWeight: 400,
  placeholder: '플레이스 홀더 PlaceHolder',
  label: null,
  onFocus: undefined,
  onBlur: undefined,
};

Template.propTypes = {
  mode: PropTypes.oneOf(['primary', 'error', 'ok']),
  fontWeight: PropTypes.oneOf([100, 200, 300, 400, 500, 600, 700, 800, 900]),
  placeholder: PropTypes.string,
  label: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};
