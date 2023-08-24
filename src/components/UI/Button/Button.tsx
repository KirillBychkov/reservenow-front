// import { StyledButton } from './styles';
import { Button as BpButton } from '@blueprintjs/core';

interface ButtonProps {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <BpButton intent='primary' large>
      {children}
    </BpButton>
  );
};

export default Button;
