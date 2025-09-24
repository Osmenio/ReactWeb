import { FilterBalanceModel, ItemBalanceModel, ItemSaleModel, PaymentTypeEnum, ProductModel, SaleModel, SalesResumeModel, UserProfileEnum, UserStatusEnum } from "../models";
import { DefaultItemSaleModel, DefaultProductModel } from "../models/DefaultModels.tsx";
import { Database, formatError } from "./DatabaseClient";

const PAGE_SIZE = 10
const SaleService = {

    getAll: async (): Promise<{ sales: SaleModel[], error: string | undefined }> => {
        const { data, error } = await Database
            .from("Sale")
            .select(`
                id,
                client,
                address,
                payment_type,
                timestamp,
                user:user_id (
                    id,
                    name,
                    login
                ),
                itemsSale:ItemSale (
                    id,
                    buy_price,
                    count,
                    unit_price,
                    discount,
                    product:product_id (
                        id,
                        name,
                        buy_price
                    )
                )
            `);

        // console.log(`getAll:data`, data)
        const list = data ? (data as any[]).map((sale): SaleModel => ({
            id: sale.id,
            user: {
                id: sale.user.id,
                name: sale.user.name,
                login: sale.user.login,
                profile: UserProfileEnum.Admin,
                status: UserStatusEnum.Active
            },
            client: sale.client,
            address: sale.address,
            paymentType: PaymentTypeEnum.Pix,
            timestamp: sale.timestamp,
            itemsSale: sale.itemsSale.map((item: any) => ({
                id: item.id,
                count: item.count,
                unitPrice: item.unit_price,
                discount: item.discount,
                product: {
                    ...DefaultProductModel,
                    id: item.product.id,
                    description: item.product.name,
                    buyPrice: item.product.buy_price,
                } as ProductModel,
            })),
        })) : []

        // console.log(`getAll:list`, list)
        return {
            sales: list,
            error: formatError(error)
        };
    },

    // getAllByFilter: async (
    //     filter: FilterBalanceModel,
    //     page: number = 1
    // ): Promise<{ sales: SaleModel[], totalPages: number, error: string | undefined }> => {

    //     const from = (page - 1) * PAGE_SIZE;
    //     const to = from + PAGE_SIZE - 1;
    //     let query = Database
    //         .from("Sale")
    //         .select(`
    //             id,
    //             client,
    //             address,
    //             payment_type,
    //             timestamp,
    //             user:user_id (
    //                 id,
    //                 name,
    //                 login
    //             ),
    //             itemsSale:ItemSale (
    //                 id,
    //                 count,
    //                 unit_price,
    //                 discount,
    //                 buy_price,
    //                 deleted_at,
    //                 product:product_id (
    //                 id,
    //                 name,
    //                 buy_price
    //                 )
    //             )
    //         `, { count: "exact" })
    //         .range(from, to);

    //     if (filter.userId) {
    //         query = query.eq("user_id", filter.userId);
    //     }

    //     if (filter.client) {
    //         query = query.ilike("client", `%${filter.client}%`);
    //     }

    //     if (filter.startDate) {
    //         query = query.gte("timestamp", new Date(filter.startDate).toISOString());
    //     }

    //     if (filter.endDate) {
    //         query = query.lte("timestamp", new Date(filter.endDate).toISOString());
    //     }

    //     if (filter.paymentType) {
    //         query = query.eq("payment_type", filter.paymentType);
    //     }

    //     if (filter.productId) {
    //         query = query.eq("ItemSale.product_id", filter.productId);
    //     }

    //     query = query.is("ItemSale.deleted_at", null);

    //     const { data, count, error } = await query;

    //     // console.log(`getAllByFilter:filter`, filter)
    //     // console.log(`getAllByFilter:data`, data)
    //     const list = data ? (data as any[]).map((sale): SaleModel => ({
    //         id: sale.id,
    //         user: {
    //             id: sale.user.id,
    //             name: sale.user.name,
    //             login: sale.user.login,
    //             profile: UserProfileEnum.Admin,
    //             status: UserStatusEnum.Active
    //         },
    //         client: sale.client,
    //         address: sale.address,
    //         paymentType: sale.payment_type,
    //         timestamp: sale.timestamp ? new Date(sale.timestamp).getTime() : 0,
    //         itemsSale: sale.itemsSale.map((item: any): ItemSaleModel => ({
    //             ...DefaultItemSaleModel,
    //             id: item.id,
    //             count: item.count,
    //             unitPrice: item.unit_price,
    //             buyPrice: item.buy_price,
    //             discount: item.discount,
    //             product: {
    //                 ...DefaultProductModel,
    //                 id: item.product.id,
    //                 description: item.product.name,
    //                 buyPrice: item.product.buy_price,
    //             } as ProductModel,
    //         })),
    //     })) : []

    //     const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));
    //     console.log(`getAllByFilter:`, count, totalPages)
    //     return {
    //         sales: list,

    //         totalPages: totalPages,
    //         // error: error?.details && error?.message
    //         //     ? `${error.details}: ${error.message}`
    //         //     : error?.details || error?.message || undefined
    //         error: formatError(error)
    //     };
    // },

    getAllByFilter: async (
        filter: FilterBalanceModel,
        page: number = 1
    ): Promise<{ items: ItemBalanceModel[], totalPages: number, error: string | undefined }> => {

        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;
        let query = Database
            .from("SaleWithDetails")
            .select("*", { count: "exact" })
            .range(from, to);

        if (filter.userId) {
            query = query.eq("user_id", filter.userId);
        }

        if (filter.client) {
            query = query.ilike("client", `%${filter.client}%`);
        }

        if (filter.startDate) {
            query = query.gte("timestamp", new Date(filter.startDate).toISOString());
        }

        if (filter.endDate) {
            query = query.lte("timestamp", new Date(filter.endDate).toISOString());
        }

        if (filter.paymentType) {
            query = query.eq("payment_type", filter.paymentType);
        }

        if (filter.productId) {
            query = query.eq("product_id", filter.productId);
        }

        // query = query.is("ItemSale.deleted_at", null);

        const { data, count, error } = await query;
        const list = data ? (data as any[]).map((sale): ItemBalanceModel => ({
            id: sale.id,
            user: sale.user_name,
            client: sale.client,
            address: sale.address,
            paymentType: sale.payment_type,
            timestamp: sale.timestamp ? new Date(sale.timestamp).getTime() : 0,
            product: sale.product_name,
            buyPrice: sale.item_buy_price,
            count: sale.count,
            unitPrice: sale.unit_price,
            discount: sale.discount,
        })) : []

        const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));
        // console.log(`getAllByFilter:`, page, count, totalPages)
        return {
            items: list,
            totalPages: totalPages,
            error: formatError(error)
        };
    },

    getSalesResume: async (filter: FilterBalanceModel): Promise<{ resume: SalesResumeModel, error: string | undefined }> => {
        // console.log(`getSalesResume:filter`, filter)
        const { data, error } = await Database.rpc("sales_resume", {
            p_user_id: filter.userId || null,
            p_client: filter.client || null,
            p_start_date: filter.startDate ? new Date(filter.startDate).toISOString() : null,
            p_end_date: filter.endDate ? new Date(filter.endDate).toISOString() : null,
            p_payment_type: filter.paymentType || null,
            p_product_id: filter.productId || null,
        });
        const resume: SalesResumeModel = {
            totalCount: Number(data[0].totalCount) || 0,
            totalBuy: Number(data[0].totalBuy) || 0,
            totalSubBuy: Number(data[0].totalSubBuy) || 0,
            totalSale: Number(data[0].totalSale) || 0,
            totaldDiscount: Number(data[0].totalDiscount) || 0,
            totalSubSale: Number(data[0].totalSubSale) || 0,
            totalDiff: Number(data[0].totalDiff) || 0,
        };
        return {
            resume: resume,
            error: formatError(error)
        };
    },

    add: async (sale: SaleModel): Promise<string | undefined> => {
        // 1. Monta objeto para tabela Sale
        const newSale = {
            user_id: sale.user.id,
            client: sale.client,
            address: sale.address,
            payment_type: sale.paymentType,
            timestamp: new Date(sale.timestamp).toISOString(),
        }
        // 2. Insere Sale e obtém o ID gerado
        const { data, error } = await Database
            .from("Sale")
            .insert([newSale])
            .select("id")
            .single();

        console.log(`add:sale:error`, error)
        if (error || !data) {
            return error?.details && error?.message
                ? `${error.details}: ${error.message}`
                : error?.details || error?.message || undefined
        }

        // 3. Prepara os itens com o ID da venda
        const itemsToInsert = sale.itemsSale.map((item) => ({
            sale_id: data.id,
            product_id: item.product.id,
            count: item.count,
            buy_price: item.product.buyPrice,
            unit_price: item.unitPrice,
            discount: item.discount ?? 1,
        }));

        // 4. Insere os ItemSale
        const { error: itemsError } = await Database
            .from("ItemSale")
            .insert(itemsToInsert)

        if (itemsError) {

            const { error: rollbackError } = await Database
                .from("Sale")
                .delete()
                .eq('id', data.id);

            console.log(`add:rollbackError`, rollbackError)
            return formatError(error)
        }

        return undefined;
    },

    softDeleteItem: async (itemId: number): Promise<{ error: string | undefined }> => {
        const dateNow = new Date().toISOString()
        const { data, error } = await Database
            .from("ItemSale")
            .update({
                "deleted_at": dateNow,
            })
            .eq("id", itemId)
            .select("*")
            .single()

        return {
            error: formatError(error)
        }
    },
};

export { SaleService };