import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity('tbcustomermanager')
export class CustomerManagerEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'float' })
    balance: number

    @ManyToOne(() => UserEntity, (user) => user.customer)
    customer: UserEntity
}