import { EquipmentReservation } from "@/hooks/useEquipmentReservations";
import { ObjectReservation } from "@/hooks/useObjectReservation";
import { TrainerReservation } from "@/hooks/useTrainerReservation";
import { Reservation } from "@/models/Reservation";
import { CreateReservationDTO } from "@/models/requests/OrderRequests";
import { formatEquipmentReservationIn, formatObjectReservationIn, formatTrainerReservationIn } from "./formatReservations";

type ReservationsObject = {
  equipment: EquipmentReservation[];
  trainers: TrainerReservation[];
  objects: ObjectReservation[];
};

export const getInitialReservationValues = (
  reservation: Reservation[],
  language: string,
) => {
  const initialReservationsObject: ReservationsObject = {
    equipment: [],
    trainers: [],
    objects: [],
  };

  return reservation.reduce((prev, current) => {
    if (current.equipment) {
      prev.equipment.push(formatEquipmentReservationIn(current, language));
    }

    if (current.rental_object) {
      prev.objects.push(formatObjectReservationIn(current, language));
    }

    if (current.trainer) {
      prev.trainers.push(formatTrainerReservationIn(current, language));
    }

    return prev;
  }, initialReservationsObject);
};

export const getReservations = (
  equipment: EquipmentReservation[],
  trainers: TrainerReservation[],
  objects: ObjectReservation[],
): CreateReservationDTO[] => {
  const formattedEquipmentReservations = equipment.map(
    ({ equipment, description }) => ({
      equipment_id: equipment?.id,
      description,
    }),
  );

  const formattedTrainerReservations: CreateReservationDTO[] = trainers.map(
    ({
      trainer,
      reservation_time_end,
      reservation_time_start,
      description,
    }) => ({
      trainer_id: trainer?.id,
      description: description || '',
      reservation_time_end: reservation_time_end as string,
      reservation_time_start: reservation_time_start as string,
    }),
  );

  const formattedObjectsReservations: CreateReservationDTO[] = objects.map(
    ({
      rental_object,
      reservation_time_end,
      reservation_time_start,
      description,
    }) => ({
      rental_object_id: rental_object?.id,
      description: description || '',
      reservation_time_end: reservation_time_end as string,
      reservation_time_start: reservation_time_start as string,
    }),
  );

  return [
    ...formattedTrainerReservations,
    ...formattedEquipmentReservations,
    ...formattedObjectsReservations,
  ];
};