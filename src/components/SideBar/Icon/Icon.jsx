import React from 'react';

import PropTypes from 'prop-types';
import styles from './icon.module.css';
import CardIconSvg from './icons/CardIconSvg';
import HomeIconSvg from './icons/HomeIconSvg';
import PersonIconSvg from './icons/PersonIconSvg';
import GearIconSvg from './icons/GearIconSvg';

export const icons = {
  home: <HomeIconSvg />,
  person: <PersonIconSvg />,
  card: <CardIconSvg />,
  gear: <GearIconSvg />,
};

function Icon({ icon }) {
  return <div className={styles['icon-container']}>{icons[icon]}</div>;
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
