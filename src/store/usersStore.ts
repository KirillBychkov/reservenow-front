import { CreateUserDTO, UpdateUserDTO } from '@/models/requests/UserRequests';
import UserService from '@/services/userService';
import { ResponseOrError, SuccessOrError } from '@/types/store';
import { PlainUserInfo } from '@/types/user';
import { makeAutoObservable } from 'mobx';
import { User } from '@/models/User';
import { Filters } from '@/models/Filters';

class UsersStore {
  users: User[] = [];
  filters: Filters = { total: 0, limit: 4 };

  constructor() {
    makeAutoObservable(this);
  }

  getFilters() {
    return this.filters;
  }

  setClients(users: User[]) {
    this.users = users;
  }

  setFilters(filters: Filters) {
    this.filters = filters;
  }

  addUser = async (data: CreateUserDTO): Promise<SuccessOrError> => {
    try {
      await UserService.createUser(data);
      return { successMsg: 'Created client', errorMsg: '' };
    } catch (e) {
      return { successMsg: '', errorMsg: 'Error creating client' };
    }
  };

  updateUser = async (
    id: number,
    data: UpdateUserDTO,
  ): Promise<SuccessOrError> => {
    try {
      await UserService.updateUser(id, data);
      return { successMsg: 'Updated client', errorMsg: '' };
    } catch (e) {
      return { successMsg: '', errorMsg: 'Error updating client' };
    }
  };

  updateUserFull = async (
    id: number,
    data: UpdateUserDTO,
    file?: File,
  ): Promise<SuccessOrError> => {
    try {
      await UserService.updateUser(id, data);

      if (!file) {
        return { successMsg: 'User updated successfully', errorMsg: '' };
      }

      await UserService.uploadImageForUser(id, file);

      return { successMsg: 'User updated successfully', errorMsg: '' };
    } catch {
      return { successMsg: '', errorMsg: 'Error updating user' };
    }
  };

  getUserById = async (id: number): Promise<ResponseOrError<User>> => {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      return { data: user, error: '' };
    }
    try {
      const fetchedClient = await UserService.getUserById(id);
      this.users.push(fetchedClient.data);
      return { data: fetchedClient.data, error: '' };
    } catch (error) {
      return { data: {} as User, error: 'Client not found' };
    }
  };

  deleteUser = async (id: number): Promise<SuccessOrError> => {
    try {
      await UserService.deleteUser(id);
      this.users = this.users.filter((user) => user.id !== id);
      return { successMsg: 'Deleted client succesfully', errorMsg: '' };
    } catch (e) {
      return { successMsg: '', errorMsg: 'Error deleting client' };
    }
  };

  getPlainUserInfo = async (
    id: number,
  ): Promise<ResponseOrError<PlainUserInfo>> => {
    const { data: user, error } = await this.getUserById(id);
    if (error) {
      return { data: {} as PlainUserInfo, error: error };
    }
    const plainUserInfo: PlainUserInfo = {
      id: user.id,
      email: user?.account?.email || '',
      status: user?.account?.status,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      companyName: user.domain_url,
      description: user.description || '',
    };
    return { data: plainUserInfo, error: '' };
  };

  getUsers = async (
    filters: Omit<Filters, 'total'>,
  ): Promise<ResponseOrError<User[]>> => {
    try {
      const response = await UserService.getUsers(filters);

      this.setFilters(response.data.filters);
      this.setClients(response.data.data);
      return { data: response.data.data, error: '' };
    } catch (e) {
      return { data: [], error: 'An error occurred while fetching clients.' };
    }
  };

  exportUsers = async (
    filters: Omit<Filters, 'total'>,
  ): Promise<ResponseOrError<string>> => {
    try {
      const response = await UserService.exportUsers(filters);

      return { data: response.data, error: '' };
    } catch (e) {
      return { data: '', error: 'An error occurred while exporting clients.' };
    }
  };

  // Assume this is your function to initiate the export on the frontend
  initiateExport = async (filters: Omit<Filters, 'total'>) => {
    try {
      // Call your backend API to trigger the export
      const response = await this.exportUsers(filters);

      // Create a URL for the Blob
      const blobUrl = URL.createObjectURL(new Blob([response.data]));

      // Create a link element and trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = 'users.xlsx';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Clean up the Blob URL after the download link is clicked
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      // Handle other errors
      console.error('An error occurred:', error);
    }
  };
}

const usersStore = new UsersStore();
export default usersStore;
