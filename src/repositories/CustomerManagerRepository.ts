import { AppDataSource } from "../data-source"
import { CustomerManagerEntity } from "../entity/CustomerManagerEntity"

export const customerManagerRepository = AppDataSource.getRepository(CustomerManagerEntity).extend({
    findTwelveMonthsById(id: number) {
        return this.createQueryBuilder()
            .select("sum(balance)", "balance")
            .addSelect("MONTH(date)", "month")
            .addSelect("Year(date)", "year")
            .addSelect("closedOrders")
            .addSelect("percClosedOrders")
            .addSelect("percOpenOrders")
            .addSelect("openOrders")
            .where("customerId = :id", { id })
            .andWhere("date > (now() - INTERVAL 12 month)")
            .groupBy("MONTH(date)")
            .orderBy("date", "ASC")
            .getRawMany()
    },
    findTwelveMonths() {
        return this.createQueryBuilder()
            .select("sum(balance)", "balance")
            .addSelect("Month(date)", "month")
            .addSelect("Year(date)", "year")
            .where("date > (now() - INTERVAL 12 month)")
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