import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useMemo } from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import GroupsIcon from "@mui/icons-material/Groups";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  getUserSidebarItems,
} from "../../utils/rbacUtils";

const drawerWidth = 240;

const iconMap = {
  Dashboard: DashboardIcon,
  BusinessCenter: BusinessCenterIcon,
  Groups: GroupsIcon,
  WarningAmber: WarningAmberIcon,
  VerifiedUser: VerifiedUserIcon,
  FactCheck: FactCheckIcon,
  TaskAlt: TaskAltIcon,
  NotificationsActive: NotificationsActiveIcon,
  Assessment: AssessmentIcon,
  People: PeopleIcon,
  Settings: SettingsIcon,
};

export default function Sidebar({ open = false, onClose, permanent }) {

  const role = useSelector(
    (state) => state.auth.user?.role
  );

  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const shouldBePermanent = permanent ?? isDesktop;

  const sidebarItems = useMemo(
    () => getUserSidebarItems(role),
    [role]
  );

  const handleItemClick = () => {
    if (!shouldBePermanent && onClose) {
      onClose();
    }
  };

  return (

    <Drawer
      variant={shouldBePermanent ? "permanent" : "temporary"}
      open={shouldBePermanent ? true : open}
      onClose={shouldBePermanent ? undefined : onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          top: { xs: "64px", sm: "70px" },
          height: { xs: "calc(100% - 64px)", sm: "calc(100% - 70px)" },
          borderRight: "1px solid",
          borderColor: "divider",
        },
      }}
    >

      <List>

        {sidebarItems.map((item) => {
          const IconComponent = iconMap[item.icon] || DashboardIcon;

          return (
            <ListItemButton
              key={item.id}
              component={Link}
              to={item.path}
              onClick={handleItemClick}
            >
              <IconComponent sx={{ mr: 2 }} />
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}

      </List>

    </Drawer>

  );
}