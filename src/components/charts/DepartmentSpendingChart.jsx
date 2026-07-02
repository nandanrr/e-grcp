import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { useTheme } from "@mui/material/styles";

const data = [
  {
    department: "IT",
    spending: 180,
  },
  {
    department: "HR",
    spending: 90,
  },
  {
    department: "Finance",
    spending: 140,
  },
  {
    department: "Operations",
    spending: 220,
  },
  {
    department: "Sales",
    spending: 170,
  },
];

export default function DepartmentSpendingChart() {

  const theme = useTheme();

  return (
    <ResponsiveContainer
      width="100%"
      height={320}
    >
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid
          stroke={theme.palette.divider}
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey="department"
          stroke={theme.palette.text.primary}
          tick={{
            fill: theme.palette.text.primary,
          }}
        />

        <YAxis
          stroke={theme.palette.text.primary}
          tick={{
            fill: theme.palette.text.primary,
          }}
        />

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

        <Bar
          dataKey="spending"
          fill={theme.palette.primary.main}
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}