import React from 'react';
import { Todos } from './Todos';
import styles from './pomodoro.module.css';
import { Timer } from './Timer';

export function Pomodoro() {
  return (
    <div className={styles.root}>
      <div className={styles.todos}>
        <Todos />
      </div>
      <div className={styles.timer}>
        <Timer />
      </div>
    </div>
  );
}
