import { Trainer } from '@/models/Trainer';
import personnelStore from '@/store/personnelStore';
import { formatObjectIn } from '@/utils/formatters/formatObject';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { i18n } = useTranslation();

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
          label: `${trainer.first_name} ${trainer.last_name}`,
          trainer: formatObjectIn(trainer, i18n.language),
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
        const { trainer, description } = data;
        if (trainerReservation.id === id) {
          return {
            ...trainerReservation,
            trainer: trainer || trainerReservation.trainer,
            description:
              description !== undefined
                ? description
                : trainerReservation.description,
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
    setTrainerReservations([]);
  };

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
