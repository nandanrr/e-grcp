import { useState, useEffect, useMemo } from "react";
import SearchBar from "../../../components/common/SearchBar";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchReportData,
} from "../reportSlice";

import MainLayout from "../../../components/layouts/MainLayout";
import KPICard from "../../../components/cards/KPICard";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Loader from "../../../components/common/Loader";
import Typography from "@mui/material/Typography";
import ErrorState from "../../../components/common/ErrorState";

import * as XLSX from "xlsx";

export default function ReportingCenter() {

  const dispatch = useDispatch();

  const {
    data: reportData,
    loading,
    error,
  } = useSelector(
    (state) => state.report
  );

  const procurementRequests = useSelector(
    (state) => state.procurement?.data ?? []
  );

  useEffect(() => {
    dispatch(fetchReportData());
  }, [dispatch]);

  const [reportType, setReportType] = useState("All");
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");

  const dynamicReports = useMemo(() => {
    return procurementRequests.map((request) => ({
      id: `procurement-${request.id}`,
      report: `${request.request} Report`,
      department: request.department,
      generatedOn: request.lastUpdatedAt || request.submittedDate || new Date().toISOString(),
      status: request.status === "Pending" ? "Pending" : "Generated",
    }));
  }, [procurementRequests]);

  const reportsToDisplay = useMemo(() => {
    return [...(reportData || []), ...dynamicReports];
  }, [reportData, dynamicReports]);

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

  const filteredReports = reportsToDisplay.filter((item) => {

    const searchMatch =
      item.report
        .toLowerCase()
        .includes(search.toLowerCase());

    const typeMatch =
      reportType === "All" ||
      item.department === reportType;

    const statusMatch =
      status === "All" ||
      item.status === status;

    return (
      searchMatch &&
      typeMatch &&
      statusMatch
    );

  });

  const totalReports = reportsToDisplay.length;

  const generated =
    reportsToDisplay.filter(
      (item) => item.status === "Generated"
    ).length;

  const pending =
    reportsToDisplay.filter(
      (item) => item.status === "Pending"
    ).length;

  const savedReports = reportsToDisplay.length;

  const exportCSV = () => {

    const headers = [
      "Report",
      "Department",
      "Generated On",
      "Status",
    ];

    const rows = reportsToDisplay.map((item) => [
      item.report,
      item.department,
      item.generatedOn,
      item.status,
    ]);

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = "Reports.csv";
    link.click();

    URL.revokeObjectURL(url);

  };

  const exportExcel = () => {

    const worksheet =
      XLSX.utils.json_to_sheet(reportsToDisplay);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Reports"
    );

    XLSX.writeFile(
      workbook,
      "Reports.xlsx"
    );

  };

  return (

    <MainLayout>

      <h1>Reporting Center</h1>

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
          title="Reports"
          value={totalReports}
        />

        <KPICard
          title="Generated"
          value={generated}
        />

        <KPICard
          title="Pending"
          value={pending}
        />

        <KPICard
          title="Saved Reports"
          value={savedReports}
        />

      </div>

      <Paper
        sx={{
          p: 3,
          mb: 3,
        }}
      >

        <Typography
          variant="h5"
          gutterBottom
          color="text.primary"
          fontWeight={600}
        >
          Report Filters
        </Typography>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >

          <SearchBar
  label="Search Report"
  value={search}
  placeholder="Search reports..."
  onChange={(e) =>
    setSearch(e.target.value)
  }
/>

          <TextField
            select
            label="Report Type"
            value={reportType}
            onChange={(e) =>
              setReportType(
                e.target.value
              )
            }
            sx={{
              width: 220,
            }}
          >

            <MenuItem value="All">
              All
            </MenuItem>

            <MenuItem value="Procurement">
              Procurement
            </MenuItem>

            <MenuItem value="Vendor">
              Vendor
            </MenuItem>

            <MenuItem value="Risk">
              Risk
            </MenuItem>

            <MenuItem value="Compliance">
              Compliance
            </MenuItem>

          </TextField>

          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            sx={{
              width: 180,mb: 2
            }}
          >

            <MenuItem value="All">
              All
            </MenuItem>

            <MenuItem value="Generated">
              Generated
            </MenuItem>

            <MenuItem value="Pending">
              Pending
            </MenuItem>

          </TextField>

        </div>
        <Typography
          variant="h5"
          gutterBottom
          color="text.primary"
          fontWeight={600}
        >
          Reports
        </Typography>

        <TableContainer component={Paper}>

          <Table>

            <TableHead
              sx={{
                backgroundColor: "#1976d2",
              }}
            >

              <TableRow>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Report
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Department
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Generated On
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Status
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Action
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>
                            {filteredReports.map((item) => (

                <TableRow
                  key={item.id}
                  hover
                >

                  <TableCell>
                    {item.report}
                  </TableCell>

                  <TableCell>
                    {item.department}
                  </TableCell>

                  <TableCell>
                    {item.generatedOn}
                  </TableCell>

                  <TableCell>

                    {item.status === "Generated" && (
                      <Chip
                        label="Generated"
                        color="success"
                        size="small"
                      />
                    )}

                    {item.status === "Pending" && (
                      <Chip
                        label="Pending"
                        color="warning"
                        size="small"
                      />
                    )}

                  </TableCell>

                  <TableCell>

                    <Button
                      variant="outlined"
                      size="small"
                    >
                      VIEW
                    </Button>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </TableContainer>
      </Paper>

      

      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 3,
        }}
      >

        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Export Reports
        </h2>

        <Stack
          direction="row"
          spacing={2}
        >

          <Button
            variant="contained"
            onClick={exportCSV}
          >
            EXPORT CSV
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={exportExcel}
          >
            EXPORT EXCEL
          </Button>

        </Stack>

      </Paper>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
        }}
      >

        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Saved Reports
        </h2>

        <ul>

          <li>
            Monthly Procurement Report
          </li>

          <li>
            Vendor Performance Report
          </li>

          <li>
            Quarterly Risk Report
          </li>

          <li>
            Compliance Summary
          </li>

        </ul>

      </Paper>

    </MainLayout>

  );

}