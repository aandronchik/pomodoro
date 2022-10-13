import { ActionCreator, Reducer } from 'redux';
import { EModes } from '../Header/ThemesSwitcher';
import { ETimerModes, ETimerStatuses } from '../Pomodoro/Timer';
import { loadState } from '../utils/localstorage';
import {
  statsReducer,
  STATS_SET_DAY_INDEX,
  STATS_SET_WEEK_INDEX,
  TSetDayIndex,
  TSetWeekIndex,
} from './stats/reducer';
import {
  statsDataReducer,
  STATS_DATA_PAUSE_TIME_INCREMENT,
  STATS_DATA_POMODOROS_INCREMENT,
  STATS_DATA_PRODUCTIVE_TIME_INCREMENT,
  STATS_DATA_STOPS_INCREMENT,
  STATS_DATA_TOTAL_TIME_INCREMENT,
  TIncrementPauseTime,
  TIncrementPomodoros,
  TIncrementProductiveTime,
  TIncrementStops,
  TIncrementTotalTime,
} from './statsData/reducer';
import {
  timerReducer,
  TIMER_SET_COUNT,
  TIMER_SET_MODE,
  TIMER_SET_STATUS,
  TIMER_SET_TIME,
  TIMER_SET_WORKING_TIME,
  TSetTimerCount,
  TSetTimerMode,
  TSetTimerStatus,
  TSetTimerTime,
  TSetTimerWorkingTime,
} from './timer/reducer';
import {
  TAddTodoAction,
  TDecrementTodoAction,
  TDeleteTodoAction,
  TIncrementTodoAction,
  todosReducer,
  TODOS_SWAP,
  TODO_ADD,
  TODO_DECREMENT,
  TODO_DELETE,
  TODO_INCREMENT,
  TODO_PROGRESS,
  TODO_RENAME,
  TProgressTodoAction,
  TRenameTodoAction,
  TSwapTodosAction,
} from './todos/reducer';

export interface ITodo {
  id: string;
  name: string;
  count: number;
  done: number;
}

export interface ITimer {
  mode?: ETimerModes;
  status?: ETimerStatuses;
  time?: number;
  workingTime?: number;
  count?: number
}

export interface IStats {
  dayIndex?: number;
  weekIndex?: number;
}

export interface IDayStats {
  date?: string;
  totalTime?: number;
  productiveTime?: number;
  pauseTime?: number;
  pomodoros?: number;
  stops?: number;
}

export type TRootState = {
  todos?: ITodo[];
  stats?: IStats;
  statsData?: IDayStats[];
  timer?: ITimer;
  themeMode?: EModes;
};

const initialState: TRootState = loadState();

// SAVE THEME
const THEME_SAVE = 'THEME_SAVE';

type TSaveThemeAction = {
  type: typeof THEME_SAVE;
  themeMode: EModes;
};

export const actionSaveThemeMode: ActionCreator<TSaveThemeAction> = (
  themeMode
) => ({
  type: THEME_SAVE,
  themeMode,
});

type TMyActions =
  | TSaveThemeAction
  | TAddTodoAction
  | TIncrementTodoAction
  | TDecrementTodoAction
  | TProgressTodoAction
  | TRenameTodoAction
  | TDeleteTodoAction
  | TSwapTodosAction
  | TSetTimerMode
  | TSetTimerStatus
  | TSetTimerTime
  | TSetTimerWorkingTime
  | TSetTimerCount
  | TIncrementTotalTime
  | TIncrementProductiveTime
  | TIncrementPauseTime
  | TIncrementStops
  | TIncrementPomodoros
  | TSetDayIndex
  | TSetWeekIndex;

export const rootReducer: Reducer<TRootState, TMyActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case THEME_SAVE:
      return { ...state, themeMode: action.themeMode };

    case TODO_ADD:
    case TODO_INCREMENT:
    case TODO_DECREMENT:
    case TODO_PROGRESS:
    case TODO_RENAME:
    case TODO_DELETE:
    case TODOS_SWAP:
      return {
        ...state,
        todos: todosReducer(state?.todos, action),
      };

    case TIMER_SET_MODE:
    case TIMER_SET_STATUS:
    case TIMER_SET_TIME:
    case TIMER_SET_WORKING_TIME:
    case TIMER_SET_COUNT:
      return {
        ...state,
        timer: timerReducer(state?.timer, action),
      };

    case STATS_DATA_TOTAL_TIME_INCREMENT:
    case STATS_DATA_PRODUCTIVE_TIME_INCREMENT:
    case STATS_DATA_PAUSE_TIME_INCREMENT:
    case STATS_DATA_STOPS_INCREMENT:
    case STATS_DATA_POMODOROS_INCREMENT:
      return {
        ...state,
        statsData: statsDataReducer(state?.statsData, action),
      };

    case STATS_SET_WEEK_INDEX:
    case STATS_SET_DAY_INDEX:
      return {
        ...state,
        stats: statsReducer(state?.stats, action),
      };

    default:
      return state;
  }
};
