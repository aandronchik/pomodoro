import React from 'react';
import styles from './pomodoros.module.css';
import { ReactComponent as IconPomodoro } from './iconPomodoro.svg';
import { ReactComponent as IconPomodoroFaced } from './iconPomodoroFaced.svg';
import { pomodorosToStr } from '../../../utils/pomodorosToStr';

interface IPomodorosProps {
  count?: number;
}

export function Pomodoros({ count = 0 }: IPomodorosProps) {
  return (
    <div className={styles.root}>
      {count === 0 ? (
        <IconPomodoroFaced />
      ) : (
        <div className={styles.content}>
          <IconPomodoro /> x {count}
        </div>
      )}

      {count > 0 && (
        <div className={styles.footer}>{pomodorosToStr(count)}</div>
      )}
    </div>
  );
}
