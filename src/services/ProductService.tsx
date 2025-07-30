import { ProductModel, ProductStatusEnum } from "../models";
import { Database } from "./DatabaseClient";

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
            // products: data ?? [],
            products: list,
            // error: error?.message
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

        console.log(`update:product`, product)
        console.log(`update:`, error)
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
            error: error?.details && error?.message
                ? `${error.details}: ${error.message}`
                : error?.details || error?.message || undefined
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
        console.log(`add:product`, product)
        console.log(`add:newProduct`, newProduct)
        const { error } = await Database
            .from("Product")
            .insert([newProduct])
            .single();

        console.log(`add:error`, error)
        return error?.details && error?.message
            ? `${error.details}: ${error.message}`
            : error?.details || error?.message || undefined
    },
};

export { ProductService };