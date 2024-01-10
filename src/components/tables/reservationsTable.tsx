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
      value={formattedReservations}
      lazy={true}
      footer={<TableFooter total={total} />}
    >
      <Column
        style={{ width: '50%' }}
        header={t('reservationHistory.reservationTable.object')}
        body={getNameFromReservation}
      />

      <Column
        header={t('reservationHistory.reservationTable.createdAt')}
        field='created_at'
      />

      <Column
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
        header={t('reservationHistory.reservationTable.total')}
        body={({ price }: Reservation) => {
          return `₴${price}`;
        }}
      />
    </DataTable>
  );
};

export default ReservationsTable;
