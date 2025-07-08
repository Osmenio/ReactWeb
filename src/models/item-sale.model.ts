import { ProductModel } from "./product.model";

export interface ItemSaleModel {
    id?: number;
    // product?: ProductModel;
    product?: string;
    buyPrice?: number;
    count?: number;
    unitPrice?: number;
    discount?: number;
    subtotal?: number;
}