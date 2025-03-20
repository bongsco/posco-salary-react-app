import { useEffect, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import PropTypes from 'prop-types';
import styles from './slider.module.css';

export default function CustomSlider({
  initialMin,
  initialMax,
  minLowerBound,
  maxUpperBound,
  step,
  onChange,
}) {
  const [min, setMin] = useState(initialMin);
  const [max, setMax] = useState(initialMax);

  useEffect(() => {
    setMin(initialMin);
    setMax(initialMax);
  }, [initialMin, initialMax]);

  const handleSliderChange = (value) => {
    onChange(value[0], value[1]);
    setMin(() => value[0]);
    setMax(() => value[1]);
  };

  return (
    <div className={`${styles.slider_container}`}>
      <div className={`${styles.slider_value}`}>{min}</div>
      <RangeSlider
        min={minLowerBound}
        max={maxUpperBound}
        step={step}
        value={[min, max]}
        onInput={(value) => handleSliderChange(value)}
        rangeSlideDisabled
      />
      <div className={`${styles.slider_value}`}>{max}</div>
    </div>
  );
}

CustomSlider.propTypes = {
  initialMin: PropTypes.number.isRequired,
  initialMax: PropTypes.number.isRequired,
  minLowerBound: PropTypes.number.isRequired,
  maxUpperBound: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
