import React from 'react';
import styles from './flex.module.scss';
import classNames from 'classnames';

interface FlexProps {
  children: React.ReactNode;
  options?: {
    direction?: 'column';
    justify?: 'center' | 'space-between';
    align?: 'center' | 'space-between';
  };
}

const Flex: React.FC<FlexProps> = ({ children, options }) => {
  return (
    <div
      className={classNames(styles.flex, {
        [styles['flex--column']]: options?.direction === 'column',
        [styles['flex--justify-center']]: options?.justify === 'center',
        [styles['flex--justify-space-between']]:
          options?.justify === 'space-between',
        [styles['flex--align-center']]: options?.align === 'center',
        [styles['flex--align-space-between']]:
          options?.align === 'space-between',
      })}
    >
      {children}
    </div>
  );
};

export default Flex;
