import React from "react";
import styles from './styles.module.scss'

type Bar = {
  progress: number
}

type BarProps = {
  bar: Bar
}

export function ProgressBar({ bar }: BarProps) {

    const completed = bar.progress
  
    return (
      <div className={styles.containerStyles}>
        <div className={styles.fillerStyles} style={{width: `${completed}%`}}>
          <span className={styles.labelStyles}>{`${completed}%`}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;