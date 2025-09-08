import { Tooltip, ResponsiveContainer, Cell, Legend, Pie, PieChart } from "recharts";
import { decimalFormat } from "../utils/format-utils";
import { SalesMonthByPaymentModel } from "../models/ChartModels";
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

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const COLORS = ["#4dc4bc", "#f8bf7e", "#fca4a4"];

interface SalesMonthByPaymentChartProps {
  title: string;
  monthYear: string;
  items: SalesMonthByPaymentModel[];
  onChangeMonthYear?: (value: string) => void;
}

const SalesMonthByPaymentChart = React.memo(({
  title,
  monthYear,
  items,
  onChangeMonthYear = () => { },
}: SalesMonthByPaymentChartProps) => {
  // console.log(`SalesMonthByPaymentChart:`, items)

  return (
    <div
      style={{ width: "50%", height: "300px" }}
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
        <PieChart>
          <Pie
            data={items}
            dataKey="totalSale"
            nameKey="paymentType"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }: { name?: string; percent?: number }) =>
              `${name} ${((percent ?? 0) * 100).toFixed(1)}%`
            }
          >
            {items.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            // formatter={(value: number) => `R$ ${value.toFixed(2)}`}
            formatter={(value: number) => `R$ ${decimalFormat((value / 1000))}k`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
});

export { SalesMonthByPaymentChart };