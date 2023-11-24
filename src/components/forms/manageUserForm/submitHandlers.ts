import { ICreateUserDTO, IUpdateUserDTO } from "@/models/requests/UserRequests";
import usersStore from "@/store/UsersStore";
import { UserFormData } from "@/types/user";

export const createUser = async (
  values: UserFormData,
  clearForm?: () => void
) => {
  const user: ICreateUserDTO = {
    email: values.email,
    user: {
      first_name: values.firstName,
      last_name: values.lastName,
      phone: values.phone,
      domain_url: values.companyName,
      description: values.description,
    },
  };

  const response = await usersStore.addUser(user);

  if (response.successMsg && clearForm) {
    clearForm();
  }

  return response;
};

export const updateUser = async (values: UserFormData, userId: number) => {
  const user: IUpdateUserDTO = {
    first_name: values.firstName,
    last_name: values.lastName,
    phone: values.phone,
    domain_url: values.companyName,
    description: values.description,
  };

  const response = await usersStore.updateUser(userId, user);

  return response
};
