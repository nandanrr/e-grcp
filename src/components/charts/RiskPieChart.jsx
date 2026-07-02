import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { useTheme } from "@mui/material/styles";

const data = [
  { name: "High", value: 2 },
  { name: "Medium", value: 1 },
  { name: "Low", value: 1 },
];

const COLORS = [
  "#d32f2f",
  "#f9a825",
  "#2e7d32",
];

export default function RiskPieChart() {

  const theme = useTheme();

  return (
    <ResponsiveContainer
      width="100%"
      height={320}
    >
      <PieChart>

        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={110}
          innerRadius={50}
          paddingAngle={3}
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell
              key={entry.name}
              fill={COLORS[index]}
            />
          ))}
        </Pie>

        <Tooltip
          contentStyle={{
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: "8px",
          }}
          labelStyle={{
            color: theme.palette.text.primary,
          }}
          itemStyle={{
            color: theme.palette.text.primary,
          }}
        />

        <Legend
          wrapperStyle={{
            color: theme.palette.text.primary,
            paddingTop: "10px",
          }}
        />

      </PieChart>
    </ResponsiveContainer>
  );
}