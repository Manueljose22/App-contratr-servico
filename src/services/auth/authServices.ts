import { Api } from "@/utils/Api";
import { ISignInDTO, ISignUpDTO, IUserAuth } from "./types";






export const AuthServices = {

    async signUp(dataUser: ISignUpDTO): Promise<IUserAuth>{
        try {
            const {data} = await Api.post("/auth/signUp", dataUser);
            return data;
        } catch (error: any) {
            throw new Error(error.response.data.message)
        }
    },

    async signIn(dataUser: ISignInDTO): Promise<IUserAuth>{
        try {
            const {data} = await Api.post("/auth/signIn", dataUser);
            return data;
        } catch (error: any) {
            throw new Error(error.response.data.message)
        }
    }
}