import { useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import MainLayout from "../../../components/layouts/MainLayout";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Loader from "../../../components/common/Loader";
import ErrorState from "../../../components/common/ErrorState";

export default function VendorProfile() {

  const { id } = useParams();

  const [tab, setTab] = useState(0);

  const {
    data: vendors,
    loading,
    error,
  } = useSelector(
    (state) => state.vendor
  );

  const vendor = vendors.find(
    (v) => v.id === Number(id)
  );

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

      <h2>Vendor Profile</h2>

      <Paper sx={{ mt: 2 }}>

        <Tabs
          value={tab}
          onChange={(e, newValue) =>
            setTab(newValue)
          }
        >

          <Tab label="Basic Details" />

          <Tab label="Contacts" />

          <Tab label="Documents" />

          <Tab label="Risk Information" />

          <Tab label="History" />

        </Tabs>

        <Box sx={{ p: 3 }}>

          {tab === 0 && (
            <>
              <Typography variant="h6">
                Basic Details
              </Typography>

              <Typography>
                Vendor: {vendor?.name}
              </Typography>

              <Typography>
                Category: {vendor?.category}
              </Typography>
            </>
          )}

          {tab === 1 && (
            <>
              <Typography variant="h6">
                Contacts
              </Typography>

              <Typography>
                vendor@company.com
              </Typography>
            </>
          )}

          {tab === 2 && (
            <>
              <Typography variant="h6">
                Documents
              </Typography>

              <Typography>
                contract.pdf
              </Typography>
            </>
          )}

          {tab === 3 && (
            <>
              <Typography variant="h6">
                Risk Information
              </Typography>

              <Typography>
                Risk Level: {vendor?.risk}
              </Typography>
            </>
          )}

          {tab === 4 && (
            <>
              <Typography variant="h6">
                History
              </Typography>

              <Typography>
                Vendor Created: Jan 2025
              </Typography>
            </>
          )}

        </Box>

      </Paper>

    </MainLayout>

  );

}