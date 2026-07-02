import { describe, test, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import KPICard from "../components/cards/KPICard";


const theme = createTheme();

describe("KPICard Component", () => {

  test("renders title correctly", () => {

    render(
      <ThemeProvider theme={theme}>
        <KPICard
          title="Total Requests"
          value={125}
        />
      </ThemeProvider>
    );

    expect(
      screen.getByText("Total Requests")
    ).toBeInTheDocument();

  });

  test("renders value correctly", () => {

    render(
      <ThemeProvider theme={theme}>
        <KPICard
          title="Pending"
          value={10}
        />
      </ThemeProvider>
    );

    expect(
      screen.getByText("10")
    ).toBeInTheDocument();

  });

});