import { PaymentTypeEnum } from ".";

export interface ItemBalanceModel {
  id: number,
  user: string,
  client: string,
  address: string,
  paymentType: PaymentTypeEnum,
  timestamp: number,
  product: string;
  buyPrice: number;
  count: number;
  unitPrice: number;
  discount: number;
}