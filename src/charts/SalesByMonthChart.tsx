import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart, CartesianGrid, Legend } from "recharts";
import { decimalFormat } from "../utils/format-utils";
import { SalesByMonthModel } from "../models/ChartModels";
import React from "react";

interface SalesByMonthChartProps {
  title: string,
  items: SalesByMonthModel[];
}

const SalesByMonthChart = React.memo(({ title, items }: SalesByMonthChartProps) => {

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
        >
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