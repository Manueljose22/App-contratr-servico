
export type IBookingDTO = {
    clientId: string;
    serviceId: string;
    providerId: string;
    bookingId: string;
    dateBooking: Date
    price: number;
}

export type IBookingSavedDTO = {
    service: {
        price: number;
        provider: {
            user: {
                fullname: string;
            };
            balance: number;
        };
        id: string;
        name: string;
        description: string | null;
    }
    client: {
        user: {
            fullname: string;
        };
    }
    id: string;
    price: number;
    status: "CONFIRMED" | "CANCELED" | "COMPLETED";
    createdAt: Date;
    updatedAt: Date;
    clientId: string;
    serviceId: string;
    dateBooking: Date;
    providerId: string;
}
