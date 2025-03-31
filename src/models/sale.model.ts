import { ItemSaleModel } from "./item-sale.model";
import { PaymentTypeEnum } from "./payment-type.enum";

export interface SaleModel {
    id: number;
    client: string;
    address: string;
    paymentType: PaymentTypeEnum;
    date: Date;
    listItems: ItemSaleModel[];
}