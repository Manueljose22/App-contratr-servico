import { Api } from "@/utils/Api";
import { IServicesCreateDTO, IServicesSavedDTO } from "./types";





export const ServiceServices = {

    async create(data: IServicesCreateDTO): Promise<void>{
        try {
            await Api.post("/services", data);
        } catch (error: any) {
            throw new Error(error.response.data.message)
        }
    },
    async getAll(): Promise<IServicesSavedDTO[]>{
        try {
            const {data} = await Api.get("/services");
            return data
        } catch (error: any) {
            throw new Error(error.response.data.message)
        }
    },

    async getById(serviceId: string): Promise<IServicesSavedDTO>{
        try {
            const {data} = await Api.get(`/services/${serviceId}`);
            return data
        } catch (error: any) {
            throw new Error(error.response.data.message)
        }
    },

    async getAllByProvider(id: string): Promise<IServicesSavedDTO[]>{
        try {
            const {data} = await Api.get(`/services/provider/${id}`);
            return data
        } catch (error: any) {
            throw new Error(error.response.data.message)
        }
    },

    async upadte(id: string, data: Omit<IServicesCreateDTO, 'providerId'>): Promise<void>{
        try {
            await Api.put(`/services/${id}`, data);
        } catch (error: any) {
            throw new Error(error.response.data.message)
        }
    },

    async delete(id: string): Promise<void>{
        try {
            await Api.delete(`/services/${id}`);
        } catch (error: any) {
            throw new Error(error.response.data.message)
        }
    }
}