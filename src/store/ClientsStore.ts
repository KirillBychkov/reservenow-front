import { IUser } from '@/models/IUser';
import UserService from '@/services/userService';
import { makeAutoObservable } from 'mobx';

class ClientsStore {
  clients = [] as IUser[];

  constructor() {
    makeAutoObservable(this);
  }

  setClients(clients: IUser[]) {
    this.clients = clients;
  }

  getUserById(id: number) {
    return this.clients.find((client) => client.id === id);
  }

  async getClients() {
    try {
      const response = await UserService.getUsers();
      this.setClients(response.data);
    } catch (e) {
      console.log(e);
    }
  }
}

const clientsStore = new ClientsStore();
export default clientsStore;
