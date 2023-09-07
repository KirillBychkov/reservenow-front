import { Button as PrButton } from 'primereact/button';

interface ButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  severity?: 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'help';
  outlined?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fill?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  severity,
  outlined,
  type = 'button',
  fill,
  onClick,
  className,
}) => {
  return (
    <PrButton
      style={{ width: fill ? '100%' : 'auto' }}
      type={type}
      icon={icon}
      outlined={outlined}
      severity={severity}
      iconPos='left'
      onClick={onClick}
      className={className}
    >
      {children}
    </PrButton>
  );
};

export default Button;
