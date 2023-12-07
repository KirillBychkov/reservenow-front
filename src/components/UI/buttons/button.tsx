import { Button as PrButton } from 'primereact/button';
import { ButtonProps } from 'primereact/button';
interface Props extends ButtonProps {
  fill?: boolean;
}

const Button: React.FC<Props> = ({ fill, type = 'button', ...rest }) => {
  return (
    <PrButton
      {...rest}
      type={type}
      style={{ width: fill ? '100%' : 'auto', ...rest.style }}
      iconPos={rest?.iconPos || 'left'}
    />
  );
};

export default Button;
