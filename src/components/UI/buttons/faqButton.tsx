import React from 'react';
import styles from './faqButton.module.scss';
import { Help } from '@blueprintjs/icons';
import { Button } from 'primereact/button';
interface FAQButtonProps {
  onClick: () => void;
}

const FAQButton: React.FC<FAQButtonProps> = ({ onClick }) => {
  return (
    <>
      <button className={styles.faqButton} onClick={onClick}>
        <Help />
        FAQ
      </button>
      {/* <Button
        label='FAQ'
        className={styles.faqButton}
        icon={<Help />}
        onClick={onClick}
      /> */}
    </>
  );
};

export default FAQButton;
