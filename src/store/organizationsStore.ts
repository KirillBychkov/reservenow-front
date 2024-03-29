import { Organization, OrganizationStatistics } from '@/models/Organization';
import { CreateOrganizationDTO } from '@/models/requests/OrganizationRequests';
import OrganizationService from '@/services/organizationService';
import { ResponseOrError, SuccessOrError } from '@/types/store';
import { makeAutoObservable } from 'mobx';

class OrganizationStore {
  errorMessage: string = '';
  organizations: Organization[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getOrganizations = async (): Promise<ResponseOrError<Organization[]>> => {
    try {
      const response = await OrganizationService.getOrganizations();
      this.setOrganizations(response.data);
      return { data: response.data, error: '' };
    } catch (e) {
      return { data: [], error: 'Error getting organizations' };
    }
  };

  getOrganizationStatistics = async (
    id: number,
    dates: { start_date: string; end_date: string },
  ): Promise<ResponseOrError<OrganizationStatistics>> => {
    const { start_date, end_date } = dates;
    try {
      const response = await OrganizationService.getOrganizationStatistics(
        id,
        start_date,
        end_date,
      );
      return { data: response.data, error: '' };
    } catch (e) {
      return {
        data: {} as OrganizationStatistics,
        error: 'Error getting organization statistics',
      };
    }
  };

  deleteOrganization = async (id: number): Promise<SuccessOrError> => {
    try {
      await OrganizationService.deleteOrganization(id);
      this.organizations = this.organizations.filter(
        (organization) => organization.id !== id,
      );
      return { successMsg: 'Organization deleted successfully', errorMsg: '' };
    } catch (e) {
      return { successMsg: '', errorMsg: 'Error deleting organization' };
    }
  };

  addOrganization = async (
    organization: CreateOrganizationDTO,
    file?: File,
  ): Promise<SuccessOrError> => {
    try {
      const res = await OrganizationService.addOrganization(organization);
      this.organizations?.push(res.data);
      if (!file) {
        return { successMsg: 'Organization added', errorMsg: '' };
      }
      const uploadRes = await this.uploadOrgImage(res.data.id, file);
      return uploadRes;
    } catch (e) {
      return { successMsg: '', errorMsg: 'Error while adding organization' };
    }
  };

  getOrganizationById = async (
    id: number,
  ): Promise<ResponseOrError<Organization>> => {
    try {
      const res = await OrganizationService.getOrganizationById(id);
      this.setOrganizations([...this.organizations, res.data]);
      return { data: res.data, error: '' };
    } catch (e) {
      return { data: {} as Organization, error: 'Error getting organization' };
    }
  };

  editOrganization = async (
    id: number,
    organization: CreateOrganizationDTO,
    file?: File,
  ): Promise<SuccessOrError> => {
    try {
      await OrganizationService.editOrganization(id, organization);
      if (!file) {
        return {
          successMsg: 'Updated organization successfully',
          errorMsg: '',
        };
      }
      const uploadRes = await this.uploadOrgImage(id, file);
      return uploadRes;
    } catch (e) {
      return {
        successMsg: '',
        errorMsg: 'Error while updating Organization',
      };
    }
  };

  uploadOrgImage = async (id: number, file: File): Promise<SuccessOrError> => {
    try {
      await OrganizationService.uploadImage(id, file);

      return { successMsg: 'Image uploaded', errorMsg: '' };
    } catch (e) {
      return {
        successMsg: '',
        errorMsg: 'Error while uploading image',
      };
    }
  };

  deleteImage = async (id: number): Promise<SuccessOrError> => {
    try {
      await OrganizationService.deleteImage(id);

      return { successMsg: 'Image deleted successfully', errorMsg: '' };
    } catch (e) {
      return {
        successMsg: '',
        errorMsg: 'Error while uploading image',
      };
    }
  };

  /*
    UTILS 
  */

  setOrganizations(organizations: Organization[]) {
    this.organizations = organizations;
  }

  getOrganizationByIdFromStore(id: number): Organization | undefined {
    return this.organizations.find((organization) => organization.id === id);
  }
}

const organizationStore = new OrganizationStore();
export default organizationStore;
