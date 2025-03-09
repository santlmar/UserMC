import {Body,Controller,HttpStatus,Inject,Post,} from '@nestjs/common';
import { AuthUserUseCase } from '../../application/authUser/AuthUser.useCase';
import { AuthDto } from '../dtos/auth.dto';
import { HTTP_RESPONSE_MESSAGE } from 'common/constants/http-message';
import { ResponseAdapter } from 'common/response-adapter/response.adapter';


@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthUserUseCase')
    private readonly authUSerUseCase: AuthUserUseCase,
  ) {}

  @Post()
  async login(@Body() authDto: AuthDto) {
    const response = await this.authUSerUseCase.run(authDto);
    return ResponseAdapter.set(
      HttpStatus.OK,
      response,
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }
}
