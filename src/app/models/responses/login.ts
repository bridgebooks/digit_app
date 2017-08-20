import { User } from './user';

interface LoginResponseData {
    token: string;
    user: User;
}

export interface LoginResponse {
    status: string;
    data: LoginResponseData;
}