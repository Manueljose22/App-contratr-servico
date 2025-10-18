import { Api } from "@/utils/Api";
import { IBbookingCreateDTO, IBookingSavedDTO } from "./types";






export const BookingsServices = {

    async getAll(): Promise<IBookingSavedDTO[]>{
        try {
            const {data} = await Api.get("/bookings");
            return data
        } catch (error: any) {
            throw new Error(error.response.data.message)
        }
    },

    async create(dataBooking: IBbookingCreateDTO): Promise<void>{
         try {
            const {data} = await Api.post("/bookings", dataBooking );
            return data
        } catch (error: any) {
            throw new Error(error.response.data.message)
        }
    },

    async cancel(id: string): Promise<void>{
         try {
            const {data} = await Api.put(`/bookings/cancel/${id}`);
            return data
        } catch (error: any) {
            throw new Error(error.response.data.message)
        }
    },

    async update(id: string, dataBooking: IBbookingCreateDTO): Promise<void>{
         try {
            const {data} = await Api.put(`/bookings/cancel/${id}`);
            return data
        } catch (error: any) {
            throw new Error(error.response.data.message)
        }
    }
}




// router.post('/bookings/'
// router.get('/bookings'
// router.get('/bookings/user'
// router.get('/bookings/:id'
// router.put('/bookings/cancel/:id'
// router.put('/bookings/:id'