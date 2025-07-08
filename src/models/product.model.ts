import { ProductStatusEnum } from "./product-status.enum";

export interface ProductModel {
    id: number;
    description: string;
    buyPrice: number;
    priceOne: number;
    priceTwo: number;
    priceThree: number;
    status: ProductStatusEnum;
}