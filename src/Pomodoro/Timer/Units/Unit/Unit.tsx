import React from 'react';
import styles from './unit.module.css';
import { useTransition, animated } from 'react-spring';

interface IUnitProps {
  unit: number;
}

export function Unit({ unit }: IUnitProps) {
  const transitions = useTransition(unit, {
    initial: { y: 0 },
    from: { y: -200 },
    enter: { y: 0 },
    leave: { y: 200 },
  });

  return transitions((animatedStyles, unit) => {
    return (
      <animated.span style={animatedStyles} className={styles.root}>
        {unit}
      </animated.span>
    );
  });
}
