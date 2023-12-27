import { Order } from "@/models/Order";
import { Reservation } from "@/models/Reservation";

export const getNameFromReservation = (reservation: Reservation) => {
  return (
    reservation.equipment?.name ||
    reservation.rental_object?.name ||
    `${reservation.trainer?.first_name} ${reservation.trainer?.last_name}`
  );
}

export const getAllObjectsNamesInOrder = ({ reservations }: Order) => {
  return reservations.map(getNameFromReservation);
};
