import React, { useEffect, useState } from 'react';
import styles from './themesswitcher.module.css';
import { ReactComponent as IconSun } from './iconSun.svg';
import { ReactComponent as IconMoon } from './iconMoon.svg';
import { ITheme, useTheme } from '../../hooks/useTheme';
import { useDispatch, useSelector } from 'react-redux';
import { actionSaveThemeMode, TRootState } from '../../store/reducer';

interface IThemes {
  light: ITheme;
  dark: ITheme;
}

const themes: IThemes = {
  light: {
    'gray-20-inv': 'hsl(0deg, 0%, 20%)',
    'gray-60-inv': 'hsl(0deg, 0%, 60%)',
    'gray-77-inv': 'hsl(0deg, 0%, 77%)',
    'gray-90-inv': 'hsl(0deg, 0%, 90%)',
    'gray-96-inv': 'hsl(0deg, 0%, 96%)',
    'font-main-inv': 'var(--gray-33)',
    'font-light-inv': 'var(--gray-99)',
    'bg-main-inv': 'white',
  },
  dark: {
    'gray-20-inv': 'hsl(0deg, 0%, calc(100% - 20%))',
    'gray-60-inv': 'hsl(0deg, 0%, calc(100% - 60%))',
    'gray-77-inv': 'hsl(0deg, 0%, calc(100% - 77%))',
    'gray-90-inv': 'hsl(0deg, 0%, calc(18%))',
    'gray-96-inv': 'hsl(0deg, 0%, calc(100% - 96%))',
    'font-main-inv': 'white',
    'font-light-inv': 'var(--gray-99)',
    'bg-main-inv': 'var(--gray-15)',
  },
};

export enum EModes {
  light = 'light',
  dark = 'dark',
}

export function ThemesSwitcher() {
  const dispatch = useDispatch();
  const themeMode =
    useSelector<TRootState, EModes>((state) => state?.themeMode || EModes.light);
  const [theme, setTheme] = useState<ITheme>(themes[themeMode]);

  useEffect(() => {
    setTheme(themes[themeMode]);
  }, [themeMode]);

  useTheme(theme);

  function handleClick() {
    dispatch(actionSaveThemeMode(themeMode === EModes.light ? EModes.dark : EModes.light));
  }
 
  return (
    <button
      className={styles.root}
      onClick={handleClick}
    >
      <IconSun width="15px" height="15px" /> 
      <IconMoon width="12px" height="12px" />
      <span
        className={`${styles.switcher} ${
          themeMode === 'dark' ? styles.switcher_dark : ''
        }`}
      />
    </button>
  );
}

