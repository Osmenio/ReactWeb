import { PaymentTypeEnum } from ".";

export interface FilterBalanceModel {
  userId?: string,
  client?: string,
  paymentType?: PaymentTypeEnum,
  startDate?: number,
  endDate?: number,
  productId?: number;
}