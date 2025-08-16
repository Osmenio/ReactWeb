import { ItemSaleModel, PaymentTypeEnum, UserModel } from ".";

export interface SaleModel {
    id: number;
    user: UserModel;
    client: string;
    address: string;
    paymentType: PaymentTypeEnum;
    timestamp: number;
    itemsSale: ItemSaleModel[];
}