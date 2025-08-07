import { FilterBalanceModel, PaymentTypeEnum, ProductModel, SaleModel, UserProfileEnum, UserStatusEnum } from "../models";
import { DefaultProductModel } from "../models/DefaultModels.tsx";
import { Database } from "./DatabaseClient";

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
                password: "",
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
            error: error?.details && error?.message
                ? `${error.details}: ${error.message}`
                : error?.details || error?.message || undefined
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

        const { data, error } = await query;

        console.log(`getAllByFilter:filter`, filter)
        // console.log(`getAllByFilter:data`, data)
        const list = data ? (data as any[]).map((sale): SaleModel => ({
            id: sale.id,
            user: {
                id: sale.user.id,
                name: sale.user.name,
                login: sale.user.login,
                password: "",
                profile: UserProfileEnum.Admin,
                status: UserStatusEnum.Active
            },
            client: sale.client,
            address: sale.address,
            paymentType: sale.payment_type,
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

        // console.log(`getAllByFilter:list`, list)
        return {
            sales: list,
            error: error?.details && error?.message
                ? `${error.details}: ${error.message}`
                : error?.details || error?.message || undefined
        };
    },

    // getUser: async (login: string, pwd: string): Promise<{ user: UserModel | undefined; error: string | undefined }> => {
    //     const { data, error } = await Database
    //         .from("User")
    //         .select("*")
    //         .eq("login", login)
    //         .eq("password", pwd)
    //         .single();
    //     return {
    //         user: data ? {
    //             id: data.id,
    //             name: data.name,
    //             login: data.login,
    //             password: data.password,
    //             profile: data.profile as UserProfileEnum,
    //             status: data.status as UserStatusEnum,
    //         } : undefined,
    //         // error: error?.details
    //         error: error?.details && error?.message
    //             ? `${error.details}: ${error.message}`
    //             : error?.details || error?.message || undefined
    //     };
    // },

    // update: async (product: ProductModel): Promise<{ product: ProductModel | undefined; error: string | undefined }> => {
    //     const { data, error } = await Database
    //         .from("Product")
    //         .update({
    //             "name": product.description,
    //             "buy_price": product.buyPrice,
    //             "price_one": product.priceOne,
    //             "price_two": product.priceTwo,
    //             "price_three": product.priceThree,
    //             "status": product.status,
    //         })
    //         .eq("id", product.id)
    //         .select("*")
    //         .single()

    //     console.log(`update:product`, product)
    //     console.log(`update:`, error)
    //     return {
    //         product: data ? {
    //             id: data.id,
    //             description: data.name,
    //             buyPrice: data.buy_price,
    //             priceOne: data.price_one,
    //             priceTwo: data.price_two,
    //             priceThree: data.price_three,
    //             status: data.status as ProductStatusEnum.InStock
    //         } : undefined,
    //         error: error?.details && error?.message
    //             ? `${error.details}: ${error.message}`
    //             : error?.details || error?.message || undefined
    //     };
    // },

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

        // console.log(`add:sale:error`, error)
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

            // console.log(`add:rollbackError`, rollbackError)
            return itemsError?.details && itemsError?.message
                ? `${itemsError.details}: ${itemsError.message}`
                : itemsError?.details || itemsError?.message || undefined

        }

        return undefined; // sucesso
    },
};

export { SaleService };