import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import {
  AccountTree,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { useSelector } from "react-redux";

import "./ResetPassword.css";

const schema = yup.object({

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "Passwords do not match"
    )
    .required("Confirm Password is required"),

});

export default function ResetPassword() {

  const navigate = useNavigate();

  const darkMode = useSelector(
    (state) => state.ui.darkMode
  );

  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {

    setSuccess("Password changed successfully.");

    setTimeout(() => {
      navigate("/login");
    }, 1500);

  };

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      color: darkMode ? "#fff" : "#000",
    },

    "& .MuiInputLabel-root": {
      color: darkMode ? "#bdbdbd" : "#666",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: darkMode ? "#555" : "#ccc",
    },

    "& .MuiSvgIcon-root": {
      color: darkMode ? "#fff" : "#666",
    },
  };

  return (

    <Box
      className="reset-page"
      sx={{
        bgcolor: darkMode
          ? "#121212"
          : "#f4f6f8",
        transition: "0.3s ease",
      }}
    >

      <Card
        elevation={5}
        className="reset-card"
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

        <CardContent className="reset-content">

          <Box className="reset-logo">

            <AccountTree
              color="primary"
              sx={{ fontSize: 50 }}
            />

            <Typography
              variant="h4"
              className="reset-title"
              sx={{
                color: darkMode
                  ? "#ffffff"
                  : "#000000",
              }}
            >
              Reset Password
            </Typography>

            <Typography
              className="reset-subtitle"
              sx={{
                color: darkMode
                  ? "#bdbdbd"
                  : "#6b7280",
              }}
            >
              Create a new secure password.
            </Typography>

          </Box>

          {success && (

            <Alert
              severity="success"
              className="reset-alert"
            >
              {success}
            </Alert>

          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
          >

            <TextField
              fullWidth
              margin="normal"
              label="New Password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              {...register("password")}
              error={!!errors.password}
              helperText={
                errors.password?.message
              }
              sx={textFieldStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined />
                  </InputAdornment>
                ),

                endAdornment: (
                  <InputAdornment position="end">

                    <IconButton
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>

                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              {...register("confirmPassword")}
              error={
                !!errors.confirmPassword
              }
              helperText={
                errors.confirmPassword
                  ?.message
              }
              sx={textFieldStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined />
                  </InputAdornment>
                ),

                endAdornment: (
                  <InputAdornment position="end">

                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>

                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              className="reset-button"
            >
              RESET PASSWORD
            </Button>

          </form>

          <Box className="reset-back">

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