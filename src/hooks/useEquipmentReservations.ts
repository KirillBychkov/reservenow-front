import { Equipment } from '@/models/Equipment';
import equipmentStore from '@/store/equipmentStore';
import { formatToUpperUnit } from '@/utils/formatters/formatPrice';
import { useEffect, useState } from 'react';

export type EquipmentOption = {
  label: string;
  equipment: Equipment;
};

export type EquipmentReservation = {
  id: string;
  equipment?: Omit<Equipment, 'user'> | null;
  description?: string;
};

export const useEquipmentReservations = (
  initialValues?: EquipmentReservation[],
) => {
  const [options, setOptions] = useState<EquipmentOption[]>([]);
  const [equipmentReservations, setEquipmentReservations] = useState<
    EquipmentReservation[]
  >(initialValues || []);

  const fetchAndSetOptions = async () => {
    const { data: equipment } = await equipmentStore.getEquipment({
      limit: 1000,
      skip: 0,
    });

    setOptions(
      equipment.map((eq) => {
        return {
          label: eq.name,
          equipment: {
            ...eq,
            price: formatToUpperUnit(eq.price),
          },
        };
      }),
    );
  };

  useEffect(() => {
    fetchAndSetOptions();
  }, []);

  const handleDeleteReservation = (id: string) => {
    setEquipmentReservations((prev) => {
      return [...prev.filter((eq) => eq.id !== id)];
    });
  };

  const handleAddEmptyReservation = () => {
    setEquipmentReservations((prev) => {
      return [
        ...prev,
        { id: crypto.randomUUID(), equipment: null, description: '' },
      ];
    });
  };

  const handleChangeReservationData = (
    id: string,
    data: { equipment?: Equipment; description?: string },
  ) => {
    setEquipmentReservations((prev) => {
      return prev.map((equipmentReservation) => {
        if (equipmentReservation.id === id) {
          return {
            id,
            equipment: data.equipment || equipmentReservation.equipment,
            description: data.description || equipmentReservation.description,
          };
        }

        return equipmentReservation;
      });
    });
  };

  return {
    options,
    handleDeleteReservation,
    handleChangeReservationData,
    handleAddEmptyReservation,
    equipmentReservations,
  };
};
