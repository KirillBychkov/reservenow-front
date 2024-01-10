import { Organization } from '@/models/Organization';
import { RentalObject } from '@/models/RentalObject';
import organizationStore from '@/store/organizationsStore';
import { formatObjectIn } from '@/utils/formatters/formatObject';
import { useEffect, useState } from 'react';

export type OrganizationOption = {
  label: string;
  organization: Organization;
};

export type ObjectOption = {
  label: string;
  object: RentalObject;
};

export type ObjectReservation = {
  id: string;
  rental_object: RentalObject | null;
  reservation_time_start: Date | string | null;
  reservation_time_end: Date | string | null;
  description: string | null;
};

const useObjectReservation = (initialValues?: ObjectReservation[]) => {
  const [orgOptions, setOrgOptions] = useState<OrganizationOption[]>([]);
  const [objectReservations, setObjectReservations] = useState<
    ObjectReservation[]
  >(initialValues || []);

  const deleteObjectReservation = (id: string) => {
    setObjectReservations((reservations) => {
      return [...reservations.filter((reservation) => reservation.id !== id)];
    });
  };

  const fetchAndSetOrgOptions = async () => {
    const { data: organizations } = await organizationStore.getOrganizations();

    setOrgOptions(
      organizations.map((organization) => {
        return {
          label: organization.name,
          organization: formatObjectIn(organization),
        };
      }),
    );
  };

  useEffect(() => {
    fetchAndSetOrgOptions();
  }, []);

  const addEmptyObjectReservation = () => {
    setObjectReservations((prev) => {
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          rental_object: null,
          description: null,
          reservation_time_start: null,
          reservation_time_end: null,
        },
      ];
    });
  };

  const changeObjectReservationData = (
    id: string,
    data: { rental_object?: RentalObject | null; description?: string },
  ) => {
    const { rental_object, description } = data;

    setObjectReservations((prev) => {
      return prev.map((reservation) => {
        if (reservation.id === id) {
          return {
            ...reservation,
            rental_object:
              rental_object !== undefined
                ? rental_object
                : reservation.rental_object,
            description: description || reservation.description,
          };
        }

        return reservation;
      });
    });
  };

  const handleChangeReservationTime = (
    id: string,
    time: { start?: string | null; end?: string | null },
  ) => {
    const { start, end } = time;
    setObjectReservations((prev) => {
      return prev.map((reservation) => {
        if (reservation.id === id) {
          return {
            ...reservation,
            reservation_time_start:
              start !== undefined ? start : reservation.reservation_time_start,
            reservation_time_end:
              end !== undefined ? end : reservation.reservation_time_end,
          };
        }

        return reservation;
      });
    });
  };

  const clearAll = () => {
    setObjectReservations([])
  }

  return {
    objectReservations,
    clearAll,
    orgOptions,
    deleteObjectReservation,
    addEmptyObjectReservation,
    changeObjectReservationData,
    handleChangeReservationTime,
  };
};

export default useObjectReservation;
