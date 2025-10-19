import { Api } from "@/utils/Api";
import { IBookingDTO, IBookingSavedDTO } from "./types";




export const BookingsServices = {

    async getAllByUser(): Promise<IBookingSavedDTO[] | null>{
        try {
            const {data} = await Api.get(`/bookings/user`);
            return data
        } catch (error: any) {
            throw new Error(error.response.data.message)
        }
    },

    async getAll(): Promise<IBookingSavedDTO[]>{
        try {
            const {data} = await Api.get("/bookings");
            return data
        } catch (error: any) {
            throw new Error(error.response.data.message)
        }
    },

    async create(dataBooking: Omit <IBookingDTO, "bookingId" | "dateBooking">): Promise<void>{
         try {
            const {data} = await Api.post("/bookings", dataBooking );
            return data
        } catch (error: any) {
            throw new Error(error.response.data.message)
        }
    },

    async updateBooking(dataBooking: {bookingId: string, status: string, dataBooking?: Date }): Promise<void>{
         try {
            const {data} = await Api.put(`/bookings/${dataBooking.bookingId}`, dataBooking);
            return data
        } catch (error: any) {
            throw new Error(error.response.data.message)
        }
    }
}

