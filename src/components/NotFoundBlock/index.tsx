import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>🥹</span>
        <h1>Ничего не найдено </h1>
      </h1>
      <p className={styles.description}>К сожалению данная страница не найдена</p>
    </div>
  );
};

export default NotFoundBlock;
