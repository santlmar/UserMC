import { IAuthCreate } from "src/modules/auth/domain/interfaces/IAuth";
import { IUserCreate } from "../../domain/interfaces/IUser";
import { IsInt, IsNotEmpty, IsString, Matches, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { AuthDto } from "src/modules/auth/infractructure/dtos/auth.dto";

export class UserDto implements IUserCreate {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsInt()
    age: number;

    @IsNotEmpty()
    @IsInt()
    phone: number;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(M|F)$/, {
        message: "El género debe ser 'M', 'F'",
    })
    gender: string;
    
    @IsNotEmpty()
    @ValidateNested()
    @Type(()=> AuthDto)
    auth: IAuthCreate;
}
