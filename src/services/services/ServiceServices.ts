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

    async getAllByProvider(id: string): Promise<IServicesSavedDTO[]>{
        try {
            const {data} = await Api.get(`/services/provider/${id}`);
            return data
        } catch (error: any) {
            throw new Error(error.response.data.message)
        }
    }
}