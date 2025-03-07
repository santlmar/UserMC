import { IUser } from "src/modules/user/domain/interfaces/IUser";

export interface IAuth {
    id: number;
    email: string;
    password: string;
    user: IUser;
}

export interface IAuthCreate extends Omit<IAuth, 'id' | 'user'> {}
