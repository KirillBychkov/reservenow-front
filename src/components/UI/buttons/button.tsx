import { Button as PrButton } from 'primereact/button';

interface ButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  severity?: 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'help';
  outlined?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fill?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  severity,
  outlined,
  type = 'button',
  fill,
}) => {
  return (
    <PrButton
      style={{ width: fill ? '100%' : 'auto' }}
      type={type}
      icon={icon}
      outlined={outlined}
      severity={severity}
      iconPos='left'
    >
      {children}
    </PrButton>
  );
};

export default Button;
