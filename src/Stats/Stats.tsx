import React from 'react';
import { Header } from './Header';
import { Layout } from './Layout';
import styles from './stats.module.css';

export function Stats() {
  return (
    <>
      <div className={styles.header}>
        <Header />
      </div>

      <Layout />
    </>
  );
}
