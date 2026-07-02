import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import MainLayout from "../../../components/layouts/MainLayout";

import settings from "../../../mocks/userSettings.json";

import {
  logout,
} from "../../auth/authSlice";

import {
  toggleDarkMode,
  toggleCompactLayout,
} from "../uiSlice";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export default function UserSettings() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const darkMode = useSelector(
    state => state.ui.darkMode
  );

  const compactLayout = useSelector(
    state => state.ui.compactLayout
  );

  const [openSnackbar, setOpenSnackbar] =
    useState(false);

  const [snackbarMessage, setSnackbarMessage] =
    useState("");

  const [twoFactor, setTwoFactor] =
    useState(false);

  const [openPasswordDialog,
    setOpenPasswordDialog] =
    useState(false);

  const [openLogoutDialog,
    setOpenLogoutDialog] =
    useState(false);

  return (

    <MainLayout>

      <Typography
        variant="h3"
        gutterBottom
      >
        User Settings
      </Typography>

      {/* Profile */}

      <Paper
        elevation={3}
        sx={{
          p:4,
          mb:3
        }}
      >

        <Typography
          variant="h5"
          gutterBottom
        >
          Profile
        </Typography>

        <Grid
          container
          spacing={3}
          alignItems="center"
        >

          <Grid item>

            <Avatar
              sx={{
                width:80,
                height:80,
                fontSize:30,
                bgcolor:"#1976d2"
              }}
            >
              N
            </Avatar>

          </Grid>

          <Grid item xs>

            <TextField
              label="Full Name"
              value={settings.name}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Email"
              value={settings.email}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Role"
              value={settings.role}
              fullWidth
              margin="normal"
            />

            <Button
              variant="contained"
              sx={{ mt:2 }}
              onClick={() => {

                setSnackbarMessage(
                  "Profile Updated Successfully"
                );

                setOpenSnackbar(true);

              }}
            >
              UPDATE PROFILE
            </Button>

          </Grid>

        </Grid>

      </Paper>

      {/* Theme */}

      <Paper
        elevation={3}
        sx={{
          p:4,
          mb:3
        }}
      >

        <Typography
          variant="h5"
          gutterBottom
        >
          Theme
        </Typography>

        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={() => {

                dispatch(
                  toggleDarkMode()
                );

                setSnackbarMessage(
                  !darkMode
                    ? "Dark Mode Enabled"
                    : "Dark Mode Disabled"
                );

                setOpenSnackbar(true);

              }}
            />
          }
          label="Dark Mode"
        />

        <FormControlLabel
          control={
            <Switch
              checked={compactLayout}
              onChange={() => {

                dispatch(
                  toggleCompactLayout()
                );

                setSnackbarMessage(
                  !compactLayout
                    ? "Compact Layout Enabled"
                    : "Compact Layout Disabled"
                );

                setOpenSnackbar(true);

              }}
            />
          }
          label="Compact Layout"
        />

      </Paper>

      {/* Preferences */}

      <Paper
        elevation={3}
        sx={{
          p:4,
          mb:3
        }}
      >

        <Typography
          variant="h5"
          gutterBottom
        >
          Preferences
        </Typography>

        <Box
          display="flex"
          flexDirection="column"
        >

          <FormControlLabel
            control={
              <Checkbox defaultChecked />
            }
            label="Receive Email Notifications"
          />

          <FormControlLabel
            control={
              <Checkbox defaultChecked />
            }
            label="Receive Approval Alerts"
          />

          <FormControlLabel
            control={<Checkbox />}
            label="Weekly Activity Summary"
          />

          <Button
            variant="contained"
            sx={{
              mt:2,
              width:"220px"
            }}
            onClick={() => {

              setSnackbarMessage(
                "Preferences Saved Successfully"
              );

              setOpenSnackbar(true);

            }}
          >
            SAVE PREFERENCES
          </Button>

        </Box>

      </Paper>
            {/* Security */}

      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 3,
        }}
      >

        <Typography
          variant="h5"
          gutterBottom
        >
          Security
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          flexWrap="wrap"
        >

          <Button
            variant="contained"
            onClick={() =>
              setOpenPasswordDialog(true)
            }
          >
            Change Password
          </Button>

          <Button
            variant="outlined"
            onClick={() => {

              setTwoFactor(!twoFactor);

              setSnackbarMessage(
                !twoFactor
                  ? "Two-Factor Authentication Enabled"
                  : "Two-Factor Authentication Disabled"
              );

              setOpenSnackbar(true);

            }}
          >
            {twoFactor
              ? "Disable Two-Factor Authentication"
              : "Enable Two-Factor Authentication"}
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={() =>
              setOpenLogoutDialog(true)
            }
          >
            Logout All Devices
          </Button>

        </Stack>

      </Paper>

      {/* Change Password Dialog */}

      <Dialog
        open={openPasswordDialog}
        onClose={() =>
          setOpenPasswordDialog(false)
        }
      >

        <DialogTitle>
          Change Password
        </DialogTitle>

        <DialogContent>

          <TextField
            label="Current Password"
            type="password"
            fullWidth
            margin="normal"
          />

          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
          />

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
          />

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() =>
              setOpenPasswordDialog(false)
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={() => {

              setOpenPasswordDialog(false);

              setSnackbarMessage(
                "Password Changed Successfully"
              );

              setOpenSnackbar(true);

            }}
          >
            Save
          </Button>

        </DialogActions>

      </Dialog>

      {/* Logout Dialog */}

      <Dialog
        open={openLogoutDialog}
        onClose={() =>
          setOpenLogoutDialog(false)
        }
      >

        <DialogTitle>
          Logout All Devices?
        </DialogTitle>

        <DialogContent>

          <Typography>
            Are you sure you want to logout from all devices?
          </Typography>

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() =>
              setOpenLogoutDialog(false)
            }
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={() => {

              setOpenLogoutDialog(false);

              dispatch(logout());

              navigate("/login", {
                replace: true,
              });

            }}
          >
            Logout
          </Button>

        </DialogActions>

      </Dialog>

      {/* Snackbar */}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() =>
          setOpenSnackbar(false)
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >

        <Alert
          severity="success"
          variant="filled"
          onClose={() =>
            setOpenSnackbar(false)
          }
        >
          {snackbarMessage}
        </Alert>

      </Snackbar>

    </MainLayout>

  );

}