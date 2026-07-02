import AppRoutes from "./routes/AppRoutes";

import { CssBaseline } from "@mui/material";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";

import { useSelector } from "react-redux";

function AppContent() {

  const darkMode = useSelector(
    (state) => state.ui.darkMode
  );

  const theme = createTheme({

    palette: {

      mode: darkMode ? "dark" : "light",

      primary: {
        main: "#1976d2",
      },

      background: {
        default: darkMode
          ? "#121212"
          : "#f5f7fa",

        paper: darkMode
          ? "#1e1e1e"
          : "#ffffff",
      },

    },

    shape: {
      borderRadius: 12,
    },

    components: {

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 600,
          },
        },
      },

      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: "#1976d2",
          },
        },
      },

    },

  });

  return (

    <MuiThemeProvider theme={theme}>

      <CssBaseline />

      <AppRoutes />

    </MuiThemeProvider>

  );

}

export default function App() {
  return <AppContent />;
}