import React from 'react';
import { Banner, EBannerBgs } from './Banner';
import { Daily } from './Daily';
import { Infographic } from './Infographic';
import styles from './layout.module.css';
import { Pomodoros } from './Pomodoros';
import { ReactComponent as IconFocus } from './iconFocus.svg';
import { ReactComponent as IconClock } from './iconClock.svg';
import { ReactComponent as IconStop } from './iconStop.svg';
import { IDayStats, TRootState } from '../../store/reducer';
import { useSelector } from 'react-redux';
import { secondsToStr } from '../../utils/secondsToStr';
import { dateToString } from '../../utils/dateToString';
import { getStatsValue } from '../../utils/getStatsValue';

export function Layout() {
  const weekIndex = useSelector<TRootState, number>((state) => {
    if (state?.stats?.weekIndex === undefined) return 0;
    return state.stats.weekIndex;
  });

  const dayIndex = useSelector<TRootState, number>((state) => {
    if (state?.stats?.dayIndex === undefined) {
      return new Date().getDay();
    }
    return state.stats.dayIndex;
  });

  function getDate(weekIndex: number, dayIndex: number): string {
    const d = new Date();
    const date = d.getDate();
    const day = d.getDay();

    const dayDiff = dayIndex - day + (day === 0 ? -7 : 0);
    const weekDiff = - (dayIndex === 0 ? weekIndex - 1: weekIndex) * 7;    
    
    return dateToString(new Date(d.setDate(date + dayDiff + weekDiff)));
  }

  const date = getDate(weekIndex, dayIndex);  

  const statsData = useSelector<TRootState, IDayStats[]>((state) => {
    if (state?.statsData === undefined) return [];
    return state?.statsData;
  });

  const pomodoros: number = getStatsValue(statsData, date, 'pomodoros') || 0;
  const totalTime: number = getStatsValue(statsData, date, 'totalTime') || 0;
  const pauseTime: number = getStatsValue(statsData, date, 'pauseTime') || 0;
  const productiveTime: number =
    getStatsValue(statsData, date, 'productiveTime') || 0;
  const day: number = new Date(date).getDay();
  
  const stops: number = getStatsValue(statsData, date, 'stops') || 0;
  const focus: number =
    totalTime > 0 ? Math.floor((productiveTime / totalTime) * 100) : 0;

  return (
    <div className={styles.root}>
      <div className={`${styles.daily} ${styles.gridItem}`}>
        <Daily day={day} totalTime={totalTime} />
      </div>

      <div className={`${styles.infographic} ${styles.gridItem}`}>
        <Infographic />
      </div>

      <div className={`${styles.pomodoros} ${styles.gridItem}`}>
        <Pomodoros count={pomodoros} />
      </div>

      <div className={`${styles.banner} ${styles.gridItem}`}>
        <Banner
          title={'Фокус'}
          icon={<IconFocus />}
          text={`${focus}%`}
          bg={EBannerBgs.yellow}
        />
      </div>

      <div className={`${styles.banner} ${styles.gridItem}`}>
        <Banner
          title={'Время на паузе'}
          icon={<IconClock />}
          text={secondsToStr(pauseTime, 's', 'short')}
          bg={EBannerBgs.purple}
        />
      </div>

      <div className={`${styles.banner} ${styles.gridItem}`}>
        <Banner
          title={'Остановки'}
          icon={<IconStop />}
          text={`${stops}`}
          bg={EBannerBgs.blue}
        />
      </div>
    </div>
  );
}
