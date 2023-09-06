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
        <span className='paragraph paragraph=small'>{label}</span>
        {!isValid && (
          <span className='paragraph paragraph=small paragraph-error'>
            {invalidMessage}
          </span>
        )}
      </div>
      {children}
    </label>
  );
};

export default FormField;
