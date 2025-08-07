import { ItemSaleModel, PaymentTypeEnum, UserModel } from ".";

// export interface SaleModel {
//     id: number;
//     saleman: UserModel;
//     // saleman: number;
//     // saleman: string;
//     client: string;
//     address: string;
//     paymentType: PaymentTypeEnum;
//     // date: string;
//     // time: string;
//     timestamp: number;
//     itemsSale: ItemSaleModel[];
// }

export interface SaleModel {
    id: number;
    user: UserModel;
    client: string;
    address: string;
    paymentType: PaymentTypeEnum;
    timestamp: number;
    itemsSale: ItemSaleModel[];
}