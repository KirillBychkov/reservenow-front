import { EventTitle } from '@/components/b2bclient/calendarComponents/eventTitle/eventTitle';
import { Order } from '@/models/Order';
import { Reservation } from '@/models/Reservation';

export const collectAllReservations = (orders: Order[]) =>
  orders.reduce(
    (prev, current) => [...prev, ...current.reservations],
    [] as Reservation[],
  );

export const createEventsFromReservations = (reservations: Reservation[]) => {
  return reservations.map(
    ({
      rental_object,
      trainer,
      reservation_time_end,
      reservation_time_start,
      description,
    }) => {
      const title = trainer
        ? `${trainer?.first_name} ${trainer?.last_name}`
        : (rental_object?.name as string);

      return {
        start: new Date(reservation_time_start as string),
        end: new Date(reservation_time_end as string),
        title: <EventTitle title={title} description={description || ''} />,
      };
    },
  );
};
