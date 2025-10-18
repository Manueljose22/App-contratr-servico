import { Api } from "@/utils/Api";
import { IServicesSavedDTO } from "./types";





export const ServiceServices = {

    async getAll(): Promise<IServicesSavedDTO[]>{
        try {
            const {data} = await Api.get("/services");
            return data
        } catch (error: any) {
            throw new Error(error.response.data.message)
        }
    }
}