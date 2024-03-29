import { Reservation } from '@/models/Reservation';
import { formatObjectIn } from '@/utils/formatters/formatObject';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useMemo } from 'react';
import Flex from '../UI/layout/flex';
import { useTranslation } from 'react-i18next';
import * as dayjs from 'dayjs';
import { getNameFromReservation } from './helper';
import { Minus } from '@blueprintjs/icons';
import { formatDate } from '@/utils/formatters/formatDate';
type Props = {
  reservations: Reservation[];
  total: number;
};

const getTimeRange = (start: string, end: string) => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);

  return `${startDate.format('HH:mm')}-${endDate.format('HH:mm')}`;
};

const TableFooter = ({ total }: { total: number }) => {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '14px' }}>
      <Flex options={{ justify: 'flex-end' }}>
        <Flex options={{ align: 'center', gap: 8 }}>
          <h5 className='heading heading-4'>
            {t('reservationHistory.reservationTable.totalPrice')}
          </h5>
          <h5 className='heading heading-4'>{`₴${total}`}</h5>
        </Flex>
      </Flex>
    </div>
  );
};

const ReservationsTable = ({ reservations, total }: Props) => {
  const { t, i18n } = useTranslation();
  const formattedReservations = useMemo(() => {
    return reservations.map((reservation) =>
      formatObjectIn(reservation, i18n.language),
    );
  }, [reservations]);

  return (
    <DataTable
      removableSort
      className='tableWithHeader largeRowsTables'
      value={formattedReservations}
      lazy={true}
      footer={<TableFooter total={total} />}
    >
      <Column
        style={{ width: '25%', minWidth: '200px' }}
        header={t('reservationHistory.reservationTable.object')}
        body={getNameFromReservation}
      />

      <Column
        style={{ width: '25%', minWidth: '190px' }}
        header={t('reservationHistory.reservationTable.createdAt')}
        body={({ reservation_time_start }: Reservation) =>
          reservation_time_start ? (
            formatDate(i18n.language)(reservation_time_start as string)
          ) : (
            <Minus />
          )
        }
      />

      <Column
        style={{ width: '25%', minWidth: '200px' }}
        header={t('reservationHistory.reservationTable.rentalTime')}
        body={({ reservation_time_start, reservation_time_end }: Reservation) =>
          reservation_time_start ? (
            getTimeRange(
              reservation_time_start as string,
              reservation_time_end as string,
            )
          ) : (
            <Minus />
          )
        }
      />

      <Column
        style={{ width: '25%', minWidth: '100px' }}
        header={t('reservationHistory.reservationTable.total')}
        body={({ price }: Reservation) => `₴${price}`}
      />
    </DataTable>
  );
};

export default ReservationsTable;
