import { ProductModel, ProductStatusEnum } from "../models";
import { Database, formatError } from "./DatabaseClient";

const PAGE_SIZE = 10
const ProductService = {

    getAll: async (): Promise<{ products: ProductModel[], error: string | undefined }> => {
        const { data, error } = await Database
            .from("Product").select("*")

        const list = data ? data.map((item): ProductModel => ({
            id: item.id,
            description: item.name,
            buyPrice: item.buy_price,
            priceOne: item.price_one,
            priceTwo: item.price_two,
            priceThree: item.price_three,
            status: item.status as ProductStatusEnum.InStock
        })) : []

        return {
            products: list,
            error: formatError(error)
        };
    },

    getAllWithPagination: async (
        page: number = 1,
        // pageSize: number = 20
    ): Promise<{ products: ProductModel[], totalPages: number, error: string | undefined }> => {

        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;
        const { data, count, error } = await Database
            .from("Product")
            .select("*", { count: "exact" })
            .range(from, to);

        const list = data ? data.map((item): ProductModel => ({
            id: item.id,
            description: item.name,
            buyPrice: item.buy_price,
            priceOne: item.price_one,
            priceTwo: item.price_two,
            priceThree: item.price_three,
            status: item.status as ProductStatusEnum.InStock
        })) : []

        const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));
        return {
            products: list,
            totalPages: totalPages,
            error: formatError(error)
        };
    },

    getAllInStock: async (): Promise<{ products: ProductModel[], error: string | undefined }> => {
        const { data, error } = await Database
            .from("Product")
            .select("*")
            .eq("status", ProductStatusEnum.InStock)

        const list = data ? data.map((item): ProductModel => ({
            id: item.id,
            description: item.name,
            buyPrice: item.buy_price,
            priceOne: item.price_one,
            priceTwo: item.price_two,
            priceThree: item.price_three,
            status: item.status as ProductStatusEnum.InStock
        })) : []

        return {
            products: list,
            error: formatError(error)
        };
    },

    update: async (product: ProductModel): Promise<{ product: ProductModel | undefined; error: string | undefined }> => {
        const { data, error } = await Database
            .from("Product")
            .update({
                "name": product.description,
                "buy_price": product.buyPrice,
                "price_one": product.priceOne,
                "price_two": product.priceTwo,
                "price_three": product.priceThree,
                "status": product.status,
            })
            .eq("id", product.id)
            .select("*")
            .single()

        // console.log(`update:product`, product)
        // console.log(`update:`, error)
        return {
            product: data ? {
                id: data.id,
                description: data.name,
                buyPrice: data.buy_price,
                priceOne: data.price_one,
                priceTwo: data.price_two,
                priceThree: data.price_three,
                status: data.status as ProductStatusEnum.InStock
            } : undefined,
            // error: error?.details && error?.message
            //     ? `${error.details}: ${error.message}`
            //     : error?.details || error?.message || undefined
            error: formatError(error)
        };
    },

    add: async (product: ProductModel): Promise<string | undefined> => {
        const newProduct = {
            name: product.description,
            buy_price: product.buyPrice,
            price_one: product.priceOne,
            price_two: product.priceTwo,
            price_three: product.priceThree,
            status: product.status,
        }
        // console.log(`add:product`, product)
        // console.log(`add:newProduct`, newProduct)
        const { error } = await Database
            .from("Product")
            .insert([newProduct])
            .single();

        // console.log(`add:error`, error)
        return formatError(error)
    },
};

export { ProductService };