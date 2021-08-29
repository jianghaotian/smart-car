import React, { useState, useMemo } from 'react';
import styles from './App.module.less';
import StatusBar from '@/components/StatusBar';
import Rocker from '@/components/Rocker';
import { useGamepad, initialGamepadState } from '@/hooks/useGamepad';

const App = () => {
  const [gamepadState, setGamepadState] = useState(initialGamepadState);

  useGamepad((gamepad) => {
    setGamepadState(gamepad);
  });

  const LS = useMemo(() => ({ V: gamepadState.LV, H: gamepadState.LH }), [gamepadState.LV, gamepadState.LH]);
  const RS = useMemo(() => ({ V: gamepadState.RV, H: gamepadState.RH }), [gamepadState.RV, gamepadState.RH]);

  return (
    <div className={styles['smart-car-container']}>
      <header className={styles['smart-car-header']}>
        <StatusBar />
      </header>
      <section className={styles['smart-car-section']}>
        <div className={styles['left-rocker-container']}>
          <Rocker state={LS} />
        </div>
        <div className={styles['right-rocker-container']}>
          <Rocker state={RS} />
        </div>
      </section>
    </div>
  );
};

export default App;
