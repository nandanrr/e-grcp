import { useState } from "react";

import MainLayout from "../../../components/layouts/MainLayout";
import { getRoleDisplayName } from "../../../utils/rbacUtils";
import KPICard from "../../../components/cards/KPICard";

import users from "../../../mocks/users.json";
import SearchBar from "../../../components/common/SearchBar";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ConfirmDialog from "../../../components/common/ConfirmDialog";

export default function UserManagement() {

  const [userList, setUserList] =
    useState(users);

  const [search, setSearch] =
    useState("");

  const [roleFilter, setRoleFilter] =
    useState("All");

  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] =
    useState(null);

  const getDisplayRole = (role) => {
    const normalizedRole = role?.toString().trim();

    if (!normalizedRole) {
      return "";
    }

    const roleMap = {
      Admin: "Administrator",
      Administrator: "Administrator",
      Manager: "Procurement Manager",
      "Procurement Manager": "Procurement Manager",
      Employee: "Employee",
      "Compliance Officer": "Compliance Officer",
      Auditor: "Auditor",
    };

    return roleMap[normalizedRole] || getRoleDisplayName(normalizedRole);
  };

  const filteredUsers = userList.filter((user) => {

    const matchesSearch =
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      user.email
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "All" ||
      getDisplayRole(user.role) === roleFilter;

    return (
      matchesSearch &&
      matchesRole
    );

  });

  const totalUsers = userList.length;

  const managers =
    userList.filter(
      (user) => user.role === "Manager"
    ).length;

  const vendors =
    userList.filter(
      (user) => user.role === "Vendor"
    ).length;

  const activeUsers =
    userList.filter(
      (user) => user.status === "Active"
    ).length;

  const handleEdit = (user) => {

    alert(
      `Edit functionality for ${user.name} can be connected to a form later.`
    );

  };

  const handleDelete = (id) => {
    const idToDelete = id ?? selectedUserId;

    if (!idToDelete) {
      return;
    }

    if (
      window.confirm(
        "Are you sure you want to delete this user?"
      )
    ) {
      setUserList(
        userList.filter(
          (user) => user.id !== idToDelete
        )
      );
    }

    setOpen(false);
    setSelectedUserId(null);
  };

  return (

    <MainLayout>

      <h1>User Management</h1>

      {/* KPI Cards */}

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
          title="Total Users"
          value={totalUsers}
        />

        <KPICard
          title="Managers"
          value={managers}
        />

        <KPICard
          title="Vendors"
          value={vendors}
        />

        <KPICard
          title="Active Users"
          value={activeUsers}
        />

      </div>

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
          User Filters
        </h2>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <SearchBar
          label="Search User"
          value={search}
          placeholder="Search users..."
          sx={{
            minWidth: 300,
          }}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

          <TextField
            select
            label="Role"
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(
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

            <MenuItem value="Administrator">
              Administrator
            </MenuItem>

            <MenuItem value="Procurement Manager">
              Procurement Manager
            </MenuItem>

            <MenuItem value="Employee">
              Employee
            </MenuItem>

            <MenuItem value="Compliance Officer">
              Compliance Officer
            </MenuItem>

            <MenuItem value="Auditor">
              Auditor
            </MenuItem>

          </TextField>

        </Box>

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
          User Directory
        </h2>

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
                  Name
                </TableCell>

                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Email
                </TableCell>

                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Role
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
                    textAlign: "center",
                  }}
                >
                  Actions
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {filteredUsers.map((user) => (

                <TableRow
                  key={user.id}
                  hover
                >

                  <TableCell>
                    {user.name}
                  </TableCell>

                  <TableCell>
                    {user.email}
                  </TableCell>

                  <TableCell>

                    {getDisplayRole(user.role) === "Administrator" && (
                      <Chip
                        label="Administrator"
                        color="error"
                        size="small"
                      />
                    )}

                    {getDisplayRole(user.role) === "Procurement Manager" && (
                      <Chip
                        label="Procurement Manager"
                        color="primary"
                        size="small"
                      />
                    )}

                    {getDisplayRole(user.role) === "Employee" && (
                      <Chip
                        label="Employee"
                        color="info"
                        size="small"
                      />
                    )}

                    {getDisplayRole(user.role) === "Compliance Officer" && (
                      <Chip
                        label="Compliance Officer"
                        color="success"
                        size="small"
                      />
                    )}

                    {getDisplayRole(user.role) === "Auditor" && (
                      <Chip
                        label="Auditor"
                        color="secondary"
                        size="small"
                      />
                    )}

                  </TableCell>

                  <TableCell>

                    {user.status === "Active" ? (

                      <Chip
                        label="Active"
                        color="success"
                        size="small"
                      />

                    ) : (

                      <Chip
                        label="Inactive"
                        color="default"
                        size="small"
                      />

                    )}

                  </TableCell>

                  <TableCell
                    align="center"
                  >

                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="center"
                    >

                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() =>
                          handleEdit(user)
                        }
                      >
                        Edit
                      </Button>

                      
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => {
                          setSelectedUserId(user.id);
                          setOpen(true);
                        }}
                      >
                        Delete
                      </Button>

                      <ConfirmDialog
                        open={open}
                        title="Delete User"
                        message="Are you sure you want to delete this user?"
                        onClose={() => {
                          setOpen(false);
                          setSelectedUserId(null);
                        }}
                        onConfirm={handleDelete}
                      />

                    </Stack>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>

    </MainLayout>

  );

}