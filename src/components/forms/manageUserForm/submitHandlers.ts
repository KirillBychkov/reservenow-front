import { CreateUserDTO, UpdateUserDTO } from '@/models/requests/UserRequests';
import usersStore from '@/store/usersStore';
import { UserFormData } from '@/types/user';
import { formatObjectOut } from '@/utils/formatters/formatObject';

export const createUser = async (
  values: UserFormData,
  clearForm?: () => void,
) => {
  const user: CreateUserDTO = {
    email: values.email,
    user: {
      first_name: values.firstName,
      last_name: values.lastName,
      phone: values.phone,
      domain_url: values.companyName,
      description: values.description,
    },
  };
  const formattedUser = {
    ...user,
    user: formatObjectOut(user.user),
  };
  const response = await usersStore.addUser(formattedUser);

  if (response.successMsg && clearForm) {
    clearForm();
  }

  return response;
};

export const updateUser = async (values: UserFormData, userId: number) => {
  const user: UpdateUserDTO = {
    first_name: values.firstName,
    last_name: values.lastName,
    phone: values.phone,
    domain_url: values.companyName,
    description: values.description,
  };
  const formattedUser = formatObjectOut(user);
  const response = await usersStore.updateUser(userId, formattedUser);

  return response;
};
