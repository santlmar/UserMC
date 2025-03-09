import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsOptional, ValidateNested } from "class-validator";
import { UserDto } from "./user.dto";
import { Type } from 'class-transformer';
import { IAuthUpdateDto } from 'src/modules/auth/domain/interfaces/IAuth';
import { AuthUpdateDto } from 'src/modules/auth/infrastructure/dtos/auth-update.dto';


export class UserUpdateDto extends PartialType(
    OmitType(UserDto, ['auth'] as const),
  ) {
    @IsOptional()
    @ValidateNested()
    @Type(() => AuthUpdateDto)
    auth: IAuthUpdateDto;
  }