import { Module } from "@nestjs/common";
import { UserController } from "./infrastructure/controller/user.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./infrastructure/entity/user.entity";
import { UserService } from "./infrastructure/service/user.service";
import { GetUserUseCase } from "./application/getUser/GetUser.useCase";
import { CreateUserUseCase } from "./application/createUser/CreateUser.useCase";
import { UpdateUserUseCase } from "./application/updateUser/UpdateUser.useCase";
import { HashProvider } from "src/shared/providers/hash.provider/hash.provider";
import { JwtAuthGuard } from "../auth/infractructure/jwt/jwt-auth.guard";
import { JwtProvider } from "src/shared/providers/jwt.provider/jwt.provider";
import { IUserService } from "./domain/service/IUser.service";
import { IHashProvider } from "src/common/domain/services/IHash.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  providers: [

    {
      provide: 'UserService',
      useClass: UserService,
    },
    {
      provide: 'HashProvider',
      useClass: HashProvider,
    },
    {
      provide: 'CreateUserUseCase',
      useFactory: (
        userService: IUserService,
        hashProvider: IHashProvider,
      ) => new CreateUserUseCase(userService, hashProvider),
      inject: ['UserService', 'HashProvider'],
    },
    {
      provide: 'UpdateUserUseCase',
      useFactory: (userService: IUserService, hashProvider: IHashProvider) =>
        new UpdateUserUseCase(userService, hashProvider),
      inject: ['UserService', 'HashProvider'],
    },
    {
      provide: 'GetUserUseCase',
      useFactory: (userService: IUserService) =>
        new GetUserUseCase(userService),
      inject: ['UserService'],
    },
      JwtAuthGuard,
      JwtProvider,
  ],
  exports: [TypeOrmModule, 'UserService'],
})
export class UserModule {}