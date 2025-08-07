import { ProductModel } from ".";

// export interface ItemSaleModel {
//     id?: number;
//     product?: string;
//     buyPrice?: number;
//     count?: number;
//     unitPrice?: number;
//     discount?: number;
// }


export interface ItemSaleModel {
    id: number;
    product: ProductModel;
    buyPrice: number;
    count: number;
    unitPrice: number;
    discount?: number;
}