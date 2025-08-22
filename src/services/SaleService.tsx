import { FilterBalanceModel, ItemSaleModel, PaymentTypeEnum, ProductModel, SaleModel, UserProfileEnum, UserStatusEnum } from "../models";
import { DefaultItemSaleModel, DefaultProductModel } from "../models/DefaultModels.tsx";
import { Database, formatError } from "./DatabaseClient";

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
                // password: "",
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
            // error: error?.details && error?.message
            //     ? `${error.details}: ${error.message}`
            //     : error?.details || error?.message || undefined
            error: formatError(error)
        };
    },

    getAllByFilter: async (filter: FilterBalanceModel): Promise<{ sales: SaleModel[], error: string | undefined }> => {
        let query = Database
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
                    count,
                    unit_price,
                    discount,
                    buy_price,
                    deleted_at,
                    product:product_id (
                    id,
                    name,
                    buy_price
                    )
                )
            `);

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
            query = query.eq("ItemSale.product_id", filter.productId);
        }

        query = query.is("ItemSale.deleted_at", null);

        const { data, error } = await query;

        // console.log(`getAllByFilter:filter`, filter)
        // console.log(`getAllByFilter:data`, data)
        const list = data ? (data as any[]).map((sale): SaleModel => ({
            id: sale.id,
            user: {
                id: sale.user.id,
                name: sale.user.name,
                login: sale.user.login,
                // password: "",
                profile: UserProfileEnum.Admin,
                status: UserStatusEnum.Active
            },
            client: sale.client,
            address: sale.address,
            paymentType: sale.payment_type,
            timestamp: sale.timestamp,
            itemsSale: sale.itemsSale.map((item: any): ItemSaleModel => ({
                ...DefaultItemSaleModel,
                id: item.id,
                count: item.count,
                unitPrice: item.unit_price,
                buyPrice: item.buy_price,
                discount: item.discount,
                product: {
                    ...DefaultProductModel,
                    id: item.product.id,
                    description: item.product.name,
                    buyPrice: item.product.buy_price,
                } as ProductModel,
            })),
        })) : []

        // console.log(`getAllByFilter:list`, list)
        return {
            sales: list,
            // error: error?.details && error?.message
            //     ? `${error.details}: ${error.message}`
            //     : error?.details || error?.message || undefined
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
        // console.log(`add:sale`, sale)
        // console.log(`add:newSale`, newSale)

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
        // console.log(`add:item`, itemsToInsert)

        // 4. Insere os ItemSale
        const { error: itemsError } = await Database
            .from("ItemSale")
            .insert(itemsToInsert)
        // .single();

        if (itemsError) {
            // console.log(`add:item:error`, itemsError)

            const { error: rollbackError } = await Database
                .from("Sale")
                .delete()
                .eq('id', data.id);

            console.log(`add:rollbackError`, rollbackError)
            return formatError(error)
            // return itemsError?.details && itemsError?.message
            //     ? `${itemsError.details}: ${itemsError.message}`
            //     : itemsError?.details || itemsError?.message || undefined

        }

        return undefined; // sucesso
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

        // console.log(`add:sale:error`, error)
        return {
            // error: error?.details && error?.message
            //     ? `${error.details}: ${error.message}`
            //     : error?.details || error?.message || undefined
            error: formatError(error)
        }
    },
};

export { SaleService };