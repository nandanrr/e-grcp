import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { useTheme } from "@mui/material/styles";

const data = [
  { month: "Jan", compliance: 18 },
  { month: "Feb", compliance: 22 },
  { month: "Mar", compliance: 15 },
  { month: "Apr", compliance: 28 },
  { month: "May", compliance: 19 },
  { month: "Jun", compliance: 23 },
];

export default function ComplianceTrendChart() {

  const theme = useTheme();

  return (
    <ResponsiveContainer
      width="100%"
      height={320}
    >
      <LineChart
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

        <Line
          type="monotone"
          dataKey="compliance"
          stroke={theme.palette.primary.main}
          strokeWidth={3}
          dot={{
            r: 4,
            fill: theme.palette.background.paper,
            stroke: theme.palette.primary.main,
            strokeWidth: 2,
          }}
          activeDot={{
            r: 7,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}