
export interface SalesByMonthModel {
    month: string;
    totalBuy: number;
    totalSale: number;
    totalDiff: number;
}

export interface SalesByDayModel {
    day: string;
    // total: number;
    totalBuy: number;
    totalSale: number;
    totalDiff: number;
}

export interface SalesMonthByUserModel {
    user: string;
    totalBuy: number;
    totalSale: number;
    totalDiff: number;
}

export interface SalesMonthByPaymentModel {
    paymentType: string;
    totalSale: number;
}

export interface ProductByMonthModel {
    productName: string;
    count: number;
    totalSale: number;
}