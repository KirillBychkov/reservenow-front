import { Paragraph } from '@/components/UI/typography/typography';
import React from 'react';
import styles from './input.module.scss';

interface FormFieldProps {
  label?: string;
  isValid?: boolean;
  invalidMessage?: string;
  children?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  isValid,
  invalidMessage,
  children,
}) => {
  return (
    <label>
      <div className={styles.label}>
        <Paragraph size='small'>{label}</Paragraph>
        {!isValid && (
          <Paragraph textColor='error' size='small'>
            {invalidMessage}
          </Paragraph>
        )}
      </div>
      {children}
    </label>
  );
};

export default FormField;
