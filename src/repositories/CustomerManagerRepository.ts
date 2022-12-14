import { AppDataSource } from "../data-source"
import { CustomerManagerEntity } from "../entity/CustomerManagerEntity"

export const customerManagerRepository = AppDataSource.getRepository(CustomerManagerEntity).extend({
    findTwelveMonthsById(id: number) {
        return this.createQueryBuilder()
            .select("sum(balance)", "balance")
            .addSelect("MONTH(date)", "month")
            .addSelect("Year(date)", "year")
            .addSelect("closedOrdersInsider")
            .addSelect("openOrdersInsider")
            .addSelect("closedOrdersExplicitus")
            .addSelect("openOrdersExplicitus")
            .addSelect("closedOrdersPoupDobrada")
            .addSelect("openOrdersPoupDobrada")
            .where("customerId = :id", { id })
            .andWhere("date >= (now() - INTERVAL 12 month)")
            .groupBy("MONTH(date)")
            .orderBy("date", "DESC")
            .getRawMany()
    },
    findTwelveMonths() {
        return this.createQueryBuilder()
            .select("sum(balance)", "balance")
            .addSelect("Month(date)", "month")
            .addSelect("Year(date)", "year")
            .where("date >= (now() - INTERVAL 12 month)")
            .groupBy("MONTH(date)")
            .orderBy("date", "ASC")
            .getRawMany()
    },
    findBalanceById(id: number) {
        return this.createQueryBuilder()
            .select("*")
            .where("customerId=:id", { id })
            .orderBy("id", "ASC")
            .limit(1)
            .getRawMany()
    }
})