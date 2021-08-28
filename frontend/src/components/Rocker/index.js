import React from 'react';
import styles from './index.module.less';

const StatusBar = () => {
  return (
    <div className={styles['rocker-container']}>
      <div className={styles['outside-wrapper']} />
      <div className={styles['inside-wrapper']} />
    </div>
  );
};

export default StatusBar;
