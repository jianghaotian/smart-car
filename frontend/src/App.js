import React from 'react';
import styles from './App.module.less';
import StatusBar from '@/components/StatusBar';
import Rocker from '@/components/Rocker';

const App = () => {
  return (
    <div className={styles['smart-car-container']}>
      <header className={styles['smart-car-header']}>
        <StatusBar />
      </header>
      <section className={styles['smart-car-section']}>
        <div className={styles['left-rocker-container']}>
          <Rocker />
        </div>
        <div className={styles['right-rocker-container']}>
          <Rocker />
        </div>
      </section>
    </div>
  );
};

export default App;
