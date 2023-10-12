import { IOrganization } from '@/models/IOrganization';
import { ICreateOrganizationDTO } from '@/models/requests/OrganizationRequests';
import OrganizationService from '@/services/organizationService';
import { CatchError } from '@/types/errors';
import { action, makeAutoObservable, observable, runInAction } from 'mobx';

class OrganizationStore {
  isLoading: boolean = false;
  isSuccess: boolean = false;
  isError: boolean = false;
  errorMessage: string = '';
  organizations: IOrganization[] | null = null;

  constructor() {
    makeAutoObservable(this, {
      organizations: observable,
      getOrganizations: action,
    });
    this.initOrg();
  }

  async getOrganizations() {
    if (this.isLoading) {
      return;
    }
    this.setLoading(true);
    try {
      const organizationsData = await OrganizationService.getOrganizations();
      runInAction(() => {
        this.organizations = organizationsData;
        this.setLoading(false);
        this.setSuccess(true);
      });
    } catch (e) {
      if (e instanceof Error) {
        this.setError(true, e.message as CatchError);
        this.setLoading(false);
      }
    }
  }

  async addOrganization(organization: ICreateOrganizationDTO) {
    try {
      await OrganizationService.addOrganization(organization);
    } catch (e) {
      if (e instanceof Error) {
        this.setError(true, e.message as CatchError);
      }
    }
  }

  /*
    UTILS 
  */

  initOrg() {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token && refreshToken) {
      this.getOrganizations();
    }
  }
  setSuccess(bool: boolean) {
    this.isSuccess = bool;
    this.resetError();
  }

  setError(bool: boolean, message: string) {
    this.isError = bool;
    this.errorMessage = message;
  }
  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  resetError() {
    this.isError = false;
    this.errorMessage = '';
  }
}

const organizationStore = new OrganizationStore();
export default organizationStore;
