import { Button as PrButton } from 'primereact/button';

interface ButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  severity?: 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'help';
  outlined?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  severity,
  outlined,
}) => {
  return (
    <PrButton
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
