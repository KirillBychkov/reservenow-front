import { CreateOrganizationDTO } from '@/models/requests/OrganizationRequests';
import organizationStore from '@/store/organizationsStore';
import { OrganizationFormData } from '@/types/organization';
import { finalizeWorkingHours } from '@/utils/formHelpers/formHelpers';
import { formatObjectOut } from '@/utils/formatters/formatObject';

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
  const formattedOrganization = formatObjectOut(organization);
  console.log(formattedOrganization);

  const response = await organizationStore.addOrganization(
    formattedOrganization,
    file,
  );
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
  const formattedOrganization = formatObjectOut(organization);
  const response = await organizationStore.editOrganization(
    organizationId,
    formattedOrganization,
    file,
  );
  return response;
};
