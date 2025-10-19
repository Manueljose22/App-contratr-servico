
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


