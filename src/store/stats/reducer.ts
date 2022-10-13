import { ActionCreator, Reducer } from 'redux';
import { IStats } from '../reducer';
 
// SET WEEK INDEX
export const STATS_SET_WEEK_INDEX = 'STATS_SET_WEEK_INDEX';

export type TSetWeekIndex = {
  type: typeof STATS_SET_WEEK_INDEX;
  weekIndex: number;
};

export const actionSetWeek: ActionCreator<TSetWeekIndex> = (weekIndex) => ({
  type: STATS_SET_WEEK_INDEX,
  weekIndex,
});

// SET DAY INDEX
export const STATS_SET_DAY_INDEX = 'STATS_SET_DAY_INDEX';

export type TSetDayIndex = {
  type: typeof STATS_SET_DAY_INDEX;
  dayIndex: number; 
};

export const actionSetDayIndex: ActionCreator<TSetDayIndex> = (dayIndex) => ({
  type: STATS_SET_DAY_INDEX,
  dayIndex,
});

export type TStatsActions = TSetWeekIndex | TSetDayIndex;

export const statsReducer: Reducer<IStats | undefined, TStatsActions> = (
  state,
  action
) => {
  switch (action.type) {
    case STATS_SET_WEEK_INDEX:
      return { ...state, weekIndex: action.weekIndex };

    case STATS_SET_DAY_INDEX:
      return { ...state, dayIndex: action.dayIndex };

    default:
      return state;
  }
};
