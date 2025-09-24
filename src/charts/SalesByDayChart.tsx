import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart, Legend } from "recharts";
import { decimalFormat } from "../utils/format-utils";
import { SalesByDayModel } from "../models/ChartModels";
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

interface SalesByMonthChartProps {
  title: string;
  monthYear: string;
  items: SalesByDayModel[];
  onChangeMonthYear?: (value: string) => void;
}

const SalesByDayChart = React.memo(({
  title,
  monthYear,
  items,
  onChangeMonthYear = () => { },
}: SalesByMonthChartProps) => {

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
        <AreaChart
          data={items}
        >
          <XAxis dataKey="day" />
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
          <Area type="monotone" dataKey="totalBuy" stackId="1" stroke="#4f0c83" fill="#4f0c83" />
          <Area type="monotone" dataKey="totalSale" stackId="1" stroke="#870fd1ff" fill="#870fd1ff" />
          <Area type="monotone" dataKey="totalDiff" stackId="1" stroke="#de62faff" fill="#de62faff" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

export { SalesByDayChart };