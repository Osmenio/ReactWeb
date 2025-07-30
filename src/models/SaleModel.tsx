import { ItemSaleModel } from "./ItemSaleModel";
import { PaymentTypeEnum } from "./PaymentTypeEnum";

export interface SaleModel {
    id: number;
    saleman: string;
    client: string;
    address: string;
    paymentType: PaymentTypeEnum;
    date: string;
    time: string;
    timestamp: number;
    itemsSale: ItemSaleModel[];
}