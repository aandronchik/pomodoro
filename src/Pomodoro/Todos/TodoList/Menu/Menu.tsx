import React, { useState } from 'react';
import styles from './menu.module.css';
import { ReactComponent as IconPlus } from './iconPlus.svg';
import { ReactComponent as IconMinus } from './iconMinus.svg';
import { ReactComponent as IconRedact } from './iconRedact.svg';
import { ReactComponent as IconDelete } from './iconDelete.svg';
import { ShadowModal } from '../../../../ShadowModal';
import { ConfirmDelete } from './ConfirmDelete';

export interface IMenuProps {
  count: number;
  incrementTodo: () => void;
  decrementTodo: () => void;
  editTodo: () => void;
  deleteTodo: () => void;
}

const NOOP = () => null;

export function Menu(props: IMenuProps) {
  const {
    count,
    incrementTodo,
    decrementTodo,
    deleteTodo,
    editTodo = NOOP,
  } = props;

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <ul className={styles.list}>
      <li className={styles.li}>
        <button
          className={styles.liButton}
          onClick={incrementTodo}
          data-not-closer="true"
        >
          <IconPlus className={styles.liIcon} />
          Увеличить
        </button>
      </li>

      <li className={styles.li}>
        <button
          className={
            styles.liButton + ' ' + (count === 1 ? styles.liButton_passive : '')
          }
          onClick={decrementTodo}
          data-not-closer="true"
        >
          <IconMinus className={styles.liIcon} />
          Уменьшить
        </button>
      </li>

      <li className={styles.li}>
        <button className={styles.liButton} onClick={editTodo}>
          <IconRedact className={styles.liIcon} />
          Редактировать
        </button>
      </li>

      <li className={styles.li}>
        <button
          className={styles.liButton}
          onClick={() => setIsConfirmOpen(!isConfirmOpen)}
          data-not-closer="true"
        >
          <IconDelete className={styles.liIcon} />
          Удалить
        </button>
        {isConfirmOpen && (
          <ShadowModal setIsConfirmOpen={setIsConfirmOpen}>
            <ConfirmDelete deleteTodo={deleteTodo} setIsConfirmOpen={setIsConfirmOpen}/>
          </ShadowModal>
        )}
      </li>
    </ul>
  );
}
