import { Organization } from '@/models/Organization';
import { CreateOrganizationDTO } from '@/models/requests/OrganizationRequests';
import OrganizationService from '@/services/organizationService';
import { ResponseOrError, SuccessOrError } from '@/types/store';
import { makeAutoObservable } from 'mobx';

class OrganizationStore {
  errorMessage: string = '';
  organizations: Organization[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getOrganizations = async (): Promise<ResponseOrError<Organization[]>> => {
    try {
      const organizationsData = await OrganizationService.getOrganizations();
      this.setOrganizations(organizationsData);
      return { data: organizationsData, error: '' };
    } catch (e) {
      return { data: [], error: 'Error getting organizations' };
    }
  };

  addOrganization = async (
    organization: CreateOrganizationDTO,
  ): Promise<SuccessOrError> => {
    try {
      const res = await OrganizationService.addOrganization(organization);
      this.organizations?.push(res.data);

      return { successMsg: 'Organization added', errorMsg: '' };
    } catch (e) {
      return { successMsg: '', errorMsg: 'Error while adding organization' };
    }
  };

  getOrganizationById = async (
    id: number,
  ): Promise<ResponseOrError<Organization>> => {
    try {
      const res = await OrganizationService.getOrganizationById(id);

      return { data: res.data, error: '' };
    } catch (e) {
      return { data: {} as Organization, error: 'Error getting organization' };
    }
  };

  editOrganization = async (
    id: number,
    organization: CreateOrganizationDTO,
  ): Promise<SuccessOrError> => {
    try {
      await OrganizationService.editOrganization(id, organization);
      return { successMsg: 'Updated organization succesfully', errorMsg: '' };
    } catch (e) {
      return {
        successMsg: '',
        errorMsg: 'Error while updating Organization',
      };
    }
  };

  uploadOrgImage = async (
    id: number,
    file: any,
  ): Promise<ResponseOrError<Organization>> => {
    try {
      const organizationData = await OrganizationService.uploadImage(id, file);
      return { data: organizationData, error: '' };
    } catch (e) {
      return {
        data: {} as Organization,
        error: 'Error while uploading image',
      };
    }
  };

  /*
    UTILS 
  */

  setOrganizations(organizations: Organization[]) {
    this.organizations = organizations;
  }
}

const organizationStore = new OrganizationStore();
export default organizationStore;
