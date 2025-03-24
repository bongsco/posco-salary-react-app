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
  return (
    <div className={`${styles.slider_container}`}>
      <div className={`${styles.slider_value}`}>{initialMin}</div>
      <RangeSlider
        min={minLowerBound}
        max={maxUpperBound}
        step={step}
        value={[initialMin, initialMax]}
        onInput={(value) => onChange(value[0], value[1])}
        rangeSlideDisabled
      />
      <div className={`${styles.slider_value}`}>{initialMax}</div>
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
