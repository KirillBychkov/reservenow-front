import {
  CreateEquipmentDTO,
  UpdateEquipmentDTO,
} from '@/models/requests/EquipmentRequests';
import equipmentStore from '@/store/equipmentStore';
import { EquipmentFormData } from '@/types/equipment';
import { formatObjectOut } from '@/utils/formatters/formatObject';

export const createEquipment = async (
  values: EquipmentFormData,
  clearForm?: () => void,
) => {
  const equipment: CreateEquipmentDTO = formatObjectOut(values)

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
  const equipment: UpdateEquipmentDTO = formatObjectOut(values);
  const response = await equipmentStore.updateEquipment(equipmentId, equipment);

  return response;
};
