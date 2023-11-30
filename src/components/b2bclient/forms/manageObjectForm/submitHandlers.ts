import {
  CreateRentalObjectDTO,
  UpdateRentalObjectDTO,
} from '@/models/requests/ObjectsRequests';
import objectsStore from '@/store/objectsStore';
import { ObjectFormData } from '@/types/objects';
import { finalizeWorkingHours } from '@/utils/formHelpers/formHelpers';
import { formatObjectOut } from '@/utils/formatters/formatObject';

export const createObject = async (
  values: ObjectFormData,
  file?: File,
  organizationId?: string,
  clearForm?: () => void,
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
  const formattedObject = formatObjectOut(object);

  const response = await objectsStore.addRentalObject(formattedObject, file);
  if (response.successMsg && clearForm) {
    clearForm();
  }
  return response;
};

export const updateObject = async (
  values: ObjectFormData,
  objectId: number,
  file?: File,
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
  const formattedObject = formatObjectOut(object);

  const response = await objectsStore.editRentalObject(
    formattedObject,
    objectId,
    file,
  );
  return response;
};
