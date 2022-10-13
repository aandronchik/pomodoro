import React, { useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './shadowmodal.module.css';

interface IShadowModalProps {
  setIsConfirmOpen: (value: boolean) => void;
  children: React.ReactNode;
}

export function ShadowModal({ setIsConfirmOpen, children }: IShadowModalProps) {
  const node = useMemo(() => document.createElement('div'), []);
  const ref = useRef<HTMLDivElement>(null);

  function handleClick(event: React.SyntheticEvent<HTMLDivElement>) {
    event.stopPropagation();
    if (!ref.current) return null;
    if (event.target instanceof Node && !ref.current.contains(event.target))
      setIsConfirmOpen(false);
  }

  useEffect(() => {
    document.body.append(node);

    return () => {
      node.remove();
    };
  }, [node]);

  if (!node) return null;

  return ReactDOM.createPortal(
    <div className={styles.root} onClick={handleClick}>
      <div className={styles.wrapper} ref={ref}>
        {children}
      </div>
    </div>,
    node
  );
}
