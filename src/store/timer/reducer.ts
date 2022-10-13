import { ActionCreator, Reducer } from 'redux';
import { ETimerModes, ETimerStatuses } from '../../Pomodoro/Timer';
import { ITimer } from '../reducer';

// SET MODE
export const TIMER_SET_MODE = 'TIMER_SET_MODE';

export type TSetTimerMode = {
  type: typeof TIMER_SET_MODE;
  mode: ETimerModes;
};

export const actionSetTimerMode: ActionCreator<TSetTimerMode> = (mode) => ({
  type: TIMER_SET_MODE,
  mode,
});

// SET STATUS
export const TIMER_SET_STATUS = 'TIMER_SET_STATUS';

export type TSetTimerStatus = {
  type: typeof TIMER_SET_STATUS;
  status: ETimerStatuses;
};

export const actionSetTimerStatus: ActionCreator<TSetTimerStatus> = (status) => ({
  type: TIMER_SET_STATUS,
  status,
});

// SET TIME
export const TIMER_SET_TIME = 'TIMER_SET_TIME';

export type TSetTimerTime = {
  type: typeof TIMER_SET_TIME;
  time: number;
};

export const actionSetTimerTime: ActionCreator<TSetTimerTime> = (time) => ({
  type: TIMER_SET_TIME,
  time,
});

// SET WORKING TIME
export const TIMER_SET_WORKING_TIME = 'TIMER_SET_WORKING_TIME';

export type TSetTimerWorkingTime = {
  type: typeof TIMER_SET_WORKING_TIME;
  workingTime: number;
};

export const actionSetTimerWorkingTime: ActionCreator<TSetTimerWorkingTime> = (workingTime) => ({
  type: TIMER_SET_WORKING_TIME,
  workingTime,
});

// SET COUNT
export const TIMER_SET_COUNT = 'TIMER_SET_COUNT';

export type TSetTimerCount = {
  type: typeof TIMER_SET_COUNT;
  count: number;
};

export const actionSetTimerCount: ActionCreator<TSetTimerCount> = (count) => ({
  type: TIMER_SET_COUNT,
  count,
});

type TTimerActions = TSetTimerMode | TSetTimerStatus | TSetTimerTime | TSetTimerWorkingTime | TSetTimerCount;

export const timerReducer: Reducer<ITimer | undefined, TTimerActions> = (
  state,
  action
) => {  
  switch (action.type) {
    case TIMER_SET_MODE:
      return {
        ...state,
        mode: action.mode,
      };

      case TIMER_SET_STATUS:
      return {
        ...state,
        status: action.status,
      };
      
      case TIMER_SET_TIME:
      return {
        ...state,
        time: action.time,
      };

      case TIMER_SET_WORKING_TIME:
      return {
        ...state,
        workingTime: action.workingTime,
      };

      case TIMER_SET_COUNT:
      return {
        ...state,
        count: action.count,
      };

    default:
      return state;
  }
};
