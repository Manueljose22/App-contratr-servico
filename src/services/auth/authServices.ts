import { Api } from "@/utils/Api";
import { ISignInDTO, ISignUpDTO, IUserAuth, IUserSavedDTO } from "./types";






export const AuthServices = {

    async signUp(dataUser: ISignUpDTO): Promise<IUserAuth>{
        try {
            const {data} = await Api.post("/auth/signUp", dataUser);
            return data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.message);
            }
            throw new Error("Ocorreu um erro. Tente novamente mais tarde.");
        }
    },

    async signIn(dataUser: ISignInDTO): Promise<IUserAuth>{
        try {
            const {data} = await Api.post("/auth/signIn", dataUser);
            return data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.message);
            }
            throw new Error("Ocorreu um erro. Tente novamente mais tarde.");
        }
    },

    async profile(): Promise<IUserSavedDTO>{
        try {
            const {data} = await Api.get("/users/profile");
            return data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.message);
            }
            throw new Error("Ocorreu um erro. Tente novamente mais tarde.");
        }
    }
}