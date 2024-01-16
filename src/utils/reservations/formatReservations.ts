import { EquipmentReservation } from "@/hooks/useEquipmentReservations";
import { Reservation } from "@/models/Reservation";
import { formatObjectIn } from "../formatters/formatObject";
import { Equipment } from "@/models/Equipment";
import { TrainerReservation } from "@/hooks/useTrainerReservation";
import { Trainer } from "@/models/Trainer";
import { ObjectReservation } from "@/hooks/useObjectReservation";
import { RentalObject } from "@/models/RentalObject";

export const formatEquipmentReservationIn = (
  reservation: Reservation,
  language: string,
): EquipmentReservation => {
  return {
    id: crypto.randomUUID(),
    equipment: formatObjectIn(reservation.equipment as Equipment, language),
    description: reservation.description,
  };
};

export const formatTrainerReservationIn = (
  reservation: Reservation,
  language: string,
): TrainerReservation => {
  return {
    id: crypto.randomUUID(),
    trainer: formatObjectIn(reservation.trainer as Trainer, language),
    description: reservation.description || '',
    reservation_time_end: reservation.reservation_time_end as string,
    reservation_time_start: reservation.reservation_time_start as string,
  };
};

export const formatObjectReservationIn = (
  reservation: Reservation,
  language: string,
): ObjectReservation => {
  return {
    id: crypto.randomUUID(),
    rental_object: formatObjectIn(
      reservation.rental_object as RentalObject,
      language,
    ),
    description: reservation.description || '',
    reservation_time_end: reservation.reservation_time_end as string,
    reservation_time_start: reservation.reservation_time_start as string,
  };
};