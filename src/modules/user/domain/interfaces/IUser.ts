import { IAuth, IAuthCreate } from "src/modules/auth/domain/interfaces/IAuth";
import { IAuthUpdateDto } from "src/modules/auth/infractructure/dtos/auth.dto";

export interface IUser {
    id: number;
    name: string;
    lastname: string;
    age: number;
    phone: number;
    gender: string;
    auth: IAuth;
}

export interface IUserCreate extends Omit<IUser,'id' | 'auth'> {
  auth: IAuthCreate;
}

export interface IUserUpdate
  extends Partial<
    Omit<IUserCreate,'auth'>
  > {
  auth: IAuthUpdateDto;

}
export interface IUserDto extends Omit<IUser, 'id' | 'appointments'> {}
