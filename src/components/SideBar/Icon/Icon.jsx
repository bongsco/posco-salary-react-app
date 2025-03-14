import React from 'react';

import PropTypes from 'prop-types';
import styles from './icon.module.css';
import CardIconSvg from './icons/CardIconSvg';
import HomeIconSvg from './icons/HomeIconSvg';
import PersonIconSvg from './icons/PersonIconSvg';

function Icon({ icon }) {
  const icons = {
    home: <HomeIconSvg className={styles.icon} />,
    person: <PersonIconSvg className={styles.icon} />,
    card: <CardIconSvg className={styles.icon} />,
  };

  return <div className={styles['icon-container']}>{icons[icon]}</div>;
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
