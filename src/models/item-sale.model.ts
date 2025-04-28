import { ProductModel } from "./product.model";

export interface ItemSaleModel {
    // id: number;
    product?: ProductModel;
    count?: number;
    unitPrice?: number;
    discount?: number;
    subtotal?: number;
}