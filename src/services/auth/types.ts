
export type ISignUpDTO = {
    fullname: string;
    email: string;
    password: string;
    nif: string;
    role: 'Client' | 'Provider';
}


export type ISignInDTO ={
    email: string;
    password: string;
}


export type IUserAuth ={
    userId: string;
    name: string;
    role: 'Client' | 'Provider';
    token: string;
}


