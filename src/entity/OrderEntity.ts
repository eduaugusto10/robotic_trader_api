import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity";

export class OrderEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar' })
    symbol: string

    @Column({ type: 'varchar' })
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

    @Column({ type: 'varchar' })
    status: string

    @ManyToOne(() => UserEntity, (user) => user.order)
    order: UserEntity

}