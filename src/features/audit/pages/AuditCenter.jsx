import {
  useEffect,
  useState,
  useMemo,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchAuditData,
} from "../auditSlice";

import ErrorState from "../../../components/common/ErrorState";
import MainLayout from "../../../components/layouts/MainLayout";
import KPICard from "../../../components/cards/KPICard";

import * as XLSX from "xlsx";

import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Loader from "../../../components/common/Loader";
import "../../../styles/dashboardCommon.css";

export default function AuditCenter() {

  const dispatch = useDispatch();

  const [openSnackbar, setOpenSnackbar] =
    useState(false);

  const {
    data: auditData,
    loading,
    error,
  } = useSelector(
    (state) => state.audit
  );

  const procurementRequests = useSelector(
    (state) => state.procurement?.data ?? []
  );

  useEffect(() => {

    dispatch(fetchAuditData());

  }, [dispatch]);

  const dynamicAuditEntries = useMemo(() => {
    return procurementRequests.map((request) => ({
      id: `procurement-${request.id}`,
      activity: `${request.request} ${request.status}`,
      user: request.submittedBy,
      module: "Procurement",
      date: request.lastUpdatedAt || request.submittedDate || new Date().toISOString(),
      status: request.status === "Approved" ? "Completed" : request.status === "Rejected" ? "Failed" : "Pending",
    }));
  }, [procurementRequests]);

  const auditEntries = useMemo(() => {
    return [...(auditData || []), ...dynamicAuditEntries];
  }, [auditData, dynamicAuditEntries]);

  const generateAuditReport = () => {

    const worksheet =
      XLSX.utils.json_to_sheet(
        auditEntries
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Audit Report"
    );

    XLSX.writeFile(
      workbook,
      "Audit_Report.xlsx"
    );

    setOpenSnackbar(true);

  };

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

  const totalAudits =
    auditEntries.length;

  const completed =
    auditEntries.filter(
      (item) =>
        item.status ===
        "Completed"
    ).length;

  const pending =
    auditEntries.filter(
      (item) =>
        item.status ===
        "Pending"
    ).length;

  const reports =
    auditEntries.filter(
      (item) =>
        item.status ===
        "Completed"
    ).length;

  return (

    <MainLayout>

      <h1>Audit Center</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >

        <KPICard
          title="Total Audits"
          value={totalAudits}
        />

        <KPICard
          title="Completed"
          value={completed}
        />

        <KPICard
          title="Pending"
          value={pending}
        />

        <KPICard
          title="Reports"
          value={reports}
        />

      </div>

      <Paper
        className="dashboard-chart"
      >

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mb: 2,
          }}
        >

          <Button
            variant="contained"
            startIcon={
              <FileDownloadIcon />
            }
            onClick={
              generateAuditReport
            }
          >
            Generate Report
          </Button>

        </Box>

        <Typography
          variant="h5"
          gutterBottom
          fontWeight={600}
        >
          Audit History
        </Typography>

        <TableContainer
          component={Paper}
        >

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
                  Activity
                </TableCell>

                <TableCell
                  sx={{
                    color: "white",
                    fontWeight:
                      "bold",
                  }}
                >
                  User
                </TableCell>

                <TableCell
                  sx={{
                    color: "white",
                    fontWeight:
                      "bold",
                  }}
                >
                  Module
                </TableCell>

                <TableCell
                  sx={{
                    color: "white",
                    fontWeight:
                      "bold",
                  }}
                >
                  Date
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

              {auditEntries.map((item) => (

                <TableRow
                  key={item.id}
                  hover
                >

                  <TableCell>
                    {item.activity}
                  </TableCell>

                  <TableCell>
                    {item.user}
                  </TableCell>

                  <TableCell>
                    {item.module}
                  </TableCell>

                  <TableCell>
                    {item.date}
                  </TableCell>

                  <TableCell>

                    {item.status ===
                      "Completed" && (
                      <Chip
                        label="Completed"
                        color="success"
                        size="small"
                      />
                    )}

                    {item.status ===
                      "Pending" && (
                      <Chip
                        label="Pending"
                        color="warning"
                        size="small"
                      />
                    )}

                    {item.status ===
                      "Failed" && (
                      <Chip
                        label="Failed"
                        color="error"
                        size="small"
                      />
                    )}

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>

      {/* User Activities */}

      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 3,
        }}
      >

        <Typography
          variant="h5"
          gutterBottom
          fontWeight={600}
        >
          User Activities
        </Typography>

        <ul>

          {auditEntries.map((item) => (

            <li
              key={item.id}
              style={{
                marginBottom: "10px",
              }}
            >

              <strong>
                {item.user}
              </strong>
              {" "}
              performed{" "}
              <strong>
                {item.activity}
              </strong>
              {" "}
              in{" "}
              <strong>
                {item.module}
              </strong>
                          </li>

          ))}

        </ul>

      </Paper>

      {/* System Logs */}

      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 3,
          mb: 4,
        }}
      >

        <Typography
          variant="h5"
          gutterBottom
          fontWeight={600}
        >
          System Logs
        </Typography>

        <ul>

          {auditEntries.map((item) => (

            <li
              key={item.id}
              style={{
                marginBottom: "10px",
              }}
            >

              {item.date}

              {" | "}

              <strong>
                {item.user}
              </strong>

              {" | "}

              {item.activity}

              {" | "}

              <Chip
                label={item.status}
                color={
                  item.status ===
                  "Completed"
                    ? "success"
                    : item.status ===
                      "Pending"
                    ? "warning"
                    : "error"
                }
                size="small"
                sx={{
                  ml: 1,
                }}
              />

            </li>

          ))}

        </ul>

      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() =>
          setOpenSnackbar(false)
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >

        <Alert
          severity="success"
          variant="filled"
          onClose={() =>
            setOpenSnackbar(false)
          }
          sx={{
            width: "100%",
          }}
        >

          Audit report generated successfully!

        </Alert>

      </Snackbar>

    </MainLayout>

  );

}