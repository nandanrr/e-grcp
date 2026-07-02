import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchComplianceData,
} from "../complianceSlice";

import MainLayout from "../../../components/layouts/MainLayout";
import KPICard from "../../../components/cards/KPICard";
import "../../../styles/dashboardCommon.css";

import {
  Typography,
  Paper,
  Chip,
} from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ErrorState from "../../../components/common/ErrorState";
import Loader from "../../../components/common/Loader";

export default function ComplianceDashboard() {

  const dispatch = useDispatch();

  const {
    data: complianceData,
    loading,
    error,
  } = useSelector(
    (state) => state.compliance
  );

  useEffect(() => {
    dispatch(fetchComplianceData());
  }, [dispatch]);

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

  const totalCompliance = complianceData.length;

  const violations =
    complianceData.filter(
      (item) => item.status === "Violation"
    ).length;

  const pending =
    complianceData.filter(
      (item) => item.status === "Pending"
    ).length;

  const compliant =
    complianceData.filter(
      (item) => item.status === "Compliant"
    ).length;

  return (
    <MainLayout>

      <h1>Compliance Center</h1>

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
          title="Compliance Records"
          value={totalCompliance}
        />

        <KPICard
          title="Violations"
          value={violations}
        />

        <KPICard
          title="Pending Reviews"
          value={pending}
        />

        <KPICard
          title="Compliant"
          value={compliant}
        />

      </div>

      <Paper className="dashboard-chart">

        <Typography
          variant="h5"
          gutterBottom
          color="text.primary"
          fontWeight={600}
        >Compliance Monitoring</Typography>

        <TableContainer component={Paper}>

          <Table>

            <TableHead
              sx={{
                backgroundColor: "#1976d2",
              }}
            >

              <TableRow>

                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Compliance Item
                </TableCell>

                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Department
                </TableCell>

                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Status
                </TableCell>

                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Due Date
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>
                            {complianceData.map((item) => (

                <TableRow
                  key={item.id}
                  hover
                >

                  <TableCell>
                    {item.item}
                  </TableCell>

                  <TableCell>
                    {item.department}
                  </TableCell>

                  <TableCell>

                    {item.status === "Compliant" && (
                      <Chip
                        label="Compliant"
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

                    {item.status === "Violation" && (
                      <Chip
                        label="Violation"
                        color="error"
                        size="small"
                      />
                    )}

                  </TableCell>

                  <TableCell>
                    {item.dueDate}
                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>

      <Paper className="dashboard-chart">

        <Typography
          variant="h5"
          gutterBottom
          color="text.primary"
          fontWeight={600}
        >
          Violations
        </Typography>

        <TableContainer component={Paper}>

          <Table>

            <TableHead sx={{ backgroundColor: "#1976d2" }}>

              <TableRow>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Violation
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Department
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Severity
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              <TableRow>

                <TableCell>
                  Vendor Agreement
                </TableCell>

                <TableCell>
                  Procurement
                </TableCell>

                <TableCell>

                  <Chip
                    label="High"
                    color="error"
                    size="small"
                  />

                </TableCell>

              </TableRow>

              <TableRow>

                <TableCell>
                  GDPR Review
                </TableCell>

                <TableCell>
                  Legal
                </TableCell>

                <TableCell>

                  <Chip
                    label="Medium"
                    color="warning"
                    size="small"
                  />

                </TableCell>

              </TableRow>

              <TableRow>

                <TableCell>
                  Security Audit
                </TableCell>

                <TableCell>
                  Security
                </TableCell>

                <TableCell>

                  <Chip
                    label="High"
                    color="error"
                    size="small"
                  />

                </TableCell>

              </TableRow>

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>

      <Paper className="dashboard-chart">

        <Typography
          variant="h5"
          gutterBottom
          color="text.primary"
          fontWeight={600}
        >
          Missing Documents
        </Typography>

        <TableContainer component={Paper}>

          <Table>

            <TableHead sx={{ backgroundColor: "#1976d2" }}>

              <TableRow>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Vendor
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Missing Document
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              <TableRow>

                <TableCell>
                  Infosys
                </TableCell>

                <TableCell>
                  Insurance Certificate.pdf
                </TableCell>

              </TableRow>

              <TableRow>

                <TableCell>
                  Dell
                </TableCell>

                <TableCell>
                  GST Certificate.pdf
                </TableCell>

              </TableRow>

              <TableRow>

                <TableCell>
                  HP
                </TableCell>

                <TableCell>
                  Vendor NDA.pdf
                </TableCell>

              </TableRow>

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>

      <Paper className="dashboard-chart">

        <Typography
          variant="h5"
          gutterBottom
          color="text.primary"
          fontWeight={600}
        >
          Expired Certifications
        </Typography>

        <TableContainer component={Paper}>

          <Table>

            <TableHead sx={{ backgroundColor: "#1976d2" }}>

              <TableRow>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Vendor
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Certification
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Expired On
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              <TableRow>

                <TableCell>
                  TCS
                </TableCell>

                <TableCell>
                  ISO 9001
                </TableCell>

                <TableCell>
                  15-Jun-2026
                </TableCell>

              </TableRow>

              <TableRow>

                <TableCell>
                  Wipro
                </TableCell>

                <TableCell>
                  SOC 2
                </TableCell>

                <TableCell>
                  28-May-2026
                </TableCell>

              </TableRow>

              <TableRow>

                <TableCell>
                  Dell
                </TableCell>

                <TableCell>
                  Cyber Security Certificate
                </TableCell>

                <TableCell>
                  10-Apr-2026
                </TableCell>

              </TableRow>

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>

    </MainLayout>

  );

}