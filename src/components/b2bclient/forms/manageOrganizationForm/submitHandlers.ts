import { CreateOrganizationDTO } from '@/models/requests/OrganizationRequests';
import organizationStore from '@/store/OrganizationsStore';
import { OrganizationFormData } from '@/types/organization';
import { finalizeWorkingHours } from '@/utils/formHelpers/formHelpers';

export const createOrganization = async (
  values: OrganizationFormData,
  file?: File,
  clearForm?: () => void,
) => {
  const workingHours = finalizeWorkingHours(values.workingHours);
  const organization: CreateOrganizationDTO = {
    name: values.name,
    description: values.description,
    phone: values.phone,
    address: values.address,
    ...workingHours,
  };
  const response = await organizationStore.addOrganization(organization, file);
  if (response.successMsg && clearForm) {
    clearForm();
  }
  return response;
};

export const updateOrganization = async (
  organizationId: number,
  values: OrganizationFormData,
  file?: File,
) => {
  const workingHours = finalizeWorkingHours(values.workingHours);
  const organization: CreateOrganizationDTO = {
    name: values.name,
    description: values.description,
    phone: values.phone,
    address: values.address,
    ...workingHours,
  };
  const response = await organizationStore.editOrganization(
    organizationId,
    organization,
    file,
  );
  return response;
};
