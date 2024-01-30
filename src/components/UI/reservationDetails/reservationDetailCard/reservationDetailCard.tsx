import { Minus } from '@blueprintjs/icons';
import Flex from '../../layout/flex';
import styles from './reservationDetailCard.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { OrderStatus } from '@/types/enums/order';

type Detail = {
  label: string;
  value?: string;
  direction?: 'column';
};

type Props = {
  title: string;
  details: Detail[];
  status?: OrderStatus;
};

export const ReservationDetailCard = ({ title, details, status }: Props) => {
  const { t } = useTranslation();
  return (
    <Flex options={{ direction: 'column', gap: 1 }} className={styles.card}>
      <Flex options={{ align: 'center', gap: 0.875 }}>
        <h4 className='heading heading-4'>{title}</h4>
        {status && (
          <div className={classNames(styles.status, styles[status])}>
            {t(`status.${status}`)}
          </div>
        )}
      </Flex>

      {details.map(({ label, value, direction }) => (
        <Flex
          key={value}
          className={styles.details}
          options={{ justify: 'space-between', gap: 0.5, direction }}
        >
          <p className='heading heading-6'>{label}</p>
          <p className='paragraph paragraph--normal'>{value || <Minus />}</p>
        </Flex>
      ))}
    </Flex>
  );
};
