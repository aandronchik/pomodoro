import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './dropdownmodal.module.css';

interface IDropDownModalProps {
  children: React.ReactNode;
  setIsDropdownOpen: (value: boolean) => void;
  onClose?: () => void;
  left: number;
  top: number;
  width: number;
  buttonRef: React.RefObject<HTMLDivElement>;
}

export function DropdownModal({
  children,
  setIsDropdownOpen,
  onClose = () => null,
  left,
  top,
  width,
  buttonRef,
}: IDropDownModalProps) {
  const node = document.querySelector('#dropdownModal_root');
  const ref = useRef<HTMLDivElement>(null);

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;

    if (target.closest('button')?.dataset.notCloser) {
      return;
    } else {
      setIsDropdownOpen(false);
    }
  }

  useEffect(() => {
    function handleClick(event: MouseEvent) {   
      if (
        event.target instanceof Node && 
        !ref.current?.contains(event.target)
        && !buttonRef.current?.contains(event.target) 
      ) {
        onClose?.();
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [onClose, buttonRef]);

  if (!node) return null;

  return ReactDOM.createPortal(
    <div
      className={styles.container}
      style={{ left: left, top: top, width: width }}
      ref={ref}
    >
      <div className={styles.wrapper} onClick={handleClick}>
        {children}
      </div>
    </div>,
    node
  );
}
