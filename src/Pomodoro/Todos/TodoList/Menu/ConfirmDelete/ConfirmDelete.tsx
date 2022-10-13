import classNames from 'classnames';
import React from 'react';
import styles from './confirmdelete.module.css';
import { ReactComponent as IconCloser } from './iconCloser.svg';

interface IConfirmDeleteProps {
  deleteTodo: () => void;
  setIsConfirmOpen: (value: boolean) => void;
}

export function ConfirmDelete({
  deleteTodo,
  setIsConfirmOpen,
}: IConfirmDeleteProps) {
  function confirm(value: boolean): void {
    setIsConfirmOpen(false);

    if (value) deleteTodo();
  }

  return (
    <div className={styles.root}>
      <span className={styles.closer}>
        <IconCloser className={styles.closerIcon} onClick={() => confirm(false)} />
      </span>

      <span className={styles.heading}>Удалить задачу?</span>
      <button
        className={classNames('button', styles.button, styles.button_orange)}
        onClick={() => confirm(true)}
      >
        Удалить
      </button>

      <button
        className={classNames('button-link', styles.link)}
        onClick={() => confirm(false)}
      >
        Отменить
      </button>
    </div>
  );
}
