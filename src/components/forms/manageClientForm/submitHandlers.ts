import {
  CreateClientDTO,
  UpdateClientDTO,
} from '@/models/requests/ClientRequests';
import clientStore from '@/store/clientStore';
import { ClientFormData } from '@/types/client';
import { ClientStatus } from '@/types/enums/client';
import { formatObjectOut } from '@/utils/formatters/formatObject';

export const createClient = async (
  values: ClientFormData,
  clearForm?: () => void,
) => {
  const client: CreateClientDTO = {
    first_name: values.first_name,
    last_name: values.last_name,
    phone: values.phone,
    description: values.description,
  };

  const response = await clientStore.addClient(formatObjectOut(client));

  if (response.successMsg && clearForm) {
    clearForm();
  }

  return response;
};

export const updateClient = async (
  values: ClientFormData,
  clientId: number,
) => {
  const client: UpdateClientDTO = {
    first_name: values.first_name,
    last_name: values.last_name,
    phone: values.phone,
    description: values.description,
    status: values.status?.value as ClientStatus,
  };
  const response = await clientStore.updateClient(
    clientId,
    formatObjectOut(client),
  );

  return response;
};
