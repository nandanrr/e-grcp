import {
  useMemo,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useNavigate,
} from "react-router-dom";

import {
  approveRequest,
  rejectRequest,
} from "../../procurement/procurementSlice";

import MainLayout from "../../../components/layouts/MainLayout";
import KPICard from "../../../components/cards/KPICard";

import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

export default function ApprovalWorkbench() {

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const requests =
    useSelector(
      (state) =>
        state.procurement?.data ?? []
    );

  const pendingRequests =
    useMemo(
      () =>
        requests.filter(
          (item) =>
            item.status ===
            "Pending"
        ),
      [requests]
    );

  const pending =
    pendingRequests.length;

  const approved =
    requests.filter(
      (item) =>
        item.status ===
        "Approved"
    ).length;

  const rejected =
    requests.filter(
      (item) =>
        item.status ===
        "Rejected"
    ).length;

  const escalated =
    requests.filter(
      (item) =>
        item.status ===
        "Escalated"
    ).length;

  return (

    <MainLayout>

      <h1 className="dashboard-title">
        Approval Workbench
      </h1>

      <div className="dashboard-grid">

        <KPICard
          title="Pending"
          value={pending}
        />

        <KPICard
          title="Approved"
          value={approved}
        />

        <KPICard
          title="Rejected"
          value={rejected}
        />

        <KPICard
          title="Escalated"
          value={escalated}
        />

      </div>

      <Paper
        className="dashboard-chart"
      >

        <Typography
          variant="h5"
          gutterBottom
          fontWeight={600}
        >
          Approval Queue
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
                  Request
                </TableCell>

                <TableCell
                  sx={{
                    color: "white",
                    fontWeight:
                      "bold",
                  }}
                >
                  Department
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

                <TableCell
                  sx={{
                    color: "white",
                    fontWeight:
                      "bold",
                  }}
                >
                  Actions
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {pendingRequests.map(
                (item) => (

                  <TableRow
                    key={item.id}
                    hover
                  >

                    <TableCell>
                      {item.request}
                    </TableCell>

                    <TableCell>
                      {item.department}
                    </TableCell>

                    <TableCell>

                      <Chip
                        label={
                          item.status
                        }
                        color="warning"
                        size="small"
                      />

                    </TableCell>

                    <TableCell>

                      <Stack
                        direction="row"
                        spacing={1}
                      >
                                              <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            navigate(
                              `/procurement/${item.id}`
                            )
                          }
                        >
                          Review
                        </Button>

                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() =>
                            dispatch(
                              approveRequest(
                                item.id
                              )
                            )
                          }
                        >
                          Approve
                        </Button>

                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() =>
                            dispatch(
                              rejectRequest(
                                item.id
                              )
                            )
                          }
                        >
                          Reject
                        </Button>

                      </Stack>

                    </TableCell>

                  </TableRow>

                )
              )}

              {pendingRequests.length === 0 && (

                <TableRow>

                  <TableCell
                    colSpan={4}
                    align="center"
                  >

                    <Typography
                      color="text.secondary"
                      sx={{
                        py: 3,
                      }}
                    >
                      No pending requests available.
                    </Typography>

                  </TableCell>

                </TableRow>

              )}

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>

    </MainLayout>

  );

}