import classNames from 'classnames';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './banner.module.css';

export enum EBannerBgs {
  yellow = 'yellow',
  purple = 'purple',
  blue = 'blue',
}

interface IBannerProps {
  title: string;
  icon: ReactNode;
  text: string;
  bg: EBannerBgs;
}

export function Banner({ title, icon, text, bg }: IBannerProps) {
  const classes = classNames(styles.root, styles[`root_${bg}`]);

  const bannerTextRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<number>(64);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setFontSize(64);
    
    function step() {
      if (!bannerTextRef.current) return;

      if (bannerTextRef.current.offsetHeight > 76) {
        setFontSize((fontSize) => fontSize - 10);
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }, [isReady, text]);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setIsReady(true);
    });
  }, []);

  return (
    <div className={classes}>
      <div className={styles.textContent}>
        <span className={styles.heading}>{title}</span>
        <span
          className={styles.text}
          style={{ fontSize: `${fontSize}px` }}
          ref={bannerTextRef}
        >
          {text}
        </span>
      </div>

      <div className={styles.iconWrapper}>
        <span className={styles.icon}>{icon}</span>
      </div>
    </div>
  );
}
