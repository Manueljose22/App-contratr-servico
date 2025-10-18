
export type IBbookingCreateDTO = {
    clientId: string;
    serviceId: string;
    providerId: string;
    price: number;
}

export type IBookingSavedDTO = {
    service: {
        price: number;
        provider: {
            user: {
                fullname: string;
            };
        };
        id: string;
        name: string;
        description: string | null;
    }
    id: string;
    price: number;
    status: "CONFIRMED" | "CANCELED" | "COMPLETED";
    createdAt: Date;
    updatedAt: Date;
    clientId: string;
    serviceId: string;
    providerId: string;
}