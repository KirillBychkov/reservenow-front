import { Checkbox } from 'primereact/checkbox';
import styles from './eventButton.module.scss';
import { Events } from '@/types/schedule';

type Props = {
  text: string;
  onClick: () => void;
  value: Events;
  isActive: boolean;
};

export const EventButton = ({ text, onClick, isActive, value }: Props) => {
  return (
    <button onClick={onClick} className={styles.button}>
      <p className='heading heading-5'>{text}</p>
      <Checkbox value={value} checked={isActive} />
    </button>
  );
};
