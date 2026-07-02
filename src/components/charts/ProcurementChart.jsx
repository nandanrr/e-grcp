import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useTheme } from "@mui/material/styles";

const data = [
  { month: "Jan", value: 120 },
  { month: "Feb", value: 150 },
  { month: "Mar", value: 180 },
  { month: "Apr", value: 220 },
  { month: "May", value: 260 },
];

export default function ProcurementChart() {

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
          dataKey="month"
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
          dataKey="value"
          fill={theme.palette.primary.main}
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}