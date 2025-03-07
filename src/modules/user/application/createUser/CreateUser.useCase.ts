import { IHashProvider } from 'src/common/domain/services/IHash.service';
import { IUser, IUserCreate } from '../../domain/interfaces/IUser';
import { IUserService } from '../../domain/service/IUser.service';
import { Inject } from '@nestjs/common';


export class CreateUserUseCase {
  constructor(
     private readonly userService: IUserService,
    private readonly hashProvider: IHashProvider,  
  ) {}

  async run(data: IUserCreate): Promise<IUser> {
    const newPassowrd = this.hashProvider.encrypt(data.auth.password);
    data.auth.password = newPassowrd;
    const newUser = await this.userService.create(data);
    console.log(newUser)

    return newUser;
  }
}
