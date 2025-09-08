import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart, CartesianGrid, Legend } from "recharts";
import { decimalFormat } from "../utils/format-utils";
import { SalesByMonthModel } from "../models/ChartModels";
import React from "react";

interface SalesByMonthChartProps {
  title: string,
  items: SalesByMonthModel[];
}

const SalesByMonthChart = React.memo(({ title, items }: SalesByMonthChartProps) => {
  // console.log(`SalesByMonthChart:`, items)

  return (
    <div
      style={{ width: "100%", height: "300px" }}
    >
      <h3>
        {title}
      </h3>
      <ResponsiveContainer>
        <AreaChart
          data={items}
        // margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis
            tickFormatter={(value: number) => `${value / 100}k`}
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              const labels: Record<string, string> = {
                totalBuy: "Compras",
                totalSale: "Vendas",
                totalDiff: "Lucro",
              }
              // return [`R$ ${value.toLocaleString("pt-BR")}`, labels[name] || name]
              return [`R$ ${decimalFormat(value / 1000)}k`, labels[name] || name]
            }}
            itemSorter={(item: any) => {
              const order: Record<string, number> = {
                totalBuy: 3,
                totalSale: 2,
                totalDiff: 1,
              }
              return order[item.dataKey] ?? 99
            }}
          />
          <Legend
            formatter={(value: string) => {
              const labels: Record<string, string> = {
                totalBuy: "Compras",
                totalSale: "Vendas",
                totalDiff: "Lucro",
              }
              // return [`R$ ${value.toLocaleString("pt-BR")}`, labels[name] || name]
              return [labels[value] || value]
            }}
            itemSorter={(item: any) => {
              const order: Record<string, number> = {
                totalBuy: 1,
                totalSale: 2,
                totalDiff: 3,
              }
              return order[item.dataKey] ?? 99
            }}
          />

          {/* Empilhando áreas */}
          <Area type="monotone" dataKey="totalBuy" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="totalSale" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="totalDiff" stackId="1" stroke="#ffc658" fill="#ffc658" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

export { SalesByMonthChart };

// const SalesByMonthChart = React.memo(({ title, items }: SalesByMonthChartProps) => {
//   // console.log(`SalesByMonthChart:`, items)

//   return (
//     <div
//       style={{ width: "100%", height: "300px" }}
//     >
//       <h3>
//         {title}
//       </h3>
//       <ResponsiveContainer>
//         <BarChart
//           data={items}
//           barCategoryGap="20%">
//           <XAxis dataKey="month" />
//           <YAxis
//             tickFormatter={(value: number) => `${value / 100}k`}
//           />
//           <Tooltip
//             formatter={(value: number, name: string) => {
//               const labels: Record<string, string> = {
//                 totalBuy: "Compras",
//                 totalSale: "Vendas",
//                 totalDiff: "Lucro",
//               }
//               return [`R$ ${decimalFormat(value / 1000)}k`, labels[name] || name]
//             }}
//             itemSorter={(item: any) => {
//               const order: Record<string, number> = {
//                 totalBuy: 3,
//                 totalSale: 2,
//                 totalDiff: 1,
//               }
//               return order[item.dataKey] ?? 99
//             }}
//           />
//           <Bar
//             dataKey="totalBuy"
//             fill="#9184d8ff"
//             stackId="a"
//           // label={({ x, y, width, value }) => (
//           //   <text
//           //     x={x + width / 2}
//           //     y={y + 10}
//           //     textAnchor="middle"
//           //     fontSize={12}
//           //     fontWeight="bold"
//           //     fill="#333">
//           //     {`${decimalFormat(value/1000)}k`}
//           //   </text>
//           // )}
//           />
//           <Bar
//             dataKey="totalSale"
//             fill="#62c0ffff"
//             stackId="a"
//           // label={({ x, y, width, value }) => (
//           //   <text
//           //     x={x + width / 2}
//           //     y={y + 10}
//           //     textAnchor="middle"
//           //     fontSize={12}
//           //     fontWeight="bold"
//           //     fill="#333">
//           //     {`${decimalFormat(value/1000)}k`}
//           //   </text>
//           // )}
//           />
//           <Bar
//             dataKey="totalDiff"
//             fill="#6fc776ff"
//             stackId="a"
//           // label={({ x, y, width, value }) => (
//           //   <text
//           //     x={x + width / 2}
//           //     y={y + 10}
//           //     textAnchor="middle"
//           //     fontSize={12}
//           //     fontWeight="bold"
//           //     fill="#333">
//           //     {`${decimalFormat(value/1000)}k`}
//           //   </text>
//           // )}
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// });

// export { SalesByMonthChart };