import classNames from 'classnames';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IDayStats, TRootState } from '../../../store/reducer';
import { actionSetDayIndex } from '../../../store/stats/reducer';
import { dateToString } from '../../../utils/dateToString';
import { getMondayDate } from '../../../utils/getMondayDate';
import { getWeekDates } from '../../../utils/getWeekDates';
import { secondsToStr } from '../../../utils/secondsToStr';
import styles from './infographic.module.css';

interface IColumn {
  percentage: number;
  totalTime: number;
}

const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const timeRatios = [
  0.25 * 60,
  0.5 * 60,
  1 * 60,
  2 * 60,
  5 * 60,
  10 * 60,
  15 * 60,
  30 * 60,
  60 * 60,
  120 * 60,
  360 * 60,
];

export function Infographic() {
  const dispatch = useDispatch();

  const statsData = useSelector<TRootState, IDayStats[]>((state) => {
    if (state?.statsData === undefined) return [];
    return state?.statsData;
  });

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

  const [mondayDate, setMondayDate] = useState<Date>(getMondayDate(weekIndex));

  const [weekDates, setWeekDates] = useState<Date[]>(getWeekDates(mondayDate));

  const [maxTime, setMaxTime] = useState<number>(0);
  const [linesCount, setLinesCount] = useState<number>(4);
  const [columns, setColumns] = useState<IColumn[]>([]);

  const [timeRatio, setTimeRatio] = useState<number>(timeRatios[0]);

  useEffect(() => {
    setMondayDate(getMondayDate(weekIndex));
  }, [weekIndex]);

  useEffect(() => {
    setWeekDates(getWeekDates(mondayDate));
  }, [mondayDate]);

  function getLinesCount(time: number, ratio: number): number {
    return Math.ceil(time / ratio);
  }

  function getRoundedTime(time: number, ratio: number): number {
    return Math.ceil(time / ratio) * ratio;
  }

  const getTimeRatio = useCallback((time: number): number => {
    let ratioIndex = 0;
    let ratio = timeRatios[ratioIndex];

    while (getLinesCount(time, ratio) > 10 && ratioIndex < timeRatios.length) {
      ratio = timeRatios[ratioIndex++];
    }

    while (getLinesCount(time, ratio) < 4 && ratioIndex > 0) {
      ratio = timeRatios[ratioIndex--];
    }

    return ratio;
  }, []);

  useEffect(() => {
    let maxTime = 15;

    
    for (const date of weekDates) {
      for (const dayData of statsData) {
        if (dayData.date === dateToString(date)) {
          if (dayData.totalTime !== undefined && dayData.totalTime > maxTime) {
            maxTime = dayData.totalTime;
          }
        }
      }
    }

    let timeRatio = getTimeRatio(maxTime);
    maxTime = getRoundedTime(maxTime, timeRatio);
    setMaxTime(maxTime);

    setColumns(
      weekDates.map((date): IColumn => {
        for (const dayData of statsData) {
          if (dayData.date === dateToString(date)) {
            const totalTime = dayData.totalTime || 0;
            const percentage =
              maxTime > 0 ? Math.round((totalTime / maxTime) * 100) : 0;
            return { totalTime, percentage };
          }
        }
        return { percentage: 0, totalTime: 0 };
      })
    );
  }, [statsData, weekDates, getTimeRatio]);

  useEffect(() => {
    const newTimeRatio = getTimeRatio(maxTime);
    const newMaxTime = getRoundedTime(maxTime, newTimeRatio);
    const newLinesCount = getLinesCount(newMaxTime, newTimeRatio);

    setTimeRatio(newTimeRatio);
    setMaxTime(newMaxTime);
    setLinesCount(newLinesCount);
    
  }, [maxTime, timeRatio, getTimeRatio]);

  function setDayIndex(dayIndex: number): void {
    dispatch(actionSetDayIndex(dayIndex));
  }

  const renderLines = useCallback((): ReactNode[] => {
    const lines: ReactNode[] = [];
    let i = 0;

    for (; i < linesCount; i++) {
      lines.push(
        <div className={styles.lineWrapper} key={i}>
          <span className={styles.line}></span>
          <span className={styles.lineTitle}>
            {secondsToStr(maxTime - i * timeRatio, 's', 'short')}
          </span>
        </div>
      );
    }

    lines.push(<div className={styles.lineWrapper} key={i++}></div>);

    return lines;
  }, [maxTime, timeRatio, linesCount]);

  return (
    <div className={styles.root}>
      <div className={styles.body}>
        <div className={styles.linesContainer}>{renderLines()}</div>

        <div className={styles.columns}>
          {columns.map((day, index) => (
            <div className={styles.column} key={dayNames[index]}>
              <div
                className={classNames(
                  styles.columnValue,
                  index === (dayIndex > 0 ? dayIndex - 1 : 6) &&
                    styles.columnValue_active,
                  day.percentage === 0 && styles.columnValue_zero
                )}
                style={{
                  height: day.percentage > 0 ? `${day.percentage}%` : '',
                }}
                onClick={() => {
                  setDayIndex(index < 6 ? index + 1 : 0);
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.columns}>
          {columns.map((day, index) => (
            <div
              className={classNames(
                styles.column,
                index === (dayIndex > 0 ? dayIndex - 1 : 6) &&
                  styles.column_active
              )}
              key={dayNames[index]}
            >
              {dayNames[index]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
