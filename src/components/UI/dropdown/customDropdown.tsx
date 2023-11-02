import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import styles from './customDropdown.module.scss';

interface CustomDropdownProps {
  value: number | null;
  options: { label: string; value: number }[];
  onChange: (e: { value: number | null }) => void;
  disabled: boolean;
  placeholder: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  value,
  options,
  onChange,
  disabled,
  placeholder,
}) => {
  return (
    <Dropdown
      value={value}
      options={options}
      onChange={(e) => onChange({ value: e.value as number })}
      disabled={disabled}
      placeholder={placeholder}
      className={styles.customDropdown}
    />
  );
};

export default CustomDropdown;
