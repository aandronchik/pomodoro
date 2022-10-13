import React, { useEffect, useState } from 'react';
import styles from './todolist.module.css';
import { TodoItem } from './TodoItem';
import { secondsToStr } from '../../../utils/secondsToStr';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDispatch, useSelector } from 'react-redux';
import { ITodo, TRootState } from '../../../store/reducer';
import { actionSwapTodos } from '../../../store/todos/reducer';
import { useTransition, animated } from 'react-spring';
import { ETimerModes } from '../../Timer';

const TIME = 25 * 60;

export function TodoList() {
  const todos = useSelector<TRootState, ITodo[]>((state) => {
    if (!state?.todos) return [];

    const todos = state.todos.filter((todo) => {
      return todo.done < todo.count;
    });

    return todos;
  });

  const mode = useSelector<TRootState, ETimerModes>((state) => {
    if (state?.timer?.mode === undefined) return ETimerModes.work;
    return state.timer.mode;
  });

  const time = useSelector<TRootState, number>((state) => {
    if (state?.timer?.time === undefined) return 0;
    return state.timer.time;
  });

  const [diff, setDiff] = useState<number>(
    mode === ETimerModes.work ? time - TIME : 0
  );
  const dispatch = useDispatch();

  const [summaryCount, setSummaryCount] = useState(
    todos.reduce((summaryCount: number, todo: ITodo): number => {
      return summaryCount + todo.count - todo.done;
    }, 0)
  );
  const [summaryTime, setSummaryTime] = useState(summaryCount > 0 ? summaryCount * TIME + diff : 0);
  const [summaryTimeStr, setSummaryTimeStr] = useState(
    secondsToStr(summaryCount > 0 ? summaryCount * TIME + diff : 0)
  );

  useEffect(() => {
    setDiff(mode === ETimerModes.work ? time - TIME : 0);
  }, [time, mode]);

  useEffect(() => {
    setSummaryCount(
      todos.reduce((summaryCount: number, todo: ITodo): number => {
        return summaryCount + todo.count - todo.done;
      }, 0)
    );
  }, [todos]);

  useEffect(() => {    
    const summaryTime = summaryCount > 0 ? summaryCount * TIME + diff : 0;

    setSummaryTime(summaryTime);
    setSummaryTimeStr(secondsToStr(summaryTime, 's', 'normal'));
  }, [diff, summaryCount]);
 
  const sensor = [
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0,
      },
    }),
  ];

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (active.id !== over?.id) {
      const leftIndex = todos.findIndex((todo) => todo.id === active.id);
      const rightIndex = todos.findIndex((todo) => todo.id === over?.id);
      dispatch(actionSwapTodos(leftIndex, rightIndex));
    }
  }

  const transition = useTransition(todos, {
    initial: { x: 0, opacity: 1 },
    from: { x: 200, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 200, opacity: 0 },
  });

  return (
    <>
      <DndContext
        sensors={sensor}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <ul className={styles.list}>
          <SortableContext
            items={todos.map((todo) => todo.id)}
            strategy={verticalListSortingStrategy}
          >
            {transition((style, todo) =>
              todo ? (
                <animated.li style={style} className="item">
                  <TodoItem key={todo.id} todo={todo} />
                </animated.li>
              ) : (
                ''
              )
            )}
          </SortableContext>
        </ul>
      </DndContext>

      {summaryTime > 0 && (
        <span className={styles.total}>{summaryTimeStr}</span>
      )}
    </>
  );
}
