export type IServicesCreateDTO = {
    name: string;
    description: string;
    price: number;
    providerId: string;
}


export type IServicesSavedDTO = {
    id: string;
    providerId: string;
    name: string;
    description: string | null;
    price: number;
    provider: {
        user: {
            fullname: string;
            email: string;
        };
    }
    createdAt: Date;
    updatedAt: Date;
}