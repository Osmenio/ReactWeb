import { PaymentTypeEnum } from ".";

export interface FilterBalanceModel {
  userId?: number,
  client?: string,
  paymentType?: PaymentTypeEnum,
  startDate?: number,
  endDate?: number,
  productId?: number;
}