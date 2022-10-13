import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionAddTodo } from '../../../store/todos/reducer';
import styles from './todoform.module.css';

export function TodoForm() {
  const [todoName, setTodoName] = useState('');
  const dispatch = useDispatch();

  function addTodo(name: string) {
    if (!name.length) return;

    dispatch(
      actionAddTodo({
        id: Math.random().toString().substr(2, 9),
        name,
        count: 1,
        done: 0,
      })
    );
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTodoName(e.currentTarget.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    addTodo(todoName);
    setTodoName('');
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <input
        className={`${styles.input} input`}
        type="text"
        placeholder="Название задачи"
        value={todoName}
        onChange={handleChange}
      />

      <button className={`${styles.button} button`}>Добавить</button>
    </form>
  );
}
