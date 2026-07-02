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
    risks: 8,
  },
  {
    department: "Finance",
    risks: 5,
  },
  {
    department: "HR",
    risks: 3,
  },
  {
    department: "Operations",
    risks: 7,
  },
  {
    department: "Admin",
    risks: 4,
  },
];

export default function RiskDepartmentChart() {

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
          dataKey="risks"
          fill={theme.palette.primary.main}
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}