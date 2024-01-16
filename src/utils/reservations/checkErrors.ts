import { EquipmentReservation } from "@/hooks/useEquipmentReservations";
import { ObjectReservation } from "@/hooks/useObjectReservation";
import { TrainerReservation } from "@/hooks/useTrainerReservation";

const isAnyEquipmentReservationErrors = (
  equipmentReservation: EquipmentReservation[],
) => {
  for (let i = 0; i < equipmentReservation.length; i++) {
    if (equipmentReservation[i].equipment === null) {
      return true;
    }
  }

  return false;
};

const isAnyTrainersReservationErrors = (
  trainersReservation: TrainerReservation[],
) => {
  for (let i = 0; i < trainersReservation.length; i++) {
    const { trainer, reservation_time_end, reservation_time_start } =
      trainersReservation[i];

    if (trainer === null) {
      return true;
    }

    if (reservation_time_start === null || reservation_time_end === null) {
      return true;
    }
  }

  return false;
};

const isAnyObjectsReservationErrors = (
  objectsReservation: ObjectReservation[],
) => {
  for (let i = 0; i < objectsReservation.length; i++) {
    const { rental_object, reservation_time_end, reservation_time_start } =
      objectsReservation[i];

    if (rental_object === null) {
      return true;
    }

    if (reservation_time_start === null || reservation_time_end === null) {
      return true;
    }
  }

  return false;
};

export const checkErrorsInReservations = (
  equipment: EquipmentReservation[],
  trainers: TrainerReservation[],
  objects: ObjectReservation[],
) => {
  return (
    isAnyEquipmentReservationErrors(equipment) ||
    isAnyObjectsReservationErrors(objects) ||
    isAnyTrainersReservationErrors(trainers)
  );
};