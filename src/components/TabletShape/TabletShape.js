import React from 'react';
import styles from './TabletShape.module.css';

const TabletShape = ({ children }) => {
  return (
    <div className={styles.TabletShape}>
      <div className={styles.screen}>{children}</div>
      <div className={styles.logo}> GoIT </div>
    </div>
  );
};

export default TabletShape;
