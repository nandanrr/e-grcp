import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

const matrix = [
  [
    { color: "#4caf50", label: "Low" },
    { color: "#ffeb3b", label: "Low" },
    { color: "#ff9800", label: "Medium" },
  ],
  [
    { color: "#ffeb3b", label: "Low" },
    { color: "#ff9800", label: "Medium" },
    { color: "#f44336", label: "High" },
  ],
  [
    { color: "#ff9800", label: "Medium" },
    { color: "#f44336", label: "High" },
    { color: "#b71c1c", label: "Critical" },
  ],
];

const probability = [
  "Low",
  "Medium",
  "High",
];

export default function RiskHeatMap() {

  const theme = useTheme();

  return (
    <TableContainer
      component={Paper}
      elevation={2}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "background.paper",
        transition: "0.3s",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Table>

        <TableHead
          sx={{
            bgcolor: "background.default",
          }}
        >
          <TableRow>

            <TableCell
              sx={{
                fontWeight: 700,
                width: 200,
                minWidth: 200,
                color: "text.primary",
                bgcolor: "background.default",
              }}
            >
              Impact ↓ | Probability →
            </TableCell>

            <TableCell
              align="center"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                bgcolor: "background.default",
              }}
            >
              Low
            </TableCell>

            <TableCell
              align="center"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                bgcolor: "background.default",
              }}
            >
              Medium
            </TableCell>

            <TableCell
              align="center"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                bgcolor: "background.default",
              }}
            >
              High
            </TableCell>

          </TableRow>
        </TableHead>

        <TableBody>

          {matrix.map((row, rowIndex) => (

            <TableRow key={rowIndex}>

              <TableCell
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  bgcolor: "background.paper",
                }}
              >
                {probability[rowIndex]}
              </TableCell>

              {row.map((cell, colIndex) => (

                <TableCell
                  key={colIndex}
                  align="center"
                  sx={{
                    backgroundColor: cell.color,
                    color: "#fff",
                    fontWeight: "bold",
                    height: 70,
                    transition: "all 0.25s ease",

                    "&:hover": {
                      opacity: 0.92,
                      transform: "scale(1.03)",
                      cursor: "pointer",
                    },
                  }}
                >
                  <Typography
                    fontWeight={700}
                    fontSize={16}
                  >
                    {cell.label}
                  </Typography>

                </TableCell>

              ))}

            </TableRow>

          ))}

        </TableBody>

      </Table>
    </TableContainer>
  );
}