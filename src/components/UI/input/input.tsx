import { Paragraph } from '@/components/UI/typography/typography';
import React from 'react';
import { InputText as PrInputText } from 'primereact/inputtext';
import classNames from 'classnames';
import Flex from '../layout/flex';

interface InputTextProps {
  placeholder: string;
  label?: string;
  invalid?: boolean;
  invalidMessage?: string;
}

const InputText: React.FC<InputTextProps> = ({
  placeholder,
  label,
  invalid,
  invalidMessage,
}) => {
  return (
    <label>
      <Flex options={{ direction: 'column' }}>
        <Flex options={{ justify: 'space-between' }}>
          <Paragraph size='small'>{label}</Paragraph>
          {invalid && <Paragraph size='small'>{invalidMessage}</Paragraph>}
        </Flex>
        <PrInputText
          className={classNames({ ['p-invalid']: invalid })}
          placeholder={placeholder}
        />
      </Flex>
    </label>
  );
};

export default InputText;
