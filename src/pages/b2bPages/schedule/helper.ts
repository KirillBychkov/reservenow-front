import { Order } from '@/models/Order';
import { Reservation } from '@/models/Reservation';

export const getAllObjectReservations = (orders: Order[]) =>
  orders.reduce(
    (prev, current) => [...prev, ...current.reservations],
    [] as Reservation[],
  );

export const getAllTrainersReservations = (orders: Order[]) => {
  const reservations: Reservation[] = [];

  orders.forEach((order) => {
    order.reservations.forEach((reservation) => {
      if (reservation.trainer) {
        reservations.push(reservation);
      }
    });
  });

  return reservations;
};
