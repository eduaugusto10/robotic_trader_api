import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
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

    @Column("varchar", { length: '20' })
    phone: string

    @Column({ type: 'varchar' })
    password: string

    @Column("varchar", { length: '50' })
    broker: string

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

    @Column({ type: 'integer' })
    multpInsider: number

    @Column({ type: 'datetime' })
    validateInsider: Date

    @Column({ type: 'integer' })
    multpExplicitus: number

    @Column({type:'varchar'})
    passBroker: string

    @Column({ type: 'datetime' })
    validateExplicitus: Date

    @Column({ type: 'integer' })
    multpPoupDobrada: number

    @Column({ type: 'datetime' })
    validatePoupDobrada: Date

    @Column({ type: 'varchar' })
    description: string

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    update_at: Date

}
