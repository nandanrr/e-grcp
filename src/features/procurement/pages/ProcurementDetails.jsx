import { useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import MainLayout from "../../../components/layouts/MainLayout";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

export default function ProcurementDetails() {

  const { id } = useParams();

  const [tab, setTab] = useState(0);

  const requests = useSelector(
    (state) => state.procurement?.data ?? []
  );

  const currentUser = useSelector(
    (state) => state.auth.user
  );

  const request = requests.find(
    (item) => item.id === Number(id)
  );

  const hasRequestAccess =
    currentUser?.role !== "Employee" ||
    request?.submittedByEmail ===
      currentUser.email ||
    request?.submittedBy ===
      currentUser.name;

  if (!request || !hasRequestAccess) {
    return (
      <MainLayout>
        <Typography
          variant="h4"
          gutterBottom
        >
          Access Denied
        </Typography>
        <Typography>
          You do not have permission to
          view this procurement
          request.
        </Typography>
      </MainLayout>
    );
  }

  return (

    <MainLayout>

      <h2>Procurement Details</h2>

      <Paper sx={{ mt: 2 }}>

        <Tabs
          value={tab}
          onChange={(e, newValue) =>
            setTab(newValue)
          }
        >

          <Tab label="Overview" />

          <Tab label="Attachments" />

          <Tab label="Approval History" />

          <Tab label="Comments" />

          <Tab label="Audit Logs" />

        </Tabs>

        <Box sx={{ mt: 3, p: 2 }}>

          {/* ---------------- Overview ---------------- */}

          {tab === 0 && (

            <>

              <Typography
                variant="h6"
                gutterBottom
              >
                Overview
              </Typography>

              <Typography sx={{ mb: 2 }}>
                <strong>Request ID:</strong>{" "}
                {request?.id}
              </Typography>

              <Typography sx={{ mb: 2 }}>
                <strong>Request:</strong>{" "}
                {request?.request}
              </Typography>

              <Typography sx={{ mb: 2 }}>
                <strong>Department:</strong>{" "}
                {request?.department}
              </Typography>

              <Typography sx={{ mb: 2 }}>
                <strong>Priority:</strong>{" "}
                {request?.priority}
              </Typography>

              <Typography
                sx={{
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >

                <strong>Status:</strong>

                <Chip
                  label={request?.status}
                  color={
                    request?.status ===
                    "Approved"
                      ? "success"
                      : request?.status ===
                        "Rejected"
                      ? "error"
                      : "warning"
                  }
                  size="small"
                />

              </Typography>

              <Typography sx={{ mb: 2 }}>
                <strong>Submitted By:</strong>{" "}
                {request?.submittedBy}
              </Typography>

              <Typography sx={{ mb: 2 }}>
                <strong>Submitted Date:</strong>{" "}
                {request?.submittedDate}
              </Typography>

              <Typography sx={{ mb: 2 }}>
                <strong>Description:</strong>{" "}
                {request?.description}
              </Typography>

            </>

          )}
                    {/* ---------------- Attachments ---------------- */}

          {tab === 1 && (

            <>

              <Typography
                variant="h6"
                gutterBottom
              >
                Attachments
              </Typography>

              {request?.attachments?.length > 0 ? (

                request.attachments.map(
                  (
                    attachment,
                    index
                  ) => (

                    <Typography
                      key={index}
                      sx={{ mb: 1 }}
                    >
                      📄 {attachment}
                    </Typography>

                  )
                )

              ) : (

                <Typography
                  color="text.secondary"
                >
                  No attachments available.
                </Typography>

              )}

            </>

          )}

          {/* ---------------- Approval History ---------------- */}

          {tab === 2 && (

            <>

              <Typography
                variant="h6"
                gutterBottom
              >
                Approval History
              </Typography>

              {request?.approvalHistory?.length >
              0 ? (

                request.approvalHistory.map(
                  (
                    history,
                    index
                  ) => (

                    <Paper
                      key={index}
                      variant="outlined"
                      sx={{
                        p: 2,
                        mb: 2,
                      }}
                    >

                      <Typography
                        fontWeight="bold"
                      >
                        {history.stage}
                      </Typography>

                      <Typography>
                        Status:
                        {" "}
                        {history.status}
                      </Typography>

                      <Typography
                        color="text.secondary"
                      >
                        Date:
                        {" "}
                        {history.date ??
                          "Pending"}
                      </Typography>

                    </Paper>

                  )
                )

              ) : (

                <Typography
                  color="text.secondary"
                >
                  No approval history
                  available.
                </Typography>

              )}

            </>

          )}
                    {/* ---------------- Comments ---------------- */}

          {tab === 3 && (

            <>

              <Typography
                variant="h6"
                gutterBottom
              >
                Comments
              </Typography>

              {request?.comments?.length > 0 ? (

                request.comments.map(
                  (
                    comment,
                    index
                  ) => (

                    <Paper
                      key={index}
                      variant="outlined"
                      sx={{
                        p: 2,
                        mb: 2,
                      }}
                    >

                      <Typography
                        fontWeight="bold"
                      >
                        {comment.user}
                      </Typography>

                      <Typography
                        sx={{ my: 1 }}
                      >
                        {comment.message}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {comment.date}
                      </Typography>

                    </Paper>

                  )
                )

              ) : (

                <Typography
                  color="text.secondary"
                >
                  No comments available.
                </Typography>

              )}

            </>

          )}

          {/* ---------------- Audit Logs ---------------- */}

          {tab === 4 && (

            <>

              <Typography
                variant="h6"
                gutterBottom
              >
                Audit Logs
              </Typography>

              {request?.auditLogs?.length > 0 ? (

                request.auditLogs.map(
                  (
                    log,
                    index
                  ) => (

                    <Paper
                      key={index}
                      variant="outlined"
                      sx={{
                        p: 2,
                        mb: 2,
                      }}
                    >

                      <Typography
                        fontWeight="bold"
                      >
                        {log.action}
                      </Typography>

                      <Typography>
                        Performed By:
                        {" "}
                        {log.performedBy}
                      </Typography>

                      <Typography
                        color="text.secondary"
                      >
                        {log.date}
                      </Typography>

                    </Paper>

                  )
                )

              ) : (

                <Typography
                  color="text.secondary"
                >
                  No audit logs available.
                </Typography>

              )}

            </>

          )}

        </Box>

      </Paper>

    </MainLayout>

  );

}