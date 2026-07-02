import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchVendors,
} from "../vendorSlice";

import MainLayout from "../../../components/layouts/MainLayout";
import "../../../styles/dashboardCommon.css";
import KPICard from "../../../components/cards/KPICard";
import SearchBar from "../../../components/common/SearchBar";
import {
  Box,
  Chip,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Loader from "../../../components/common/Loader";

import ErrorState from "../../../components/common/ErrorState";

export default function VendorList() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    data: vendors,
    loading,
    error,
  } = useSelector(
    (state) => state.vendor
  );

  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredVendors = vendors.filter((vendor) => {

    const matchesSearch = vendor.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesRisk =
      riskFilter === "All" ||
      vendor.risk === riskFilter;

    const matchesCategory =
      categoryFilter === "All" ||
      vendor.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" ||
      vendor.status === statusFilter;

    return (
      matchesSearch &&
      matchesRisk &&
      matchesCategory &&
      matchesStatus
    );

  });

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

      <h1 className="page-title">
        Vendor Governance
      </h1>

      {/* KPI Cards */}

      <div className="dashboard-grid">

        <KPICard
          title="Total Vendors"
          value={vendors.length}
        />

        <KPICard
          title="Active Vendors"
          value={
            vendors.filter(
              (v) => v.status === "Active"
            ).length
          }
        />

        <KPICard
          title="High Risk Vendors"
          value={
            vendors.filter(
              (v) => v.risk === "High"
            ).length
          }
        />

        <KPICard
          title="Pending Reviews"
          value={
            vendors.filter(
              (v) =>
                v.status ===
                "Pending Review"
            ).length
          }
        />

      </div>

      
      <SearchBar
        label="Search Vendor"
        fullWidth
        sx={{ mt: 0, mb: 3 }}
        value={search}
        placeholder="Search vendors..."
        className="page-search"
        onChange={(e) => setSearch(e.target.value)}
      />

      <Box className="page-filters">

        <TextField
          select
          label="Category"
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(
              e.target.value
            )
          }
        >
          <MenuItem value="All">
            All
          </MenuItem>

          <MenuItem value="Technology">
            Technology
          </MenuItem>

          <MenuItem value="Hardware">
            Hardware
          </MenuItem>

          <MenuItem value="Software">
            Software
          </MenuItem>

        </TextField>

        <TextField
          select
          label="Status"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
        >
          <MenuItem value="All">
            All
          </MenuItem>

          <MenuItem value="Active">
            Active
          </MenuItem>

          <MenuItem value="Inactive">
            Inactive
          </MenuItem>

          <MenuItem value="Pending Review">
            Pending Review
          </MenuItem>

        </TextField>

        <TextField
          select
          label="Risk"
          value={riskFilter}
          onChange={(e) =>
            setRiskFilter(
              e.target.value
            )
          }
        >
          <MenuItem value="All">
            All
          </MenuItem>

          <MenuItem value="Low">
            Low
          </MenuItem>

          <MenuItem value="Medium">
            Medium
          </MenuItem>

          <MenuItem value="High">
            High
          </MenuItem>

        </TextField>

      </Box>

      {/* Table */}

      <TableContainer
        component={Paper}
        className="page-table"
      >

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
                Vendor Name
              </TableCell>

              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Category
              </TableCell>

              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Risk
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>
                        {filteredVendors.map((vendor) => (

              <TableRow
                key={vendor.id}
                hover
                sx={{
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate(`/vendors/${vendor.id}`)
                }
              >

                <TableCell>
                  {vendor.id}
                </TableCell>

                <TableCell>
                  {vendor.name}
                </TableCell>

                <TableCell>
                  {vendor.category}
                </TableCell>

                <TableCell>

                  {vendor.risk === "Low" && (
                    <Chip
                      label="Low"
                      color="success"
                      size="small"
                    />
                  )}

                  {vendor.risk === "Medium" && (
                    <Chip
                      label="Medium"
                      color="warning"
                      size="small"
                    />
                  )}

                  {vendor.risk === "High" && (
                    <Chip
                      label="High"
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

    </MainLayout>

  );

}