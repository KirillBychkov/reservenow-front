import { EquipmentReservation } from '@/hooks/useEquipmentReservations';
import { ObjectReservation } from '@/hooks/useObjectReservation';
import { TrainerReservation } from '@/hooks/useTrainerReservation';
import { Equipment } from '@/models/Equipment';
import { RentalObject } from '@/models/RentalObject';
import { Reservation } from '@/models/Reservation';
import { Trainer } from '@/models/Trainer';
import { CreateReservationDTO } from '@/models/requests/OrderRequests';
import { formatObjectIn } from '@/utils/formatters/formatObject';
import { TFunction } from 'i18next';

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

const getEquipmentReservationErrors = (
  equipmentReservation: EquipmentReservation[],
  t: TFunction,
) => {
  for (let i = 0; i < equipmentReservation.length; i++) {
    if (equipmentReservation[i].equipment === null) {
      return t('schedule.reservationErrors.equipmentNull');
    }
  }
};

const getTrainersReservationErrors = (
  trainersReservation: TrainerReservation[],
  t: TFunction,
) => {
  for (let i = 0; i < trainersReservation.length; i++) {
    const { trainer, reservation_time_end, reservation_time_start } =
      trainersReservation[i];

    if (trainer === null) {
      return t('schedule.reservationErrors.trainerNull');
    }

    if (reservation_time_start === null || reservation_time_end === null) {
      const { first_name, last_name } = trainer;
      return t('schedule.reservationErrors.addReservationTimeForTrainer', {
        first_name,
        last_name,
      });
    }
  }
};

const getObjectsReservationErrors = (
  objectsReservation: ObjectReservation[],
  t: TFunction,
) => {
  for (let i = 0; i < objectsReservation.length; i++) {
    const { rental_object, reservation_time_end, reservation_time_start } =
      objectsReservation[i];

    if (rental_object === null) {
      return t('schedule.reservationErrors.objectNull');
    }

    if (reservation_time_start === null || reservation_time_end === null) {
      const { name } = rental_object;
      return t('schedule.reservationErrors.addReservationTimeForObject', {
        name,
      });
    }
  }
};

export const checkErrorsInReservations = (
  equipment: EquipmentReservation[],
  trainers: TrainerReservation[],
  objects: ObjectReservation[],
  t: TFunction,
) => {
  let errorMsg =
    getEquipmentReservationErrors(equipment, t) ||
    getObjectsReservationErrors(objects, t) ||
    getTrainersReservationErrors(trainers, t);

  return errorMsg;
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

type ReservationsObject = {
  equipment: EquipmentReservation[];
  trainers: TrainerReservation[];
  objects: ObjectReservation[];
};

const formatEquipmentReservationIn = (
  reservation: Reservation,
  language: string,
): EquipmentReservation => {
  return {
    id: crypto.randomUUID(),
    equipment: formatObjectIn(reservation.equipment as Equipment, language),
    description: reservation.description,
  };
};

const formatTrainerReservationIn = (
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

const formatObjectReservationIn = (
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
