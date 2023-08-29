import Button from '@/components/UI/buttons/button';
import { Heading1, Paragraph } from '@/components/UI/typography/typography';
import { Plus, Home } from '@blueprintjs/icons';
import { ReactComponent as Logo } from '@/assets/logo.svg';
import MenuButton from '@/components/UI/buttons/menuButton';
import InputText from '@/components/UI/input/input';

const Signin = () => {
  return (
    <div>
      <div style={{ backgroundColor: 'black' }}>
        <Logo />
      </div>
      <Heading1>Sign in</Heading1>
      <Paragraph size='large'>large</Paragraph>
      <Paragraph>normal</Paragraph>
      <Paragraph size='small'>small</Paragraph>
      <Button>Увійти</Button>
      <Button outlined>Увійти</Button>
      <Button icon={<Plus color='white' />}>Додати</Button>
      <Button severity='danger'>Скасувати</Button>
      <MenuButton icon={<Home />}>Головна</MenuButton>
      <InputText
        placeholder='Введіть вашу пошту'
        label='Ел. пошта'
        invalidMessage='Вказано невірну пошту'
        invalid
      />
    </div>
  );
};

export default Signin;
