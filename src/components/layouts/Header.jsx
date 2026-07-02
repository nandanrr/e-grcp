import {
  useState,
  useCallback,
  useMemo,
} from "react";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation, useNavigate } from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  logout,
} from "../../features/auth/authSlice";

import {
  toggleDarkMode,
} from "../../features/settings/uiSlice";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import ListItemIcon from "@mui/material/ListItemIcon";
import Chip from "@mui/material/Chip";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";

import {
  getRoleDisplayName,
} from "../../utils/rbacUtils";

export default function Header({ onMenuToggle }) {

  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useDispatch();

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const darkMode = useSelector(
    (state) => state.ui?.darkMode ?? false
  );

  const user = useSelector(
    (state) => state.auth?.user
  );

  const notifications = useSelector(
    (state) => state.notification?.data ?? []
  );

  const procurementRequests = useSelector(
    (state) => state.procurement?.data ?? []
  );

  const role = user?.role;

  const unreadNotificationCount = useMemo(() => {
    const dynamicNotifications = procurementRequests.map((request) => ({
      id: `procurement-${request.id}`,
      status: request.status === "Pending" ? "Unread" : "Read",
      recipientRole: request.status === "Pending" ? "Procurement Manager" : role,
      recipientEmail: request.submittedByEmail,
    }));

    return [...notifications, ...dynamicNotifications].filter((n) => {
      if (n.status !== "Unread") {
        return false;
      }

      if (n.recipientEmail && user?.email) {
        return n.recipientEmail === user.email;
      }

      if (n.recipientRole && role) {
        return n.recipientRole === role;
      }

      return true;
    }).length;
  }, [notifications, procurementRequests, role, user?.email]);

  const [anchorEl, setAnchorEl] =
    useState(null);

  const handleMenuOpen = useCallback((event) => {

    setAnchorEl(event.currentTarget);

  }, []);

  const handleMenuClose = useCallback(() => {

    setAnchorEl(null);

  }, []);

  const handleThemeToggle = useCallback(() => {

    dispatch(toggleDarkMode());

  }, [dispatch]);

  const handleNotifications = useCallback(() => {

    navigate("/notifications");

    handleMenuClose();

  }, [
    navigate,
    handleMenuClose,
  ]);

  const handleLogout = useCallback(() => {

    localStorage.removeItem("token");

    dispatch(logout());

    handleMenuClose();

    navigate("/login", {
      replace: true,
    });

  }, [
    dispatch,
    navigate,
    handleMenuClose,
  ]);

  const getSearchPlaceholder = useCallback(() => {
    const path = location.pathname;

    if (path.startsWith("/procurement")) {
      return "Search procurement requests...";
    }

    if (path.startsWith("/vendors")) {
      return "Search vendors...";
    }

    if (path.startsWith("/risk")) {
      return "Search risks...";
    }

    if (path.startsWith("/compliance")) {
      return "Search compliance records...";
    }

    if (path.startsWith("/audit")) {
      return "Search audit logs...";
    }

    if (path.startsWith("/approval")) {
      return "Search approval requests...";
    }

    if (path.startsWith("/notifications")) {
      return "Search notifications...";
    }

    if (path.startsWith("/reports")) {
      return "Search reports...";
    }

    if (path.startsWith("/users")) {
      return "Search users...";
    }

    if (path.startsWith("/settings")) {
      return "Search settings...";
    }

    return "Global Search...";
  }, [location.pathname]);

  const getInitials = (name) => {
    if (!name) return "N";
    const parts = name.split(" ").filter(Boolean);
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (
      (parts[0]?.[0] || "") + (parts[1]?.[0] || "")
    ).toUpperCase();
  };

  return (

    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        zIndex: 1201,
        bgcolor: "primary.main",
        boxShadow:
          "0 2px 8px rgba(0,0,0,0.15)",
        borderRadius: 0,
      }}
    >

      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: { xs: 1, md: 2 },
          minHeight: { xs: 64, sm: 70 },
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >

        {/* Logo */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {onMenuToggle && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={onMenuToggle}
              aria-label="Toggle navigation"
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant={isMobile ? "h6" : "h5"}
            fontWeight="bold"
          >
            e-GRCP
          </Typography>

          {!isMobile && user && (
            <Chip
              label={getRoleDisplayName(role)}
              size="small"
              variant="outlined"
              sx={{
                ml: 2,
                color: "white",
                borderColor: "rgba(255,255,255,0.5)",
              }}
            />
          )}
        </Box>

        {/* Search */}

        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor:
                "rgba(255,255,255,0.18)",
              borderRadius: "30px",
              px: 2,
              py: 0.5,
              width: { md: 320, lg: 400 },
              maxWidth: 400,
              transition: "0.3s",

              "&:hover": {
                backgroundColor:
                  "rgba(255,255,255,0.28)",
              },
            }}
          >

            <SearchIcon
              sx={{
                color: "white",
              }}
            />

            <InputBase
              placeholder={getSearchPlaceholder()}
              sx={{
                ml: 1,
                color: "white",
                flex: 1,

                "& input::placeholder": {
                  color: "#f5f5f5",
                  opacity: 1,
                },
              }}
            />

          </Box>
        )}

        {/* Right Side */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1 },
          }}
        >

          {/* Theme Toggle */}

          <Tooltip
            title={
              darkMode
                ? "Switch to Light Mode"
                : "Switch to Dark Mode"
            }
          >

            <IconButton
              color="inherit"
              onClick={handleThemeToggle}
            >

              {darkMode ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon />
              )}

            </IconButton>

          </Tooltip>

          {/* Notifications */}

          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              onClick={handleNotifications}
            >

              <Badge
                badgeContent={unreadNotificationCount}
                color="error"
                overlap="circular"
              >

                <NotificationsIcon />

              </Badge>

            </IconButton>
          </Tooltip>

          {/* Avatar */}

          <IconButton
            onClick={handleMenuOpen}
            aria-label="Open profile menu"
          >

            <Avatar
              sx={{
                width: 38,
                height: 38,
                bgcolor: "#fff",
                color: "#1976d2",
                fontWeight: "bold",
              }}
            >
              {getInitials(user?.name || "N")}
            </Avatar>

          </IconButton>

          {/* Profile Menu */}

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >

            <MenuItem disabled>
              <Box sx={{ py: 0.5 }}>
                <Typography variant="body2" fontWeight={600}>
                  {user?.name}
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                >
                  {getRoleDisplayName(role)}
                </Typography>
              </Box>
            </MenuItem>

            <MenuItem
              onClick={handleLogout}
            >

              <ListItemIcon>

                <LogoutIcon
                  fontSize="small"
                />

              </ListItemIcon>

              Logout

            </MenuItem>

          </Menu>

        </Box>

      </Toolbar>

    </AppBar>

  );
}