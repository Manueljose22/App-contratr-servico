
export type ISignUpDTO = {
    fullname: string;
    email: string;
    password: string;
    nif: string;
    role: 'CLIENT' | 'PROVIDER';
}


export type ISignInDTO = {
    email: string;
    password: string;
}


export type IUserAuth = {
    userId: string;
    name: string;
    role: 'CLIENT' | 'PROVIDER';
    token: string;
}

export type IUserSavedDTO = {
    id: string;
    fullname: string;
    email: string;
    nif: string;
    password: string;
    role: 'CLIENT' | 'PROVIDER';
    createdAt: Date;
    updatedAt: Date;
    client: {
        id: string;
        balance: number;
    } | null;
    provider: {
        id: string;
        balance: number;
    } | null;
    
}

