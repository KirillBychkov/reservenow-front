import { EquipmentReservation } from '@/hooks/useEquipmentReservations';
import { ObjectReservation } from '@/hooks/useObjectReservation';
import { TrainerReservation } from '@/hooks/useTrainerReservation';
import { checkErrorsInReservations } from '@/utils/reservations/checkErrors';
import {
  objectsOverlap,
  trainersOverlap,
} from '@/utils/reservations/checkTimeOverlap';
import { getReservations } from '@/utils/reservations/getReservations';

const getRentalTime = (startISO: string, endISO: string) => {
  const startDate = new Date(startISO);
  const endDate = new Date(endISO);

  return endDate.getHours() - startDate.getHours();
};

export const getTotalSum = (
  equipment: EquipmentReservation[],
  trainers: TrainerReservation[],
  objects: ObjectReservation[],
) => {
  const totalEquipmentPrice = equipment.reduce(
    (total, current) => total + (current?.equipment?.price || 0),
    0,
  );

  const totalTrainersPrice = trainers.reduce((prev, reservation) => {
    const { trainer, reservation_time_end, reservation_time_start } =
      reservation;

    if (!reservation_time_start || !reservation_time_end) {
      return prev + 0;
    }

    const rentalTime = getRentalTime(
      reservation_time_start as string,
      reservation_time_end as string,
    );

    return prev + rentalTime * (trainer?.price_per_hour || 0);
  }, 0);

  const totalObjectsPrice = objects.reduce((prev, reservation) => {
    const { rental_object, reservation_time_end, reservation_time_start } =
      reservation;

    if (!reservation_time_start || !reservation_time_end) {
      return prev + 0;
    }

    const rentalTime = getRentalTime(
      reservation_time_start as string,
      reservation_time_end as string,
    );

    return prev + rentalTime * (rental_object?.price_per_hour || 0);
  }, 0);

  return totalTrainersPrice + totalEquipmentPrice + totalObjectsPrice;
};

export const isAllReservationsValid = async (
  equipment: EquipmentReservation[],
  trainers: TrainerReservation[],
  objects: ObjectReservation[],
  onOverlapError: (error: string) => void,
  isEditingMode: boolean,
) => {
  if (isEditingMode) {
    return true;
  }

  const reservations = getReservations(equipment, trainers, objects);

  const isReservationErrors = checkErrorsInReservations(
    equipment,
    trainers,
    objects,
  );

  if (!reservations || isReservationErrors) {
    return false;
  }

  const objMessage = await objectsOverlap(objects);
  const trainersMessage = await trainersOverlap(trainers);

  if (objMessage || trainersMessage) {
    onOverlapError((objMessage || trainersMessage) as string);
    return false;
  }

  return true;
};
