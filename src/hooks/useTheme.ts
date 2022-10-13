import { useLayoutEffect } from 'react';

export interface ITheme {
  [name: string]: string;
}

export function useTheme(theme: ITheme): void {
  useLayoutEffect((): void => {
    for (const key in theme) {
      document.documentElement.style.setProperty(`--${key}`, theme[key]);
    }
  }, [theme]);
}
