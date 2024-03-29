import Flex from '@/components/UI/layout/flex';
import { Client } from '@/models/Client';
import styles from './leftSideComponent.module.scss';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { useMediaQuery } from '@/hooks/useMediaQuery';

type Props = {
  client: Client;
};

const LeftSideComponent = ({ client }: Props) => {
  const { t } = useTranslation();
  const { first_name, status, id, last_name, created_at, phone } = client;
  const clientProperties = Object.entries({ id, first_name, last_name, phone });
  const isLaptopL = useMediaQuery('(max-width: 1440px)');

  return (
    <Flex
      options={{ direction: 'column', gap: 1.25 }}
      className={styles.clientCard}
    >
      {!isLaptopL && (
        <>
          <h3 className={classNames('heading heading-3', styles.cardTitle)}>
            {`${first_name} ${last_name}`}
          </h3>

          <Flex
            className={styles.statusContainer}
            options={{ justify: 'space-between', align: 'center' }}
          >
            <h4 className='heading heading-4'>{t('clients.status')}</h4>
            <div
              className={classNames(
                styles.status,
                styles['status--small'],
                styles[status],
              )}
            >
              {t(`status.${status}`)}
            </div>
          </Flex>
        </>
      )}

      <div className={styles.infoContainer}>
        <div className={styles.info}>
          {clientProperties.map(([property, value]) => (
            <Flex key={property} options={{ direction: 'column', gap: 0.25 }}>
              <p className='heading heading-6'>{t(`clients.${property}`)}</p>
              <p className='heading heading-6 heading-muted'>{value}</p>
            </Flex>
          ))}
        </div>

        <div className={styles.info}>
          <Flex options={{ direction: 'column', gap: 0.25 }}>
            <p className='heading heading-6'>{t('clients.createdAt')}</p>
            <p className='heading heading-6 heading-muted'>
              {created_at as string}
            </p>
          </Flex>

          {isLaptopL && (
            <Flex options={{ direction: 'column', gap: 0.8 }}>
              <p className='heading heading-6'>{t('clients.status')}</p>
              <div
                className={classNames(
                  styles.status,
                  styles['status--small'],
                  styles[status],
                )}
              >
                {t(`status.${status}`)}
              </div>
            </Flex>
          )}
        </div>
      </div>
    </Flex>
  );
};

export default LeftSideComponent;
