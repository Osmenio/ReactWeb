import { ItemSaleModel } from "./item-sale.model";
import { PaymentTypeEnum } from "./payment-type.enum";

export interface SaleModel {
    // id: number;
    saleman: string;
    client: string;
    address: string;
    paymentType: PaymentTypeEnum;
    date: string;
    time: string;
    itemsSale: ItemSaleModel[];
}