import { Button as PrButton } from 'primereact/button';

interface ButtonProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  // label: string;
}

const Button: React.FC<ButtonProps> = ({ children, icon }) => {
  return (
    <PrButton raised icon={icon} iconPos='left'>
      {children}
    </PrButton>
  );
};

export default Button;
