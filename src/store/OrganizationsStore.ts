import { IOrganization } from '@/models/IOrganization';
import { ICreateOrganizationDTO } from '@/models/requests/OrganizationRequests';
import OrganizationService from '@/services/organizationService';
import { ResponseOrError, SuccessOrError } from '@/types/store';
import { makeAutoObservable } from 'mobx';

class OrganizationStore {
  errorMessage: string = '';
  organizations: IOrganization[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getOrganizations = async (): Promise<ResponseOrError<IOrganization[]>> => {
    try {
      const organizationsData = await OrganizationService.getOrganizations();
      this.setOrganizations(organizationsData);
      return { data: organizationsData, error: '' };
    } catch (e) {
      return { data: [], error: 'Error getting organizations' };
    }
  };

  addOrganization = async (
    organization: ICreateOrganizationDTO
  ): Promise<SuccessOrError> => {
    try {
      // const res = await OrganizationService.addOrganization(organization);
      // this.organizations?.push(res.data);
      console.log(organization);

      return { successMsg: 'Organization added', errorMsg: '' };
    } catch (e) {
      return { successMsg: '', errorMsg: 'Error while adding organization' };
    }
  };

  getOrganizationById = async (
    id: number
  ): Promise<ResponseOrError<IOrganization>> => {
    try {
      const res = await OrganizationService.getOrganizationById(id);
      console.log(res);

      return { data: res.data, error: '' };
    } catch (e) {
      return { data: {} as IOrganization, error: 'Error getting organization' };
    }
  };

  editOrganization = async (
    id: number,
    organization: ICreateOrganizationDTO
  ): Promise<ResponseOrError<IOrganization>> => {
    try {
      const res = await OrganizationService.editOrganization(id, organization);
      return { data: res.data, error: '' };
    } catch (e) {
      return {
        data: {} as IOrganization,
        error: 'Error while updating Organization',
      };
    }
  };

  uploadOrgImage = async (
    id: number,
    file: any
  ): Promise<ResponseOrError<IOrganization>> => {
    try {
      const organizationData = await OrganizationService.uploadImage(id, file);
      return { data: organizationData, error: '' };
    } catch (e) {
      return {
        data: {} as IOrganization,
        error: 'Error while uploading image',
      };
    }
  };

  /*
    UTILS 
  */

  setOrganizations(organizations: IOrganization[]) {
    this.organizations = organizations;
  }
}

const organizationStore = new OrganizationStore();
export default organizationStore;
