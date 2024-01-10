import { Trainer } from '@/models/Trainer';
import personnelStore from '@/store/personnelStore';
import { formatObjectIn } from '@/utils/formatters/formatObject';
import { useEffect, useState } from 'react';

export type TrainerOption = {
  label: string;
  trainer: Trainer;
};

export type TrainerReservation = {
  id: string;
  trainer: Trainer | null;
  reservation_time_start: Date | string | null;
  reservation_time_end: Date | string | null;
  description: string | null;
};

const useTrainerReservation = (initialValues: TrainerReservation[]) => {
  const [options, setOptions] = useState<TrainerOption[]>([]);
  const [trainerReservations, setTrainerReservations] = useState<
    TrainerReservation[]
  >(initialValues || []);

  const addEmptyTrainerReservation = () => {
    setTrainerReservations((prev) => {
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          trainer: null,
          description: null,
          reservation_time_start: null,
          reservation_time_end: null,
        },
      ];
    });
  };

  const fetchAndSetOptions = async () => {
    const { data: trainers } = await personnelStore.getTrainers();

    setOptions(
      trainers.map((trainer) => {
        return {
          label: trainer.first_name,
          trainer: formatObjectIn(trainer),
        };
      }),
    );
  };

  const deleteTrainerReservation = (id: string) => {
    setTrainerReservations((reservations) => {
      return [...reservations.filter((reservation) => reservation.id !== id)];
    });
  };

  const handleChangeReservationTime = (
    id: string,
    time: { start?: string | null; end?: string | null },
  ) => {
    const { start, end } = time;

    setTrainerReservations((prev) => {
      return prev.map((trainerReservation) => {
        if (trainerReservation.id === id) {
          return {
            ...trainerReservation,
            reservation_time_start:
              start !== undefined
                ? start
                : trainerReservation.reservation_time_start,
            reservation_time_end:
              end !== undefined ? end : trainerReservation.reservation_time_end,
          };
        }

        return trainerReservation;
      });
    });
  };

  const changeTrainerReservationData = (
    id: string,
    data: { trainer?: Trainer; description?: string },
  ) => {
    setTrainerReservations((prev) => {
      return prev.map((trainerReservation) => {
        if (trainerReservation.id === id) {
          return {
            ...trainerReservation,
            trainer: data.trainer || trainerReservation.trainer,
            description: data.description || trainerReservation.description,
          };
        }

        return trainerReservation;
      });
    });
  };

  useEffect(() => {
    fetchAndSetOptions();
  }, []);

  const clearAll = () => {
    setTrainerReservations([])
  }

  return {
    clearAll,
    options,
    trainerReservations,
    addEmptyTrainerReservation,
    deleteTrainerReservation,
    changeTrainerReservationData,
    handleChangeReservationTime,
  };
};

export default useTrainerReservation;
