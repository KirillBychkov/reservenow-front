import $api from "@/http";
import { IOrganization } from "@/models/IOrganization";
import { ICreateOrganizationDTO } from "@/models/requests/OrganizationRequests";
import { AxiosResponse } from "axios";

export default class OrganizationService {
  static async getOrganizations(): Promise<IOrganization[]> {
    const response = await $api.get("/organization");
    return response.data;
  }

  static async addOrganization(
    organization: ICreateOrganizationDTO
  ): Promise<AxiosResponse<IOrganization>> {
    const response = await $api.post("/organization", organization);
    return response.data;
  }

  static async getOrganizationById(
    id: number
  ): Promise<AxiosResponse<IOrganization>> {
    return $api.get(`/organization/${id}`);
  }

  static async uploadImage(id: number, file: any): Promise<AxiosResponse> {
    const formData = new FormData();
    formData.append("image", file);
    const reponse = await $api.post(
      `/organization/upload/image/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return reponse.data;
  }

  static async editOrganization(
    id: number,
    organization: ICreateOrganizationDTO
  ): Promise<AxiosResponse<IOrganization>> {
    return $api.patch(`/organization/${id}`, organization);
  }
}
