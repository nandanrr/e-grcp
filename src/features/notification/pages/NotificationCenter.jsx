import { useEffect, useMemo } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchNotificationData,
} from "../notificationSlice";

import MainLayout from "../../../components/layouts/MainLayout";
import KPICard from "../../../components/cards/KPICard";

import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ErrorState from "../../../components/common/ErrorState";
import "../../../styles/dashboardCommon.css";
import Loader from "../../../components/common/Loader";

import {
  getRoleDisplayName,
} from "../../../utils/rbacUtils";

export default function NotificationCenter() {

  const dispatch = useDispatch();

  const {
    data: notificationData,
    loading,
    error,
  } = useSelector(
    (state) => state.notification
  );

  const procurementRequests = useSelector(
    (state) => state.procurement?.data ?? []
  );

  const currentUser = useSelector(
    (state) => state.auth.user
  );

  const userRole = currentUser?.role;

  const roleSpecificNotifications = useMemo(() => {
    const dynamicNotifications = procurementRequests.map((request) => ({
      id: `procurement-${request.id}`,
      message: `${request.request} ${request.status === "Pending" ? "is awaiting approval" : `was ${request.status?.toLowerCase()}`}`,
      type: request.status === "Pending" ? "REQUEST_SUBMITTED" : "REQUEST_APPROVED",
      priority: request.priority === "High" ? "High" : request.priority === "Medium" ? "Medium" : "Low",
      status: request.status === "Pending" ? "Unread" : "Read",
      recipientRole: request.status === "Pending" ? "Procurement Manager" : userRole,
      recipientEmail: request.submittedByEmail,
      time: request.lastUpdatedAt || request.submittedDate || new Date().toISOString(),
    }));

    return dynamicNotifications;
  }, [procurementRequests, userRole]);

  const filteredNotifications = [...(notificationData || []), ...roleSpecificNotifications].filter((item) => {
    if (
      !item.recipientRole &&
      !item.recipientEmail
    ) {
      return true;
    }

    if (
      item.recipientEmail &&
      currentUser?.email
    ) {
      return (
        item.recipientEmail ===
        currentUser.email
      );
    }

    if (
      item.recipientRole &&
      userRole
    ) {
      return (
        item.recipientRole ===
        userRole
      );
    }

    return false;
  });

  useEffect(() => {

    if (
      notificationData.length === 0
    ) {

      dispatch(
        fetchNotificationData()
      );

    }

  }, [
    dispatch,
    notificationData.length,
  ]);

  if (loading) {

    return (

      <MainLayout>
            <Loader/>
      </MainLayout>

    );

  }

  if (error) {

    return (

      <ErrorState
      title="Loading Failed"
      message={error}
      onRetry={() => window.location.reload()}
    />

    );

  }

  const total =
    filteredNotifications.length;

  const unread =
    filteredNotifications.filter(
      (item) =>
        item.status === "Unread"
    ).length;

  const read =
    filteredNotifications.filter(
      (item) =>
        item.status === "Read"
    ).length;

  const highPriority =
    filteredNotifications.filter(
      (item) =>
        item.priority === "High"
    ).length;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "default";
    }
  };

  return (

    <MainLayout>

      <h1 className="page-title">
        Notification Center ({getRoleDisplayName(userRole)})
      </h1>

      <div className="kpi-grid">

        <KPICard
          title="Notifications"
          value={total}
        />

        <KPICard
          title="Unread"
          value={unread}
          color="warning"
        />

        <KPICard
          title="Read"
          value={read}
          color="success"
        />

        <KPICard
          title="High Priority"
          value={highPriority}
          color="error"
        />

      </div>

      <Paper className="dashboard-chart">

        <Typography
          variant="h5"
          gutterBottom
          color="text.primary"
          fontWeight={600}
        >
          Real-Time Notifications
        </Typography>

        {filteredNotifications.length === 0 ? (
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Typography color="textSecondary">
              No notifications for your role
            </Typography>
          </Box>
        ) : (
          <TableContainer component={Paper}>

            <Table>

              <TableHead
                sx={{
                  backgroundColor:
                    "#1976d2",
                }}
              >

                <TableRow>

                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight:
                        "bold",
                    }}
                  >
                    Message
                  </TableCell>

                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight:
                        "bold",
                    }}
                  >
                    Type
                  </TableCell>

                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight:
                        "bold",
                    }}
                  >
                    Priority
                  </TableCell>

                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight:
                        "bold",
                    }}
                  >
                    Status
                  </TableCell>

                </TableRow>

              </TableHead>

              <TableBody>

                {filteredNotifications.map(
                  (item) => (

                    <TableRow
                      key={item.id}
                      hover
                    >

                      <TableCell>
                        {item.message}
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={item.type}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={item.priority}
                          color={getPriorityColor(item.priority)}
                          size="small"
                        />
                      </TableCell>

                      <TableCell>

                        {item.status ===
                        "Unread" ? (

                          <Chip
                            label="Unread"
                            color="primary"
                            size="small"
                          />

                        ) : (

                          <Chip
                            label="Read"
                            color="default"
                            size="small"
                          />

                        )}

                      </TableCell>

                    </TableRow>

                  )
                )}

              </TableBody>

            </Table>

          </TableContainer>
        )}

      </Paper>

      <Paper
        className="dashboard-chart"
      >

        <Typography
          variant="h5"
          gutterBottom
          color="text.primary"
          fontWeight={600}
        >
          Priority Alerts
        </Typography>

        {filteredNotifications.filter(
          (item) => item.priority === "High"
        ).length === 0 ? (
          <Typography
            color="textSecondary"
            sx={{ p: 1 }}
          >
            No high-priority notifications
          </Typography>
        ) : (
          <ul>

            {filteredNotifications

              .filter(
                (item) =>
                  item.priority ===
                  "High"
              )

              .map((item) => (

                <li key={item.id}>

                  {item.message}

                </li>

              ))}

          </ul>
        )}

      </Paper>

      <Paper
        className="dashboard-chart"
      >

        <Typography
          variant="h5"
          gutterBottom
          color="text.primary"
          fontWeight={600}
        >
          Notification Statistics
        </Typography>

        <Box sx={{ p: 2 }}>
          <Typography>
            {read} Notifications Read
          </Typography>
          <Typography>
            {unread} Notifications Unread
          </Typography>
          <Typography sx={{ mt: 1, fontWeight: 600 }}>
            Total: {total}
          </Typography>
        </Box>

      </Paper>

    </MainLayout>

  );

}