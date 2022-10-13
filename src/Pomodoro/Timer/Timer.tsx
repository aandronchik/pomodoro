import React, { useCallback, useEffect } from 'react';
import styles from './timer.module.css';
import { ReactComponent as IconPlus } from './iconPlus.svg';
import { ReactComponent as IconMinus } from './iconMinus.svg';
import useInterval from '../../hooks/useInterval';
import { secondsToTimeUnits } from '../../utils/secondsToTimeUnits';
import { Units } from './Units';
import { useDispatch, useSelector } from 'react-redux';
import { ITodo, TRootState } from '../../store/reducer';
import {
  actionDeleteTodo,
  actionProgressTodo,
} from '../../store/todos/reducer';
import classNames from 'classnames';
import {
  actionSetTimerCount,
  actionSetTimerMode,
  actionSetTimerStatus,
  actionSetTimerTime,
  actionSetTimerWorkingTime,
} from '../../store/timer/reducer';
import {
  actionIncrementPauseTime,
  actionIncrementPomodoros,
  actionIncrementProductiveTime,
  actionIncrementStops,
  actionIncrementTotalTime,
} from '../../store/statsData/reducer';
import { dateToString } from '../../utils/dateToString';
import { sendNotification } from '../../utils/sendNotification';

export enum ETimerModes {
  work = 'work',
  rest = 'rest',
}

export enum ETimerStatuses {
  initial = 'initial',
  inProgress = 'inProgress',
  paused = 'paused',
}

export function Timer() {
  const dispatch = useDispatch();

  function getTodoActualIndex(todos: ITodo[]): number {
    let todoIndex: number = -1;

    for (let i = 0; todoIndex === -1 && i <= todos.length; i++) {
      const count = todos[i]?.count || 0;
      const done = todos[i]?.done || 0;
      if (count > done) todoIndex = i;
    }

    return todoIndex;
  }

  const todos = useSelector<TRootState, ITodo[]>((state) => state?.todos || []);

  const todoIndex = getTodoActualIndex(todos);

  const todoId = useSelector<TRootState, string>((state) => {
    if (state?.todos === undefined) return '';
    return state?.todos[todoIndex]?.id;
  });

  const todoName = useSelector<TRootState, string>((state) => {
    if (state?.todos === undefined) return '';
    return state.todos[todoIndex]?.name;
  });

  const todoCount = useSelector<TRootState, number>((state) => {
    if (state?.todos === undefined) return 0;
    return state.todos[todoIndex]?.count;
  });

  const todoDone = useSelector<TRootState, number>((state) => {
    if (!state?.todos) return 0;
    return state.todos[todoIndex]?.done;
  });

  const timerCount = useSelector<TRootState, number>((state) => {
    if (!state?.timer?.count) return 0;
    return state.timer.count;
  });

  const INITIAL_WORK_TIME = 25 * 60;
  const INITIAL_REST_TIME = timerCount < 3 ? 5 * 60 : 20 * 60;

  const status = useSelector<TRootState, ETimerStatuses>((state) => {
    if (!state?.timer?.status) return ETimerStatuses.initial;
    return state.timer.status;
  });

  const mode = useSelector<TRootState, ETimerModes>((state) => {
    if (state?.timer?.mode === undefined) return ETimerModes.work;
    return state.timer.mode;
  });

  const time = useSelector<TRootState, number>((state) => {
    if (state?.timer?.time === undefined)
      return mode === ETimerModes.work ? INITIAL_WORK_TIME : INITIAL_REST_TIME;
    return state.timer.time;
  });

  const workingTime = useSelector<TRootState, number>((state) => {
    if (state?.timer?.workingTime === undefined) return 0;
    return state.timer.workingTime;
  });

  function incrementTimer() {
    if (time < 3600) {
      if (time + 300 <= 3600) {
        dispatch(actionSetTimerTime(time + 300));
      } else {
        dispatch(actionSetTimerTime(3600));
      }
    }
  }

  function decrementTimer() {
    if (time - 300 > 0) {
      dispatch(actionSetTimerTime(time - 300));
    }
  }

  function startTimer() {
    dispatch(actionSetTimerStatus(ETimerStatuses.inProgress));
  }

  function resumeTimer() {
    dispatch(actionSetTimerStatus(ETimerStatuses.inProgress));
  }

  function pauseTimer() {
    dispatch(actionSetTimerStatus(ETimerStatuses.paused));
  }

  function stopTimer() {
    dispatch(actionSetTimerTime(INITIAL_WORK_TIME));
    dispatch(actionSetTimerWorkingTime(0));
    dispatch(actionSetTimerStatus(ETimerStatuses.initial));
    dispatch(actionSetTimerMode(ETimerModes.work));

    if (mode === ETimerModes.work) {
      dispatch(actionIncrementStops(dateToString(new Date())));
    }
  }

  function skipTimer() {
    dispatch(actionSetTimerStatus(ETimerStatuses.initial));

    dispatch(
      actionSetTimerMode(
        mode === ETimerModes.work ? ETimerModes.rest : ETimerModes.work
      )
    );

    dispatch(
      actionSetTimerTime(
        mode === ETimerModes.work ? INITIAL_REST_TIME : INITIAL_WORK_TIME
      )
    );

    if (mode === ETimerModes.rest) {
      dispatch(actionSetTimerCount(timerCount < 3 ? timerCount + 1 : 0));
    }
  }

  function handleOnDone() {
    countPomodoro();

    dispatch(
      actionSetTimerTime(
        mode === ETimerModes.work ? INITIAL_REST_TIME : INITIAL_WORK_TIME
      )
    );

    dispatch(actionSetTimerWorkingTime(0));

    dispatch(
      actionSetTimerMode(
        mode === ETimerModes.work ? ETimerModes.rest : ETimerModes.work
      )
    );

    dispatch(actionSetTimerStatus(ETimerStatuses.initial));
  }

  const countPomodoro = useCallback(() => {
    if (todoIndex !== -1 && todoDone < todoCount - 1) {
      dispatch(actionProgressTodo(todoId));
    } else if (todoIndex !== -1 && todoDone === todoCount - 1) {
      dispatch(actionDeleteTodo(todoId));
    }

    dispatch(actionIncrementPomodoros(dateToString(new Date())));
    dispatch(
      actionIncrementProductiveTime(dateToString(new Date()), workingTime)
    );
  }, [dispatch, todoIndex, todoId, todoCount, todoDone, workingTime]);

  useInterval(
    () => {
      if (mode === ETimerModes.work) {
        dispatch(actionIncrementTotalTime(dateToString(new Date()), 1));
        dispatch(actionSetTimerWorkingTime(workingTime + 1));
      }

      dispatch(actionSetTimerTime(time - 1));
    },
    status === ETimerStatuses.inProgress ? 1000 : null
  );

  useInterval(
    () => {
      dispatch(actionIncrementPauseTime(dateToString(new Date()), 1));
    },
    status === ETimerStatuses.paused && mode === ETimerModes.work ? 1000 : null
  );

  useEffect(() => {
    if (time === 0) {
      dispatch(actionSetTimerWorkingTime(0));

      dispatch(
        actionSetTimerTime(
          mode === ETimerModes.work ? INITIAL_REST_TIME : INITIAL_WORK_TIME
        )
      );

      dispatch(
        actionSetTimerMode(
          mode === ETimerModes.work ? ETimerModes.rest : ETimerModes.work
        )
      );

      dispatch(actionSetTimerStatus(ETimerStatuses.initial));

      if (mode === ETimerModes.work) {
        countPomodoro();
      }

      if (mode === ETimerModes.rest) {
        dispatch(actionSetTimerCount(timerCount < 3 ? timerCount + 1 : 0));
      }

      sendNotification('Таймер остановлен', {
        body: `Пора ${mode === ETimerModes.work ? 'отдохнуть' : 'поработать'}`,
      });
    }
  }, [
    time,
    dispatch,
    countPomodoro,
    timerCount,
    mode,
    INITIAL_WORK_TIME,
    INITIAL_REST_TIME,
  ]);

  return (
    <div className={styles.timer}>
      <div
        className={classNames(
          styles.header,
          mode === ETimerModes.work ? styles.header_work : styles.header_rest
        )}
      >
        <span className={styles.heading}>
          {mode === ETimerModes.work
            ? todoIndex >= 0
              ? `${todoName}`
              : 'Работа'
            : 'Отдых'}
        </span>

        <span className={styles.number}>
          {mode === ETimerModes.work
            ? todoIndex >= 0
              ? `Помидор ${todoDone + 1}/${todoCount}`
              : ''
            : ''}
        </span>
      </div>

      <div className={styles.body}>
        <div
          className={classNames(
            styles.clock,
            status !== ETimerStatuses.paused &&
              mode === ETimerModes.work &&
              styles.clock_work,
            status !== ETimerStatuses.paused &&
              mode === ETimerModes.rest &&
              styles.clock_rest
          )}
        >
          <Units units={secondsToTimeUnits(time)} />

          <button
            className={styles.minus}
            onClick={decrementTimer}
            title="Убавить на 5 мин"
          >
            <IconMinus />
          </button>
          <button
            className={styles.plus}
            onClick={incrementTimer}
            title="Добавить 5 мин"
          >
            <IconPlus />
          </button>
        </div>

        {mode === ETimerModes.work ? (
          todoIndex >= 0 ? (
            <p className={styles.text}>
              <span className={styles.light}>Задача {todoIndex + 1} — </span>
              {todoName}
            </p>
          ) : (
            <p className={styles.text}>
              <span className={styles.light}>Работа</span>
            </p>
          )
        ) : (
          <p className={styles.text}>
            <span className={styles.light}>Отдых</span>
          </p>
        )}

        <div className={styles.actions}>
          {/* Left buttons */}
          {status === ETimerStatuses.initial && (
            <button
              className={classNames('button', styles.button)}
              onClick={startTimer}
            >
              Старт
            </button>
          )}

          {status === ETimerStatuses.inProgress && (
            <button
              className={classNames('button', styles.button)}
              onClick={pauseTimer}
            >
              Пауза
            </button>
          )}

          {status === ETimerStatuses.paused && (
            <button
              className={classNames('button', styles.button)}
              onClick={resumeTimer}
            >
              Продолжить
            </button>
          )}

          {/* Right Buttons */}
          {/* Work mode */}
          {mode === ETimerModes.work && status !== ETimerStatuses.paused && (
            <button
              className={classNames(
                'button',
                styles.button,
                styles.button_orange,

                status === ETimerStatuses.initial && styles.button_passive
              )}
              onClick={stopTimer}
            >
              Стоп
            </button>
          )}

          {mode === ETimerModes.work && status === ETimerStatuses.paused && (
            <button
              className={classNames(
                'button',
                styles.button,
                styles.button_orange
              )}
              onClick={handleOnDone}
            >
              Сделано
            </button>
          )}

          {/* Rest mode */}
          {mode === ETimerModes.rest && (
            <button
              className={classNames(
                'button',
                styles.button,
                styles.button_orange
              )}
              onClick={skipTimer}
            >
              Пропустить
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
