import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Line, CartesianGrid, ComposedChart, Legend } from "recharts";
import { ProductByMonthModel } from "../models/ChartModels";
import { Dropdown } from "semantic-ui-react";
import { format } from "date-fns";
import React from "react";
import { ProductModel } from "../models";
import { decimalFormat } from "../utils/format-utils";

interface ProductByMonthChartProps {
  title: string;
  selected?: ProductModel;
  products: ProductModel[];
  items: ProductByMonthModel[];
  onChangeProduct?: (selected: ProductModel) => void;
}

const ProductByMonthChart = React.memo(({
  title,
  selected,
  products,
  items,
  onChangeProduct = () => { },
}: ProductByMonthChartProps) => {

  const productsOptions = products.map(item => ({
    key: item.description,
    value: item.description,
    text: item.description,
  }));

  return (
    <div
      style={{ width: "100%", height: "300px" }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3> {title} </h3>
        <Dropdown
          placeholder="Selecionar"
          selection
          search
          value={selected?.description ?? ""}
          options={productsOptions}
          onChange={(_, data) => {
            const value = data.value as string
            const selected = products.find(p => p.description === value);
            if (selected) onChangeProduct(selected)
          }}
        />
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={items}>
          <XAxis dataKey="month" />

          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" />

          <Tooltip
            formatter={(value: number, name: string) => {
              const labels: Record<string, string> = {
                count: "Quantidade",
                totalBuy: "Compras",
                totalSale: "Vendas",
                totalDiff: "Lucro",
              }
              if (name === "count") {
                return [value, labels[name] || name]
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
                count: "Quantidade",
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

          <Bar
            yAxisId="left"
            dataKey="totalBuy"
            fill="#ff9e71ff"
            stackId="a"
          />

          <Bar
            yAxisId="left"
            dataKey="totalSale"
            fill="#84b9d8ff"
            stackId="a"
          />

          <Bar
            yAxisId="left"
            dataKey="totalDiff"
            fill="#84d884ff"
            stackId="a"
          />

          {/* Linha: quantidade */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="count"
            stroke="#9882caff"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
});

export { ProductByMonthChart };