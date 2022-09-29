import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity('tbcustomerorders')
export class CustomerOrderEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: '20' })
    symbol: string

    @Column("varchar", { length: '40' })
    ticket: string

    @Column({ type: 'float' })
    entry: number

    @Column({ type: 'float' })
    takeProfit: number

    @Column({ type: 'float' })
    stopLoss: number

    @Column({ type: 'integer' })
    typeOrder: number

    @Column({ type: 'integer' })
    operationType: number

    @Column({ type: 'float' })
    lote: number

    @Column("varchar", { length: '40' })
    status: string

    @ManyToOne(() => UserEntity, (user) => user.customerorder)
    customerOrder: UserEntity

}