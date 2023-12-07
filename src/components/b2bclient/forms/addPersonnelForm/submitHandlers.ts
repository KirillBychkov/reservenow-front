import { CreateManagerDTO } from '@/models/requests/ManagerRequests';
import personnelStore from '@/store/personnelStore';
import { ManagerFormData } from '@/types/manager';
import { formatObjectOut } from '@/utils/formatters/formatObject';

export const createManager = async (
  data: ManagerFormData,
  clearForm: () => void,
) => {
  const manager: CreateManagerDTO = {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone: data.phone,
    description: data.description,
  };
  const formattedManager = formatObjectOut(manager);
  const res = await personnelStore.createManager(formattedManager);
  if (res.successMsg && clearForm) {
    clearForm();
  }
  return res;
};
