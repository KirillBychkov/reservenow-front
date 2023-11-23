import React from 'react';
import { Dropdown, DropdownProps } from 'primereact/dropdown';
import styles from './customDropdown.module.scss';
import classNames from 'classnames';

const CustomDropdown: React.FC<DropdownProps> = (props) => {
  return (
    <Dropdown
      {...props}
      className={classNames(styles.customDropdown, props.className)}
    />
  );
};

export default CustomDropdown;
