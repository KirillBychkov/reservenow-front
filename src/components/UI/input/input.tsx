import { Paragraph } from '@/components/UI/typography/typography';
import React from 'react';
import { InputText as PrInputText } from 'primereact/inputtext';
import classNames from 'classnames';
import Flex from '../layout/flex';

interface InputTextProps {
  placeholder: string;
  label?: string;
  isValid?: boolean;
  invalidMessage?: string;
}

const InputText: React.FC<InputTextProps> = ({
  placeholder,
  label,
  isValid,
  invalidMessage,
}) => {
  return (
    <label>
      <Flex options={{ direction: 'column', gap: 0.6 }}>
        <Flex options={{ justify: 'space-between' }}>
          <Paragraph size='small'>{label}</Paragraph>
          {!isValid && (
            <Paragraph textColor='error' size='small'>
              {invalidMessage}
            </Paragraph>
          )}
        </Flex>
        <PrInputText
          className={classNames({ ['p-invalid']: !isValid })}
          placeholder={placeholder}
        />
      </Flex>
    </label>
  );
};

export default InputText;
