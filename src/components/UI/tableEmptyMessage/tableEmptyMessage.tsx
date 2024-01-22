import { useNavigate } from 'react-router-dom';
import Button from '../buttons/button';
import Flex from '../layout/flex';
import styles from './tableEmptyMessage.module.scss';
import { Plus } from '@blueprintjs/icons';

type Props = {
  text: string;
  buttonData?: { text: string; to: string };
};

export const TableEmptyMessage = ({ text, buttonData }: Props) => {
  const navigate = useNavigate();

  return (
    <Flex
      className={styles.body}
      options={{
        direction: 'column',
        align: 'center',
        gap: 1.875,
      }}
    >
      <h2 className='heading heading-2 heading-primary'>{text}</h2>
      {buttonData && (
        <Button
          icon={<Plus color='#fff' />}
          onClick={() => navigate(buttonData.to)}
        >
          {buttonData.text}
        </Button>
      )}
    </Flex>
  );
};
