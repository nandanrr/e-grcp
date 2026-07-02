import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@mui/lab";

import {
  Typography,
  Box,
  Paper,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import {
  CheckCircle,
  Error,
  Warning,
  Info,
  TaskAlt,
  Person,
} from "@mui/icons-material";

export default function ActivityTimeline({ activities = [] }) {

  const theme = useTheme();

  const isMobileOrTablet = useMediaQuery(
    theme.breakpoints.down("md")
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle sx={{ color: "green" }} />;

      case "Active":
        return <Info sx={{ color: "blue" }} />;

      case "Pending":
        return <Warning sx={{ color: "orange" }} />;

      case "Failed":
        return <Error sx={{ color: "red" }} />;

      case "Scheduled":
        return <TaskAlt sx={{ color: "purple" }} />;

      default:
        return <CheckCircle sx={{ color: "gray" }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";

      case "Active":
        return "info";

      case "Pending":
        return "warning";

      case "Failed":
        return "error";

      case "Scheduled":
        return "secondary";

      default:
        return "default";
    }
  };

  const formatDate = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "N/A";
    }
  };

  if (!activities || activities.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography color="textSecondary">
          No activities to display
        </Typography>
      </Box>
    );
  }

  return (
    <Timeline position={isMobileOrTablet ? "right" : "alternate"}>

      {activities.map((activity, index) => (

        <TimelineItem key={activity.id || index}>

          {!isMobileOrTablet && (
            <TimelineOppositeContent
              color="text.secondary"
              sx={{ flex: 0.2 }}
            >
              <Typography variant="caption">
                {formatDate(activity.timestamp)}
              </Typography>
            </TimelineOppositeContent>
          )}

          <TimelineSeparator>

            <TimelineDot
              sx={{
                bgcolor:
                  getStatusColor(
                    activity.status
                  ) === "success"
                    ? "green"
                    : getStatusColor(
                        activity.status
                      ) === "warning"
                      ? "orange"
                      : getStatusColor(
                          activity.status
                        ) === "error"
                          ? "red"
                          : "blue",
              }}
            >
              {getStatusIcon(activity.status)}
            </TimelineDot>

            {index < activities.length - 1 && (
              <TimelineConnector />
            )}

          </TimelineSeparator>

          <TimelineContent
            sx={{
              pb: 1,
              flex: isMobileOrTablet ? 1 : 0.8,
            }}
          >

            <Paper
              elevation={1}
              sx={{
                p: 2,
                backgroundColor: "background.paper",
              }}
            >

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >

                <Typography
                  variant="h6"
                  component="span"
                  sx={{ fontWeight: 600 }}
                >
                  {activity.action || activity.message}
                </Typography>

                <Chip
                  label={activity.status}
                  size="small"
                  color={getStatusColor(activity.status)}
                  variant="outlined"
                />

              </Box>

              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mb: 1 }}
              >
                {activity.details}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                  mt: 1,
                }}
              >

                {activity.module && (
                  <Chip
                    label={activity.module}
                    size="small"
                    variant="outlined"
                  />
                )}

                {activity.user && (
                  <Chip
                    icon={<Person />}
                    label={activity.user}
                    size="small"
                    variant="outlined"
                  />
                )}

              </Box>

              {isMobileOrTablet && (
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ display: "block", mt: 1 }}
                >
                  {formatDate(activity.timestamp)}
                </Typography>
              )}

            </Paper>

          </TimelineContent>

        </TimelineItem>

      ))}

    </Timeline>
  );
}