import React, { useEffect, useRef } from 'react';
import styles from './dropdown.module.css';
import { DropdownModal } from './DropdownModal';

interface IDropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const NOOP = () => {};

export function Dropdown({
  button,
  children,
  isOpen = false,
  onOpen = NOOP,
  onClose = NOOP,
}: IDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);
  
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);
  const [width, setWidth] = React.useState(0);

  const ref = useRef<HTMLDivElement>(null);

  function setModalAttributes(ref: React.RefObject<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    setLeft(rect.left + window.scrollX);
    setTop(rect.top + rect.height + window.scrollY);
    setWidth(rect.width);
  }

  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    
    if (!isDropdownOpen) {
      setModalAttributes(ref);
    }

    setIsDropdownOpen(!isDropdownOpen);
  };

  
  useEffect(() => {
    if (!isDropdownOpen) return;
    
    function handleResize() {
      setModalAttributes(ref);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isDropdownOpen]);

  return (
    <div className={styles.container}>
      <div onClick={handleOpen} ref={ref}>
        {button}
      </div>
      {isDropdownOpen && (
        <DropdownModal
          children={children}
          onClose={() => {
            setIsDropdownOpen(false);
          }}
          setIsDropdownOpen={setIsDropdownOpen}
          left={left}
          top={top}
          width={width}
          buttonRef={ref}
        />
      )}
    </div>
  );
}
