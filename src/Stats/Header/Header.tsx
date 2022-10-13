import React, { useEffect, useRef, useState } from 'react';
import styles from './header.module.css';
import { ReactComponent as IconArrow } from './iconArrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from '../../store/reducer';
import { actionSetWeek } from '../../store/stats/reducer';

const weeks: string[] = ['Эта неделя', 'Прошедная неделя', 'Две недели назад'];

export function Header() {
  const dispatch = useDispatch();
  const [isSelectVisible, setIsSelectVisible] = useState(false);
  const ref = useRef<HTMLUListElement>(null);

  const weekIndex = useSelector<TRootState, number>((state) => {
    if (state?.stats?.weekIndex === undefined) return 0;
    return state.stats.weekIndex;
  });

  function setWeekIndex(index: number) {    
    dispatch(actionSetWeek(index));
  }

  function handleClick(event: MouseEvent) {
    if (event.target instanceof Node && ref.current && !ref.current.contains(event.target))
      setIsSelectVisible(false);
  }

  useEffect(() => {
    if (!isSelectVisible) return;

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isSelectVisible]);

  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>Ваша активность</h2>

      <div className={styles.select}>
        <button
          className={styles.selectButton + ' ' + styles.selectButton_open}
          onClick={() => {
            setIsSelectVisible((isSelectVisible) => !isSelectVisible);
          }}
        >
          {weeks[weekIndex]} <IconArrow className={styles.selectIcon} />
        </button>

        {isSelectVisible && (
          <ul className={styles.selectList} ref={ref}>
            {weeks.map(
              (week, index) =>
                index !== weekIndex && (
                  <li className={styles.selectLi} key={index}>
                    <button
                      className={styles.selectOption}
                      onClick={() => {
                        setWeekIndex(index);
                      }}
                    >
                      {week}
                    </button>
                  </li>
                )
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
