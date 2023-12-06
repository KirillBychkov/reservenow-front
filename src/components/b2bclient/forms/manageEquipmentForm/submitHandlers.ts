import {
  CreateEquipmentDTO,
  UpdateEquipmentDTO,
} from '@/models/requests/EquipmentRequests';
import equipmentStore from '@/store/equipmentStore';
import { EquipmentFormData } from '@/types/equipment';

export const createEquipment = async (
  values: EquipmentFormData,
  clearForm?: () => void,
) => {
  const equipment: CreateEquipmentDTO = {
    ...values,
  };

  const response = await equipmentStore.addEquipment(equipment);

  if (response.successMsg && clearForm) {
    clearForm();
  }

  return response;
};

export const updateEquipment = async (
  values: EquipmentFormData,
  equipmentId: number,
) => {
  const equipment: UpdateEquipmentDTO = {
    ...values,
  };
  const response = await equipmentStore.updateEquipment(equipmentId, equipment);

  return response;
};
