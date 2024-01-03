import styles from './selectButton.module.scss';
import {
  SelectButton as PrSelectButton,
  SelectButtonProps,
} from 'primereact/selectbutton';
import React from 'react';

interface Props extends SelectButtonProps {}

const SelectButton: React.FC<Props> = (props) => {
  return (
    <PrSelectButton
      {...props}
      pt={{
        button: {
          className: styles.button,
        },
        root: {
          className: styles.root,
        },
      }}
    />
  );
};

export default SelectButton;
