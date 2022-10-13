import { IDayStats } from "../store/reducer";

export function getStatsValue<T extends keyof IDayStats>(statsData: IDayStats[], date: string, value: T): IDayStats[T] {
  for (const dayStats of statsData) {
    if (dayStats?.date === date && dayStats?.[value] !== undefined)
      return dayStats?.[value];
  }
}