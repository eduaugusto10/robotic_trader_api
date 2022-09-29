import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { CustomerOrderEntity } from "./CustomerOrderEntity"
import { OrderEntity } from "./OrderEntity"

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    account: number

    @Column()
    administrator: string

    @OneToMany(() => CustomerOrderEntity, (customerorder) => customerorder.customerOrder)
    customerorder: CustomerOrderEntity[]
    
    @OneToMany(() => OrderEntity, (operation) => operation.order)
    order: OrderEntity[]


}
