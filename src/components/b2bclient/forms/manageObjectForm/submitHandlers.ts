import {
  CreateRentalObjectDTO,
  UpdateRentalObjectDTO,
} from '@/models/requests/ObjectsRequests';
import objectsStore from '@/store/ObjectsStore';
import { ObjectFormData } from '@/types/objects';
import { finalizeWorkingHours } from '@/utils/formHelpers/formHelpers';

export const createObject = async (
  values: ObjectFormData,
  organizationId?: string,
  clearForm?: () => void
) => {
  const workingHours = finalizeWorkingHours(values.workingHours);
  const object: CreateRentalObjectDTO = {
    organization_id: parseInt(organizationId || '0'),
    address: values.address,
    phone: values.phone,
    name: values.name,
    description: values.description,
    price_per_hour: values.price,
    ...workingHours,
  };
  const response = await objectsStore.addRentalObject(object);
  if (response.successMsg && clearForm) {
    clearForm();
  }
  return response;
};

export const updateObject = async (
  values: ObjectFormData,
  objectId: number
) => {
  const workingHours = finalizeWorkingHours(values.workingHours);
  const object: UpdateRentalObjectDTO = {
    address: values.address,
    phone: values.phone,
    name: values.name,
    description: values.description,
    price_per_hour: values.price,
    ...workingHours,
  };
  const response = await objectsStore.editRentalObject(objectId, object);
  return response;
};
