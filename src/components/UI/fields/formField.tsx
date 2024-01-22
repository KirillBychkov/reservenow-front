import React from 'react';
import styles from './formField.module.scss';

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
        <span className='heading heading-6'>{label}</span>
        {!isValid && (
          <span className='paragraph paragraph--normal paragraph-error'>
            {invalidMessage}
          </span>
        )}
      </div>
      {children}
    </label>
  );
};

export default FormField;
