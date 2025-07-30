import { ProductStatusEnum } from "./ProductStatusEnum";

export interface ProductModel {
    id: number;
    description: string;
    buyPrice: number;
    priceOne: number;
    priceTwo: number;
    priceThree: number;
    status: ProductStatusEnum;
}