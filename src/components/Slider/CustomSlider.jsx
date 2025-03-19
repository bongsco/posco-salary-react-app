import { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import PropTypes from 'prop-types';
import styles from './slider.module.css';

export default function CustomSlider({
  defaultRange,
  min,
  max,
  step,
  onChange,
}) {
  const [range, setRange] = useState(defaultRange);
  const handleSliderChange = (value) => {
    onChange(value);
    setRange(value);
  };

  return (
    <div className={`${styles.slider_container}`}>
      <div className={`${styles.slider_value}`}>{range[0]}</div>
      <RangeSlider
        min={min}
        max={max}
        step={step}
        value={range}
        onInput={(value) => handleSliderChange(value)}
        rangeSlideDisabled
      />
      <div className={`${styles.slider_value}`}>{range[1]}</div>
    </div>
  );
}

CustomSlider.propTypes = {
  defaultRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
