import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.less';

const Rocker = (props) => {
  const { state } = props;
  // console.log(state);

  const insideStyle = useMemo(
    () => ({
      top: `${((state.V + 1) / 2) * 100}%`,
      left: `${((state.H + 1) / 2) * 100}%`
    }),
    [state.V, state.H]
  );

  return (
    <div className={styles['rocker-container']}>
      <div className={styles['outside-wrapper']} />
      <div className={styles['inside-wrapper']} style={insideStyle} />
    </div>
  );
};

Rocker.propTypes = {
  state: PropTypes.shape({ H: PropTypes.number, V: PropTypes.number })
};

Rocker.defaultProps = {
  state: { V: 0, H: 0 }
};

export default React.memo(Rocker);
