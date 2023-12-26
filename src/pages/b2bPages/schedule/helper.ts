import { Order } from '@/models/Order';
import { Reservation } from '@/models/Reservation';

export const getAllObjectReservations = (orders: Order[], objId: number) => {
  const reservations: Reservation[] = [];

  orders.forEach((order) => {
    order.reservations.forEach((reservation) => {
      if (reservation.rental_object && reservation.rental_object.id === objId) {
        reservations.push(reservation);
      }
    });
  });

  return reservations;
};

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