import { ItemSaleModel, PaymentTypeEnum, UserModel } from ".";

export interface SalesResumeModel {
    totalCount: number;
    totalBuy: number;
    totalSubBuy: number;
    totalSale: number;
    totaldDiscount: number;
    totalSubSale: number;
    totalDiff: number;
}