import { User } from '@/models/User';
import { CreateUserDTO, UpdateUserDTO } from '@/models/requests/UserRequests';
import { Filters } from '@/models/Filters';
import UserService from '@/services/userService';
import { ResponseOrError, SuccessOrError } from '@/types/store';
import { PlainUserInfo } from '@/types/user';
import { makeAutoObservable } from 'mobx';

class UsersStore {
  users: User[] = [];
  filters: Filters = { total: 0, limit: 8 };

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
    data: UpdateUserDTO
  ): Promise<SuccessOrError> => {
    try {
      await UserService.updateUser(id, data);
      return { successMsg: 'Updated client', errorMsg: '' };
    } catch (e) {
      return { successMsg: '', errorMsg: 'Error updating client' };
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
    id: number
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
    filters: Omit<Filters, 'total'>
  ): Promise<ResponseOrError<User[]>> => {
    try {
      const response = await UserService.getUsers(filters);
      if (response.data.data.length === 0) {
        return { data: [], error: 'No clients found' };
      }
      this.setFilters(response.data.filters);
      this.setClients(response.data.data);
      return { data: response.data.data, error: '' };
    } catch (e) {
      return { data: [], error: 'An error occurred while fetching clients.' };
    }
  };
}

const usersStore = new UsersStore();
export default usersStore;
