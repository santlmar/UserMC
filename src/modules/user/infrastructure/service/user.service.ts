import { Injectable, NotFoundException, RequestTimeoutException } from "@nestjs/common";
import { IUserService } from "../../domain/service/IUser.service";
import { IUser, IUserCreate, IUserUpdate } from "../../domain/interfaces/IUser";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService implements IUserService {
      constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService, // 🔹 Inyectamos correctamente el JwtService
      ) {}

      
    async update(id: IUser["id"], pastUser: IUserUpdate):Promise<boolean> {
      const user = await this.get(id);
 
      try {
        pastUser.auth = pastUser?.auth
        ? {
          ...user.auth,
          email: pastUser?.auth?.email || user.auth.email,
          password: pastUser?.auth?.password || user.auth.password,
        }
        : user.auth;
        console.log('userToUpdate', pastUser);
        await this.userRepository.save({
          ...user,
          ...pastUser,
        });
      } catch (error) {
        throw new RequestTimeoutException('Error updating User')
      }
      return true;
    }

    async create(userDto: IUserCreate): Promise<IUser> {
      let user: User | undefined;
      console.log(user)
      try {
        user = this.userRepository.create(userDto);
      } catch (error) {
        throw new RequestTimeoutException('Cannot create user', {
          description: 'Error creating user',
        });
      }
      const token = this.jwtService.sign({ id: user.id, email: user.auth.email });
      console.log(token)
      await this.userRepository.save(user);
    return user;
   }

    async get(id: IUser['id']): Promise<IUser> {
      try {
        const user = await this.userRepository.findOne({
          where: { id },
          relations: { auth: true },
        });
  
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
  
        return user;
      } catch (error) {
        throw new RequestTimeoutException('Error querying user');
      }
    }

  
}