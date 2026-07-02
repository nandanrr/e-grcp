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
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  EmailOutlined,
  LockOutlined,
  AccountTree,
} from "@mui/icons-material";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  loginSuccess,
} from "../authSlice";

import {
  useNavigate,
} from "react-router-dom";

import users from "../../../mocks/users.json";

import "./Login.css";

const schema = yup.object({

  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),

  password: yup
    .string()
    .trim()
    .min(
      6,
      "Password must be at least 6 characters"
    )
    .required("Password is required"),

});

export default function Login() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const darkMode = useSelector(
    (state) => state.ui.darkMode
  );

  const [showPassword, setShowPassword] =
    useState(false);

  const [loginError, setLoginError] =
    useState("");

  const [rememberMe, setRememberMe] =
    useState(() => {
      if (typeof window === "undefined") {
        return false;
      }

      return (
        localStorage.getItem("rememberMe") ===
        "true"
      );
    });

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm({

    resolver: yupResolver(schema),
    defaultValues: {
      email:
        typeof window !== "undefined"
          ? localStorage.getItem(
              "rememberedEmail"
            ) || ""
          : "",
      password: "",
    },

  });

  const onSubmit = (data) => {

    const email =
      data.email.trim().toLowerCase();

    const password =
      data.password.trim();

    const user = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (user) {

      setLoginError("");

      if (rememberMe) {
        localStorage.setItem(
          "rememberedEmail",
          email
        );
        localStorage.setItem(
          "rememberMe",
          "true"
        );
      } else {
        localStorage.removeItem(
          "rememberedEmail"
        );
        localStorage.setItem(
          "rememberMe",
          "false"
        );
      }

      dispatch(
        loginSuccess(user)
      );

      navigate("/dashboard");

    } else {

      setLoginError(
        "Invalid email or password"
      );

    }

  };

  return (

    <Box
      className="login-page"
      sx={{
        bgcolor: darkMode
          ? "#121212"
          : "#f4f6f8",
        transition: "0.3s ease",
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        px: 2,
        py: 4,
      }}
    >

      <Card
        elevation={5}
        className="login-card"
        sx={{
          bgcolor: darkMode
            ? "#1e1e1e"
            : "#ffffff",
          color: darkMode
            ? "#ffffff"
            : "#000000",
          transition: "0.3s ease",
          width: "100%",
          maxWidth: 520,
        }}
      >

        <CardContent
          className="login-content"
        >

          <Box
            className="login-logo"
          >

            <AccountTree
              color="primary"
              sx={{
                fontSize: 50,
              }}
            />

            <Typography
              variant="h4"
              gutterBottom
              className="login-title"
              sx={{
                color: darkMode
                  ? "#ffffff"
                  : "#000000",
              }}
            >
              e-GRCP
            </Typography>

            <Typography
              variant="body1"
              className="login-subtitle"
              sx={{
                color: darkMode
                  ? "#bdbdbd"
                  : "#6b7280",
              }}
            >
              Enterprise Governance,
              Risk, Compliance &
              Procurement
            </Typography>

          </Box>

          {loginError && (

            <Alert
              severity="error"
              className="login-alert"
            >
              {loginError}
            </Alert>

          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
          >

            <TextField
              label="Email Address"
              fullWidth
              margin="normal"
              {...register("email")}
              error={!!errors.email}
              helperText={
                errors.email?.message
              }
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: darkMode
                    ? "#fff"
                    : "#000",
                },

                "& .MuiInputLabel-root": {
                  color: darkMode
                    ? "#bdbdbd"
                    : "#666",
                },

                "& .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: darkMode
                      ? "#555"
                      : "#ccc",
                  },

                "& .MuiSvgIcon-root": {
                  color: darkMode
                    ? "#fff"
                    : "#666",
                },
              }}
            />

            <TextField
              label="Password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              fullWidth
              margin="normal"
              {...register("password")}
              error={!!errors.password}
              helperText={
                errors.password?.message
              }
              slotProps={{
                input: {
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
                        {showPassword
                          ? <VisibilityOff />
                          : <Visibility />}
                      </IconButton>

                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: darkMode
                    ? "#fff"
                    : "#000",
                },

                "& .MuiInputLabel-root": {
                  color: darkMode
                    ? "#bdbdbd"
                    : "#666",
                },

                "& .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: darkMode
                      ? "#555"
                      : "#ccc",
                  },

                "& .MuiSvgIcon-root": {
                  color: darkMode
                    ? "#fff"
                    : "#666",
                },
              }}
            />

            <Box className="login-options">

              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(event) => {
                      const checked =
                        event.target.checked;

                      setRememberMe(checked);

                      if (!checked) {
                        localStorage.removeItem(
                          "rememberedEmail"
                        );
                        localStorage.setItem(
                          "rememberMe",
                          "false"
                        );
                      }
                    }}
                  />
                }
                label="Remember Me"
              />

              <Link
                component="button"
                underline="hover"
                onClick={() =>
                  navigate("/forgot-password")
                }
              >
                Forgot Password?
              </Link>

            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              className="login-button"
            >
              LOGIN
            </Button>

          </form>

          <Typography
            variant="body2"
            className="login-footer"
            sx={{
              color: darkMode
                ? "#bdbdbd"
                : "#757575",
            }}
          >
            © 2026 e-GRCP Platform • Version 1.0
          </Typography>

        </CardContent>

      </Card>

      <Box
        className="login-demo-panel"
        sx={{
          width: "100%",
          maxWidth: 360,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          p: 3,
          bgcolor: darkMode
            ? "rgba(255,255,255,0.04)"
            : "rgba(0,0,0,0.02)",
          boxShadow: (theme) => theme.shadows[1],
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
        >
          Demo Accounts
        </Typography>

        <Typography
          variant="body2"
          sx={{ mb: 1 }}
        >
          Admin: admin@gmail.com
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 1 }}
        >
          Manager: manager@gmail.com
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 1 }}
        >
          Employee: employee@gmail.com
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 1 }}
        >
          Compliance: compliance@gmail.com
        </Typography>
        <Typography
          variant="body2"
        >
          Auditor: auditor@gmail.com
        </Typography>
      </Box>

    </Box>

  );

}