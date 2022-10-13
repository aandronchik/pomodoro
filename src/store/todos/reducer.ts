import { arrayMove } from '@dnd-kit/sortable';
import { Reducer } from 'react';
import { ActionCreator } from 'redux';
import { ITodo } from '../reducer';

// ADD TODO
export const TODO_ADD = 'TODO_ADD';

export type TAddTodoAction = {
  type: typeof TODO_ADD;
  todo: ITodo; 
};
  
export const actionAddTodo: ActionCreator<TAddTodoAction> = (todo) => ({
  type: TODO_ADD,
  todo,
});

// INCREMENT TODO
export const TODO_INCREMENT = 'TODO_INCREMENT';

export type TIncrementTodoAction = {
  type: typeof TODO_INCREMENT;
  id: string;
};

export const actionIncrementTodo: ActionCreator<TIncrementTodoAction> = (
  id
) => ({
  type: TODO_INCREMENT,
  id,
});

// DECREMENT TODO
export const TODO_DECREMENT = 'TODO_DECREMENT';

export type TDecrementTodoAction = {
  type: typeof TODO_DECREMENT;
  id: string;
};

export const actionDecrementTodo: ActionCreator<TDecrementTodoAction> = (
  id
) => ({
  type: TODO_DECREMENT,
  id,
});

// PROGRESS TODO
export const TODO_PROGRESS = 'TODO_PROGRESS';

export type TProgressTodoAction = {
  type: typeof TODO_PROGRESS;
  id: string;
};

export const actionProgressTodo: ActionCreator<TProgressTodoAction> = (
  id
) => ({
  type: TODO_PROGRESS,
  id,
});

// RENAME TODO
export const TODO_RENAME = 'TODO_RENAME';

export type TRenameTodoAction = {
  type: typeof TODO_RENAME;
  id: string;
  name: string;
};

export const actionRenameTodo: ActionCreator<TRenameTodoAction> = (
  id,
  name
) => ({
  type: TODO_RENAME,
  id,
  name,
});

// DELETE TODO
export const TODO_DELETE = 'TODO_DELETE';

export type TDeleteTodoAction = {
  type: typeof TODO_DELETE;
  id: string;
};

export const actionDeleteTodo: ActionCreator<TDeleteTodoAction> = (id) => ({
  type: TODO_DELETE,
  id,
});

// SWAP TODOS
export const TODOS_SWAP = 'TODOS_SWAP';

export type TSwapTodosAction = {
  type: typeof TODOS_SWAP;
  leftIndex: number;
  rightIndex: number;
};

export const actionSwapTodos: ActionCreator<TSwapTodosAction> = (leftIndex, rightIndex) => ({
  type: TODOS_SWAP,
  leftIndex,
  rightIndex,
});

type TTodosActions =
  | TAddTodoAction
  | TIncrementTodoAction
  | TDecrementTodoAction
  | TProgressTodoAction
  | TRenameTodoAction
  | TDeleteTodoAction
  | TSwapTodosAction
  ;

export const todosReducer: Reducer<ITodo[] | undefined, TTodosActions> = (
  state = [],
  action
) => {
  switch (action.type) {
    case TODO_ADD:
      return [...state, action.todo];

    case TODO_INCREMENT:
      return state.map((todo) => {
        if (todo.id === action.id) {
          todo.count++;
        }

        return todo;
      });

    case TODO_DECREMENT:
      return state.map((todo) => {
        if (todo.id === action.id) {
          todo.count--;
        }

        return todo;
      });

      case TODO_PROGRESS:
      return state.map((todo) => {
        if (todo.id === action.id) {
          todo.done++;
        }

        return todo;
      });

    case TODO_RENAME:
      return state.map((todo) => {
        if (todo.id === action.id) {
          todo.name = action.name;
        }

        return todo;
      });

    case TODO_DELETE:
      return state.filter((todo) => todo.id !== action.id);

    case TODOS_SWAP:
      return arrayMove(state, action.leftIndex, action.rightIndex);

    default: 
      return state;
  }
};
