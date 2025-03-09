import { Body, Controller, Get, HttpStatus, Inject, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { GetUserUseCase } from "../../application/getUser/GetUser.useCase";
import { ResponseAdapter } from './../../../../../common/response-adapter/response.adapter';
import { HTTP_RESPONSE_MESSAGE } from "common/constants/http-message";
import { KEYS } from "common/constants/keys";
import { CreateUserUseCase } from "../../application/createUser/CreateUser.useCase";
import { UserDto } from "../dtos/user.dto";
import { UpdateUserUseCase } from "../../application/updateUser/UpdateUser.useCase";
import { IUserUpdate } from "../../domain/interfaces/IUser";
import { JwtAuthGuard } from "src/modules/auth/infrastructure/guard/jwt/jwt-auth.guard";
import { ITokenPayload } from "src/modules/auth/infrastructure/interfaces/IToken";

@Controller('user')
export class UserController {
    constructor(
        @Inject('GetUserUseCase')
        private readonly getuserUseCase: GetUserUseCase,
        @Inject('CreateUserUseCase')
        private readonly createUserUseCase: CreateUserUseCase,
        @Inject('UpdateUserUseCase')
        private readonly updateUserUseCase: UpdateUserUseCase,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    public async getUser(@Req() request: Request) {
      const auth: ITokenPayload = request[KEYS.USER] as ITokenPayload;
      console.log('ID extraído del token:', auth.id); // 🔹 Verifica si auth.id es el user.id o auth.id
      return ResponseAdapter.set(
        HttpStatus.OK,
        await this.getuserUseCase.run(auth.id),
        HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
        true,
      );
    }

    @Post()
    public async createUser(@Body() UserDto: UserDto) {
      
      const newUser = await this.createUserUseCase.run(UserDto);
      return ResponseAdapter.set(
        HttpStatus.CREATED,
        newUser,
        HTTP_RESPONSE_MESSAGE.HTTP_201_CREATED,
        true,
      );
    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    public async updateUser(@Body() user: IUserUpdate, @Req() req: Request) {
      const token: ITokenPayload = req[KEYS.USER] as ITokenPayload;
      
      return ResponseAdapter.set(
        HttpStatus.OK,
        await this.updateUserUseCase.run(token.id, user),
        HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
        true,
      );
    }
}