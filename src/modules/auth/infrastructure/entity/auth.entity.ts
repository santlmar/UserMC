import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IAuth } from '../../../auth/domain/interfaces/IAuth';
import { IUser } from 'src/modules/user/domain/interfaces/IUser';
import { User } from 'src/modules/user/infrastructure/entity/user.entity';


@Entity('auth')
export class Auth implements IAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => User, (user) => user.auth)
  user: IUser;
}
