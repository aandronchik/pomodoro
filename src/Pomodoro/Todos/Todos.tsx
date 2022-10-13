import React from 'react';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import styles from './todos.module.css';

export function Todos() {  

  return (
    <div className={styles.root}>
      <h1 className={styles.heading}>Ура! Теперь можно начать работать:</h1>

      <ul className={styles.descriptionList}>
        <li className={styles.descriptionLi}>
          Выберите категорию и напишите название текущей задачи
        </li>
        <li className={styles.descriptionLi}>Запустите таймер («помидор»)</li>
        <li className={styles.descriptionLi}>
          Работайте пока «помидор» не прозвонит
        </li>
        <li className={styles.descriptionLi}>
          Сделайте короткий перерыв (3-5 минут)
        </li>
        <li className={styles.descriptionLi}>
          Продолжайте работать «помидор» за «помидором», пока задача не будут
          выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).
        </li>
      </ul>

      <div className={styles.todosForm}>
        <TodoForm />
      </div>

      <div className={styles.todosLlist}>
        <TodoList/>
      </div>
    </div>
  );
}
