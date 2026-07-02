import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  LockClock,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./SessionExpired.css";

export default function SessionExpired() {

  const navigate = useNavigate();

  const darkMode = useSelector(
    (state) => state.ui.darkMode
  );

  return (

    <Box
      className="session-page"
      sx={{
        bgcolor: darkMode
          ? "#121212"
          : "#f4f6f8",
        transition: "0.3s ease",
      }}
    >

      <Card
        elevation={5}
        className="session-card"
        sx={{
          bgcolor: darkMode
            ? "#1e1e1e"
            : "#ffffff",
          color: darkMode
            ? "#ffffff"
            : "#000000",
          transition: "0.3s ease",
        }}
      >

        <CardContent className="session-content">

          <LockClock
            color="warning"
            sx={{
              fontSize: 70,
              mb: 2,
            }}
          />

          <Typography
            variant="h4"
            className="session-title"
            sx={{
              color: darkMode
                ? "#ffffff"
                : "#000000",
            }}
          >
            Session Expired
          </Typography>

          <Typography
            className="session-subtitle"
            sx={{
              color: darkMode
                ? "#bdbdbd"
                : "#6b7280",
            }}
          >
            Your session has expired due to inactivity.
            Please login again to continue using
            the e-GRCP platform.
          </Typography>

          <Button
            variant="contained"
            size="large"
            className="session-button"
            onClick={() =>
              navigate("/login")
            }
          >
            BACK TO LOGIN
          </Button>

        </CardContent>

      </Card>

    </Box>

  );

}