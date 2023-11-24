import { ICreateOrganizationDTO } from '@/models/requests/OrganizationRequests';
import organizationStore from '@/store/OrganizationsStore';
import { OrganizationFormData } from '@/types/organization';
import { finalizeWorkingHours } from '@/utils/formHelpers/formHelpers';

export const createOrganization = async (
  values: OrganizationFormData,
  clearForm?: () => void
) => {
  const workingHours = finalizeWorkingHours(values.workingHours);
  const organization: ICreateOrganizationDTO = {
    name: values.name,
    description: values.description,
    phone: values.phone,
    address: values.address,
    ...workingHours,
  };
  const response = await organizationStore.addOrganization(organization);
  if (response.successMsg && clearForm) {
    clearForm();
  }
  return response;
};

export const updateOrganization = async (
  values: OrganizationFormData,
  organizationId: number
) => {
  const workingHours = finalizeWorkingHours(values.workingHours);
  const organization: ICreateOrganizationDTO = {
    name: values.name,
    description: values.description,
    phone: values.phone,
    address: values.address,
    ...workingHours,
  };
  const response = await organizationStore.editOrganization(
    organizationId,
    organization
  );
  return response;
};
