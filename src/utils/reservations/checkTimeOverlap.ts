import { ObjectReservation } from '@/hooks/useObjectReservation';
import { TrainerReservation } from '@/hooks/useTrainerReservation';
import { RentalObject } from '@/models/RentalObject';
import { Reservation } from '@/models/Reservation';
import { Trainer } from '@/models/Trainer';
import ordersStore from '@/store/ordersStore';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const isTimeRangeOverlap = (
  startIso: string,
  endIso: string,
  existingReservations: Reservation[],
) => {
  for (const reservation of existingReservations) {
    const { reservation_time_start, reservation_time_end } = reservation;

    const newStart = dayjs(startIso);
    const newEnd = dayjs(endIso);
    const reservationStart = dayjs(reservation_time_start as string);
    const reservationEnd = dayjs(reservation_time_end as string);

    if (
      (newStart.isSameOrAfter(reservationStart) &&
        newStart.isBefore(reservationEnd)) ||
      (newEnd.isAfter(reservationStart) &&
        newEnd.isSameOrBefore(reservationEnd)) ||
      (newStart.isBefore(reservationStart) && newEnd.isAfter(reservationEnd))
    ) {
      return getOverlapMessage(reservation);
    }
  }
  return '';
};

const getOverlapMessage = ({
  rental_object,
  trainer,
  reservation_time_start,
  reservation_time_end,
}: Reservation) => {
  const formattedStart = dayjs(reservation_time_start).format('HH:mm');
  const formattedEnd = dayjs(reservation_time_end).format('HH:mm');

  if (rental_object) {
    return `Об'єкт ${rental_object?.name} вже зарезервовано з ${formattedStart}-${formattedEnd}`;
  }

  return `Тренер ${trainer?.first_name} ${trainer?.last_name} вже зарезервований з ${formattedStart}-${formattedEnd}`;
};

const checkIsDatesSame = (incoming: string, existing: string) =>
  dayjs(incoming).isSame(dayjs(existing), 'day');

export const objectsOverlap = async (reservations: ObjectReservation[]) => {
  for (let i = 0; i < reservations.length; i++) {
    const { rental_object, reservation_time_end, reservation_time_start } =
      reservations[i];

    const { data: orders } = await ordersStore.getOrders(
      { limit: 1000, skip: 0 },
      { rentalObjectId: rental_object?.id },
    );

    const allReservations = orders.reduce((prev, { reservations }) => {
      const reservationAtCertainDay = getObjectReservationsAtCertainDay(
        reservations,
        reservation_time_start as string,
        rental_object as RentalObject,
      );
      if (reservationAtCertainDay.length !== 0) {
        return [...prev, ...reservationAtCertainDay];
      } else {
        return [...prev];
      }
    }, [] as Reservation[]);

    const message = isTimeRangeOverlap(
      reservation_time_start as string,
      reservation_time_end as string,
      allReservations,
    );

    if (message) {
      return message;
    }
  }
};

export const trainersOverlap = async (reservations: TrainerReservation[]) => {
  for (let i = 0; i < reservations.length; i++) {
    const { trainer, reservation_time_end, reservation_time_start } =
      reservations[i];

    const { data: orders } = await ordersStore.getOrders(
      { limit: 1000, skip: 0 },
      { trainerId: trainer?.id },
    );

    const allReservations = orders.reduce((prev, { reservations }) => {
      const reservationAtCertainDay = getTrainersReservationsAtCertainDay(
        reservations,
        reservation_time_start as string,
        trainer as Trainer,
      );
      if (reservationAtCertainDay.length !== 0) {
        return [...prev, ...reservationAtCertainDay];
      } else {
        return [...prev];
      }
    }, [] as Reservation[]);

    const message = isTimeRangeOverlap(
      reservation_time_start as string,
      reservation_time_end as string,
      allReservations,
    );

    if (message) {
      return message;
    }
  }
};

const getObjectReservationsAtCertainDay = (
  reservation: Reservation[],
  date: string,
  { id }: RentalObject,
) => {
  const resultArray: Reservation[] = [];

  reservation.forEach((reserv) => {
    const { rental_object, reservation_time_start } = reserv;

    if (
      rental_object?.id === id &&
      checkIsDatesSame(reservation_time_start as string, date)
    ) {
      resultArray.push(reserv);
    }
  });

  return resultArray;
};

const getTrainersReservationsAtCertainDay = (
  reservation: Reservation[],
  date: string,
  { id }: Trainer,
) => {
  const resultArray: Reservation[] = [];

  reservation.forEach((reserv) => {
    const { trainer, reservation_time_start } = reserv;

    if (
      trainer?.id === id &&
      checkIsDatesSame(reservation_time_start as string, date)
    ) {
      resultArray.push(reserv);
    }
  });

  return resultArray;
};
