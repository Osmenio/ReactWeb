import { useMemo } from "react";
import { SaleModel } from "../models";

// export function useSalesByMonth(sales: SaleModel[]) {
//   return useMemo(() => {
//     const grouped = sales.reduce((acc, sale) => {
//       const date = new Date(sale.timestamp);
//       const month = date.toLocaleString("default", { month: "short", year: "numeric" });

//       const total = sale.itemsSale.reduce(
//         (sum, item) => sum + item.unitPrice * item.count - (item.discount ?? 0),
//         0
//       );

//       acc[month] = (acc[month] || 0) + total;
//       return acc;
//     }, {} as Record<string, number>);

//     return Object.entries(grouped).map(([month, total]) => ({ month, total }));
//   }, [sales]); // só recalcula se `sales` mudar
// }

export function useSalesByMonth(sales: SaleModel[]) {
  return useMemo(() => {
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(2025, i).toLocaleString("pt-BR", { month: "short" }),
      total: 0,
    }))

    sales.forEach((sale) => {
      const date = new Date(sale.timestamp)
      const monthIndex = date.getMonth()
      const totalSale = sale.itemsSale.reduce(
        (sum, item) => sum + item.count * item.unitPrice - (item.discount ?? 0),
        0
      )
      months[monthIndex].total += totalSale
    })

    return months
  }, [sales]); // só recalcula se `sales` mudar
}
