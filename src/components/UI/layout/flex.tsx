import React from 'react';
import styles from './flex.module.scss';
import classNames from 'classnames';

interface FlexProps {
  children: React.ReactNode;
  options?: {
    gap?: number;
    direction?: 'column';
    justify?: 'center' | 'space-between' | 'flex-end';
    align?: 'center' | 'space-between';
  };
  className?: string;
}

const Flex: React.FC<FlexProps> = ({ children, options, className }) => {
  return (
    <div
      className={classNames(styles.flex, className, {
        [styles['flex--column']]: options?.direction === 'column',
        [styles['flex--justify-center']]: options?.justify === 'center',
        [styles['flex--justify-space-between']]:
          options?.justify === 'space-between',
        [styles['flex--justify-flex-end']]: options?.justify === 'flex-end',
        [styles['flex--align-center']]: options?.align === 'center',
        [styles['flex--align-space-between']]:
          options?.align === 'space-between',
      })}
      style={{ gap: `${options?.gap}rem` }}
    >
      {children}
    </div>
  );
};

export default Flex;
