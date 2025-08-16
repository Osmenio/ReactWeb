import { ProductModel } from ".";

export interface ItemSaleModel {
    id: number;
    product: ProductModel;
    buyPrice: number;
    count: number;
    unitPrice: number;
    discount?: number;
}