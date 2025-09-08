import { ProductByMonthModel, SalesByDayModel, SalesByMonthModel, SalesMonthByPaymentModel, SalesMonthByUserModel } from "../models/ChartModels.tsx";
import { Database, formatError } from "./DatabaseClient.tsx";

const ChartService = {

    getSalesByMonth: async (): Promise<{ data: SalesByMonthModel[], error: string | undefined }> => {
        const { data, error } = await Database.rpc("sales_per_month");

        //       id: item.id,
        // description: item.name,
        // buyPrice: item.buy_price,
        // priceOne: item.price_one,
        // priceTwo: item.price_two,

        // const list = data ? data.map((item): SalesPerMonthModel => ({
        //     month: item.mes,
        //     total: item.
        // })) : []

        // console.log(`getSalesPerMonth:`, data)
        return {
            data: data,
            error: formatError(error)
        };
    },

    getSalesByDay: async (month: string): Promise<{ data: SalesByDayModel[], error: string | undefined }> => {
        const { data, error } = await Database.rpc("sales_per_day", { p_month: month });

        // console.log(`getSalesPerMonth:`, data)
        return {
            data: data,
            error: formatError(error)
        };
    },

    getSalesByUser: async (month: string): Promise<{ data: SalesMonthByUserModel[], error: string | undefined }> => {
        const { data, error } = await Database.rpc("sales_per_user", { p_month: month });
        return {
            data: data,
            error: formatError(error)
        };
    },

    getSalesByPayment: async (month: string): Promise<{ data: SalesMonthByPaymentModel[], error: string | undefined }> => {
        const { data, error } = await Database.rpc("sales_per_payment", { p_month: month });
        return {
            data: data,
            error: formatError(error)
        };
    },

    getProductsByMonth: async (month: string): Promise<{ data: ProductByMonthModel[], error: string | undefined }> => {
        const { data, error } = await Database.rpc("product_per_month", { p_month: month });
        return {
            data: data,
            error: formatError(error)
        };
    },
};

export { ChartService };