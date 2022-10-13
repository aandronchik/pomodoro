import React from 'react';
import { getFullDayName } from '../../../utils/getFullDayname';
import { secondsToStr } from '../../../utils/secondsToStr';
import styles from './daily.module.css';

interface IDailyProps {
  day: number;
  totalTime: number;
}

export function Daily({ day, totalTime }: IDailyProps) {
  return (
    <div className={styles.root}>
      <h3 className={styles.heading}>{getFullDayName(day)}</h3>

      <p className={styles.text}>
        Вы работали над задачами в течение{' '}
        <strong className={styles.strong}>
          {secondsToStr(totalTime, 's', 'full', true)}
        </strong>
      </p>
    </div>
  );
}
