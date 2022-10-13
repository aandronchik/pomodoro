import React from 'react';
import { Unit } from './Unit'; 
import styles from './units.module.css';

interface IUnitsProps {
  units: number[];
}

export function Units({ units }: IUnitsProps) {  
  return (
    <div className={styles.root}>
      <span className={`${styles.unit} ${styles.unit_1}`}>
        <Unit unit={units[0]} />
      </span>

      <span className={`${styles.unit} ${styles.unit_2}`}>
        <Unit unit={units[1]} />
      </span>
      
      <span className={`${styles.unit} ${styles.unit_separator}`}>
      :
      </span>
      <span className={`${styles.unit} ${styles.unit_3}`}>
        <Unit unit={units[2]} />
      </span>

      <span className={`${styles.unit} ${styles.unit_4}`}>
        <Unit unit={units[3]} />
      </span>
    </div>
  );
}
