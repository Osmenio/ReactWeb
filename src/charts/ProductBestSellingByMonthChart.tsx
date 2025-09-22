import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ProductBestSellingByMonthModel } from "../models/ChartModels";
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

interface ProductBestSellingByMonthChartProps {
  title: string;
  monthYear: string;
  items: ProductBestSellingByMonthModel[];
  onChangeMonthYear?: (value: string) => void;
}

const ProductBestSellingByMonthChart = React.memo(({
  title,
  monthYear,
  items,
  onChangeMonthYear = () => { },
}: ProductBestSellingByMonthChartProps) => {

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
          <XAxis dataKey="productName" />
          <YAxis
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              const labels: Record<string, string> = {
                count: "Quantidade",
              }
              return [value, labels[name] || name]
            }}
            itemSorter={(item: any) => {
              const order: Record<string, number> = {
                count: 1,
                totalSale: 2,
              }
              return order[item.dataKey] ?? 99
            }}
          />
          <Legend
            formatter={(value: string) => {
              const labels: Record<string, string> = {
                count: "Quantidade",
              }
              return [labels[value] || value]
            }}
          />
          <Bar
            dataKey="count"
            fill="#388cb9"
            stackId="a"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

export { ProductBestSellingByMonthChart };