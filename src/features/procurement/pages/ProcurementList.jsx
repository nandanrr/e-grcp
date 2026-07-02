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
  fetchProcurementData,
} from "../procurementSlice";

import MainLayout from "../../../components/layouts/MainLayout";
import * as XLSX from "xlsx";
import SearchBar from "../../../components/common/SearchBar";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import TablePagination from "@mui/material/TablePagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Loader from "../../../components/common/Loader";

import ErrorState from "../../../components/common/ErrorState";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import TableViewIcon from "@mui/icons-material/TableView";

import { useNavigate } from "react-router-dom";
import { canCreateInModule, canExportFromModule, isAdmin, isEmployee } from "../../../utils/rbacUtils";

export default function ProcurementList() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    data: requests,
    loading,
    error,
  } = useSelector(
    (state) => state.procurement
  );

  const currentUser = useSelector(
    (state) => state.auth.user
  );

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("newest");

  const [page, setPage] =
    useState(0);

  const [rowsPerPage, setRowsPerPage] =
    useState(5);

  useEffect(() => {

  if (requests.length === 0) {

    dispatch(fetchProcurementData());

  }

}, [
  dispatch,
  requests.length,
]);

  const shouldScopeToCurrentUser = isEmployee(currentUser?.role);

  const visibleRequests = shouldScopeToCurrentUser
    ? requests.filter(
        (item) =>
          item.submittedByEmail === currentUser?.email ||
          item.submittedBy === currentUser?.name
      )
    : requests;

  const filteredRequests = useMemo(() => {

    return visibleRequests

      .filter((item) => {

        const query = search.toLowerCase().trim();

        const matchesSearch =
          !query ||
          [item.request, item.department, item.status]
            .join(" ")
            .toLowerCase()
            .includes(query);

        const matchesStatus =
          statusFilter === "All" ||
          item.status === statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );

      })

      .sort((a, b) => {

        if (sortBy === "az") {
          return a.request.localeCompare(b.request);
        }

        if (sortBy === "za") {
          return b.request.localeCompare(a.request);
        }

        if (sortBy === "oldest") {
          return a.id - b.id;
        }

        return b.id - a.id;

      });

  }, [
    visibleRequests,
    search,
    statusFilter,
    sortBy,
  ]);

  const canCreateRequest = canCreateInModule(currentUser?.role, "procurement");
  const showEmptyState = visibleRequests.length === 0;
  const canExportData = canExportFromModule(currentUser?.role, "procurement");

  const exportCSV = () => {

    const worksheet =
      XLSX.utils.json_to_sheet(
        filteredRequests
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Procurement"
    );

    XLSX.writeFile(
      workbook,
      "Procurement_Report.csv"
    );

  };

  const exportExcel = () => {

    const worksheet =
      XLSX.utils.json_to_sheet(
        filteredRequests
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Procurement"
    );

    XLSX.writeFile(
      workbook,
      "Procurement_Report.xlsx"
    );

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

  return (

    <MainLayout>

      <h1>Procurement Workspace</h1>

      {/* Search */}

      <SearchBar
        label="Search Request"
        value={search}
        placeholder="Search procurement requests..."
        onChange={(e) =>
          setSearch(e.target.value)
        }
        sx={{
          mt: 0,
          mb: 3,
        }}
      />

      <Box
        display="flex"
        alignItems="flex-end"
        gap={2}
        mb={2}
      >
                

        {/* Filter */}

        <TextField
          select
          label="Filter Status"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          sx={{
            width: { xs: "100%", sm: 240 },
            mb: { xs: 0, sm: 2 },
          }}
        >

          <MenuItem value="All">
            All
          </MenuItem>

          <MenuItem value="Pending">
            Pending
          </MenuItem>

          <MenuItem value="Approved">
            Approved
          </MenuItem>

          <MenuItem value="Rejected">
            Rejected
          </MenuItem>

        </TextField>

        {/* Sort */}

        <TextField
          select
          label="Sort By"
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
          sx={{
            width: { xs: "100%", sm: 240 },
            ml: { xs: 0, sm: 2 },
          }}
        >

          <MenuItem value="newest">
            Newest First
          </MenuItem>

          <MenuItem value="oldest">
            Oldest First
          </MenuItem>

          <MenuItem value="az">
            A-Z
          </MenuItem>

          <MenuItem value="za">
            Z-A
          </MenuItem>

        </TextField>

          {canCreateRequest && (
          <Button
          variant="contained"
          color="primary"
          onClick={() =>
            navigate("/procurement/new")
          }
          sx={{
            height: 56,
            ml: 2,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: 2,
            },
          }}
        >
          + Create Request
        </Button>
        )}
        {/* Export Buttons */}

        {canExportData && (
        <><Button
          variant="contained"
          color="primary"
          startIcon={<FileDownloadIcon />}
          onClick={exportCSV}
          sx={{
            height: 56,
            ml: 2,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: 2,
            },
          }}
        >
          Export CSV
        </Button><Button
          variant="contained"
          color="success"
          startIcon={<TableViewIcon />}
          onClick={exportExcel}
          sx={{
            height: 56,
            ml: 2,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: 2,
            },
          }}
        >
          Export Excel
        </Button></>
        )}

      </Box>

      {showEmptyState ? (
        <Box
          sx={{
            mt: 3,
            minHeight: { xs: 280, md: 360 },
            p: 4,
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: 2,
            bgcolor: "background.paper",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" sx={{ mb: 1 }}>
            📄
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            No procurement requests found.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Click "Create Request" to submit your first procurement request.
          </Typography>
          {canCreateRequest && (
            <Button
              variant="contained"
              onClick={() => navigate("/procurement/new")}
              sx={{
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: 2,
                },
              }}
            >
              Create Request
            </Button>
          )}
        </Box>
      ) : (
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
                ID
              </TableCell>

              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Request
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

            </TableRow>

          </TableHead>

          <TableBody>

            {filteredRequests
              .slice(
                page * rowsPerPage,
                page * rowsPerPage +
                  rowsPerPage
              )
              .map((row) => (

                <TableRow
                  key={row.id}
                  hover
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate(
                      `/procurement/${row.id}`
                    )
                  }
                >

                  <TableCell>
                    {row.id}
                  </TableCell>

                  <TableCell>
                    {row.request}
                  </TableCell>

                  <TableCell>
                    {row.department}
                  </TableCell>

                  <TableCell>

                    {row.status ===
                      "Pending" && (
                      <Chip
                        label="Pending"
                        color="warning"
                        size="small"
                      />
                    )}

                    {row.status ===
                      "Approved" && (
                      <Chip
                        label="Approved"
                        color="success"
                        size="small"
                      />
                    )}

                    {row.status ===
                      "Rejected" && (
                      <Chip
                        label="Rejected"
                        color="error"
                        size="small"
                      />
                    )}

                  </TableCell>

                </TableRow>

              ))}

          </TableBody>

        </Table>
                <TablePagination
          component="div"
          count={filteredRequests.length}
          page={page}
          onPageChange={(
            event,
            newPage
          ) =>
            setPage(newPage)
          }
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(
            event
          ) => {

            setRowsPerPage(
              parseInt(
                event.target.value,
                10
              )
            );

            setPage(0);

          }}
          rowsPerPageOptions={[
            5,
            10,
          ]}
        />

      </TableContainer>
      )}

    </MainLayout>

  );

}