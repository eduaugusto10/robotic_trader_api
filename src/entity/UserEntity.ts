import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { CustomerManagerEntity } from "./CustomerManagerEntity"
import { CustomerOrderEntity } from "./CustomerOrderEntity"

@Entity('tbuser')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: '100' })
    name: string

    @Column("varchar", { length: '100' })
    email: string

    @Column({ type: 'varchar' })
    password: string

    @Column("varchar", { length: '100' })
    account: number

    @Column("varchar", { length: '20' })
    administrator: string

    @Column('varchar', { length: '20' })
    ativated: string

    @OneToMany(() => CustomerOrderEntity, (customerorder) => customerorder.customerOrder)
    customerOrder: CustomerOrderEntity[]

    @OneToMany(() => CustomerManagerEntity, (operation) => operation.customer)
    customer: CustomerManagerEntity[]


}
