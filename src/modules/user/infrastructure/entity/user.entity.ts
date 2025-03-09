import { IAuth } from "src/modules/auth/domain/interfaces/IAuth";
import { IUser } from "../../domain/interfaces/IUser";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auth } from "src/modules/auth/infrastructure/entity/auth.entity";


@Entity('user')
export class User implements IUser {
    @PrimaryGeneratedColumn() 
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    lastname: string;
    
    @Column()
    age: number;
        
    @Column()
    phone: number;
    
    @Column()
    gender: string;
    
    @OneToOne(() => Auth, { cascade: true })
    @JoinColumn()
    auth: IAuth;
}