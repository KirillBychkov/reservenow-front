import { ICreateEquipmentDTO, IUpdateEquipmentDTO } from "@/models/requests/EquipmentRequests";
import equipmentStore from "@/store/EquipmentStore";
import { EquipmentFormData } from "@/types/equipment";

export const createEquipment = async (
  values: EquipmentFormData,
  clearForm?: () => void
) => {
  const equipment: ICreateEquipmentDTO = {
    ...values,
  }

  const response = await equipmentStore.addEquipment(equipment)

  if (response.successMsg && clearForm) {
    clearForm()
  }

  return response
}

export const updateEquipment = async (
  values: EquipmentFormData,
  equipmentId: number,
) => {
  const equipment: IUpdateEquipmentDTO = {
    ...values,
  }
  const response = await equipmentStore.updateEquipment(equipmentId, equipment)

  return response
}