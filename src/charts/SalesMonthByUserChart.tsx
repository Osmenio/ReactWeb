import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { decimalFormat } from "../utils/format-utils";
import { SalesMonthByUserModel } from "../models/ChartModels";
import { Dropdown } from "semantic-ui-react";
import { format } from "date-fns";
import React from "react";

const date = new Date();
const monthYearOptions = [...Array(15)].map(key => {
  const value = format(date, "MM/yyyy");
  date.setMonth(date.getMonth() - 1)
  return {
    key: key,
    text: value,
    value: value,
  }
});

interface SalesMonthByUserChartProps {
  title: string;
  monthYear: string;
  items: SalesMonthByUserModel[];
  onChangeMonthYear?: (value: string) => void;
}

const SalesMonthByUserChart = React.memo(({
  title,
  monthYear,
  items,
  onChangeMonthYear = () => { },
}: SalesMonthByUserChartProps) => {
  // console.log(`SalesMonthByUserChart:`, items)

  return (
    <div
      style={{ width: "100%", height: "300px" }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3> {title} </h3>
        <Dropdown
          placeholder="Mês/Ano"
          selection
          value={monthYear}
          options={monthYearOptions}
          onChange={(_, data) => {
            onChangeMonthYear(data.value as string)
          }}
        />
      </div>

      <ResponsiveContainer>
        <BarChart
          data={items}
          barCategoryGap="20%">
          <XAxis dataKey="user" />
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

          <Bar
            dataKey="totalBuy"
            // fill="#8884d8"
            fill="#32336d"
            stackId="a"
          />
          <Bar
            dataKey="totalSale"
            // fill="#98dfffff"
            fill="#5c5c8c"
            stackId="a"
          />
          <Bar
            dataKey="totalDiff"
            // fill="#6fc776ff"
            fill="#388cb9"
            stackId="a"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

export { SalesMonthByUserChart };