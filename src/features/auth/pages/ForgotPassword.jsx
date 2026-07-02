import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import {
  AccountTree,
  EmailOutlined,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import users from "../../../mocks/users.json";

import "./ForgotPassword.css";

const schema = yup.object({

  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),

});

export default function ForgotPassword() {

  const navigate = useNavigate();

  const darkMode = useSelector(
    (state) => state.ui.darkMode
  );

  const [success, setSuccess] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm({

    resolver: yupResolver(schema),

  });

  const onSubmit = (data) => {

    const email =
      data.email.trim();

    const user = users.find(
      (u) => u.email === email
    );

    if (!user) {

      setSuccess("");

      setErrorMessage(
        "No account found with this email."
      );

      return;

    }

    setErrorMessage("");

    setSuccess(
      "Password reset link has been sent to your registered email."
    );

    setTimeout(() => {

      navigate("/reset-password");

    }, 1500);

  };

  return (

    <Box
      className="forgot-page"
      sx={{
        bgcolor: darkMode
          ? "#121212"
          : "#f4f6f8",
        transition: "0.3s ease",
      }}
    >

      <Card
        elevation={5}
        className="forgot-card"
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

        <CardContent
          className="forgot-content"
        >

          <Box
            className="forgot-logo"
          >

            <AccountTree
              color="primary"
              sx={{
                fontSize: 50,
              }}
            />

            <Typography
              variant="h4"
              className="forgot-title"
              sx={{
                color: darkMode
                  ? "#ffffff"
                  : "#000000",
              }}
            >
              Forgot Password
            </Typography>

            <Typography
              className="forgot-subtitle"
              sx={{
                color: darkMode
                  ? "#bdbdbd"
                  : "#6b7280",
              }}
            >
              Enter your registered email to receive a password reset link.
            </Typography>

          </Box>

          {success && (

            <Alert
              severity="success"
              sx={{ mb: 2 }}
            >
              {success}
            </Alert>

          )}

          {errorMessage && (

            <Alert
              severity="error"
              sx={{ mb: 2 }}
            >
              {errorMessage}
            </Alert>

          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
          >

            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              {...register("email")}
              error={!!errors.email}
              helperText={
                errors.email?.message
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: darkMode
                    ? "#ffffff"
                    : "#000000",
                },

                "& .MuiInputLabel-root": {
                  color: darkMode
                    ? "#bdbdbd"
                    : "#666666",
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: darkMode
                    ? "#555555"
                    : "#cccccc",
                },

                "& .MuiSvgIcon-root": {
                  color: darkMode
                    ? "#ffffff"
                    : "#666666",
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              className="forgot-button"
            >
              SEND RESET LINK
            </Button>

          </form>

          <Box
            className="forgot-back"
          >

            <Link
              component="button"
              underline="hover"
              onClick={() =>
                navigate("/login")
              }
            >
              Back to Login
            </Link>

          </Box>

        </CardContent>

      </Card>

    </Box>

  );

}