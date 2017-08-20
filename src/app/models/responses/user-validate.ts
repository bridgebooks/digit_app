import { User } from './user';

interface LoginResponseData {
    token: string;
    user: User;
}

export interface ValidateResponse {
    status: string;
    data: LoginResponseData;
}