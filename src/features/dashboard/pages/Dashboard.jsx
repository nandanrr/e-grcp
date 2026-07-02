import { useEffect, useMemo } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchProcurementData,
} from "../../procurement/procurementSlice";

import MainLayout from "../../../components/layouts/MainLayout";
import KPICard from "../../../components/cards/KPICard";

import ProcurementChart from "../../../components/charts/ProcurementChart";
import RiskTrendChart from "../../../components/charts/RiskTrendChart";
import ComplianceTrendChart from "../../../components/charts/ComplianceTrendChart";
import DepartmentSpendingChart from "../../../components/charts/DepartmentSpendingChart";
import ErrorState from "../../../components/common/ErrorState";
import ActivityTimeline from "../../../components/common/ActivityTimeline";
import Loader from "../../../components/common/Loader";

import {
  Paper,
  Typography,
  Box,
  Grid,
} from "@mui/material";

import {
  getUserDashboardConfig,
  getVisibleChartsForRole,
  shouldShowActivitiesForRole,
} from "../../../utils/rbacUtils";

import {
  getRoleDashboardData,
  getRoleActivities,
} from "../../../mocks/roleDashboardData";

import "./dashboard.css";

export default function Dashboard() {

  const dispatch = useDispatch();

  const {
    loading,
    error,
    data: requests,
  } = useSelector(
    (state) => state.procurement
  );

  const currentUser = useSelector(
    (state) => state.auth.user
  );

  const userRole = currentUser?.role;

  const dashboardConfig = useMemo(
    () => getUserDashboardConfig(userRole),
    [userRole]
  );

  const roleData = useMemo(
    () => getRoleDashboardData(userRole),
    [userRole]
  );

  const roleActivities = useMemo(
    () => getRoleActivities(userRole, currentUser?.email),
    [userRole, currentUser?.email]
  );

  const derivedKpiValues = useMemo(() => {
    const pendingRequests = requests.filter((item) => item.status === "Pending").length;
    const approvedRequests = requests.filter((item) => item.status === "Approved").length;
    const rejectedRequests = requests.filter((item) => item.status === "Rejected").length;
    const myRequests = requests.filter(
      (item) =>
        item.submittedByEmail === currentUser?.email ||
        item.submittedBy === currentUser?.name
    ).length;

    return {
      totalRequests: requests.length,
      pendingRequests,
      approvedRequests,
      rejectedRequests,
      myRequests,
      escalatedRequests: requests.filter((item) => item.status === "Escalated").length,
    };
  }, [requests, currentUser?.email, currentUser?.name]);

  const dynamicActivities = useMemo(() => {
    return requests
      .slice()
      .sort((a, b) => (b.lastUpdatedAt || b.submittedDate || "").localeCompare(a.lastUpdatedAt || a.submittedDate || ""))
      .map((item) => ({
        id: item.id,
        action: `${item.request} ${item.status?.toLowerCase() || "updated"}`,
        details: `${item.department} • ${item.priority || "Medium"}`,
        module: "Procurement",
        user: item.submittedBy,
        status: item.status === "Approved" ? "Completed" : item.status === "Rejected" ? "Failed" : "Pending",
        timestamp: item.lastUpdatedAt || item.submittedDate || new Date().toISOString(),
      }));
  }, [requests]);

  const visibleCharts = useMemo(
    () => getVisibleChartsForRole(userRole),
    [userRole]
  );

  const shouldShowActivities = useMemo(
    () => shouldShowActivitiesForRole(userRole),
    [userRole]
  );

  // Build visible KPIs based on role and configuration
  const visibleKPIs = useMemo(() => {
    const kpis = dashboardConfig.kpis || [];

    return kpis.filter((kpi) => {
      const hiddenKPIs = dashboardConfig.hiddenKPIs || [];
      return !hiddenKPIs.includes(kpi.id);
    });
  }, [dashboardConfig]);

  useEffect(() => {

    dispatch(fetchProcurementData());

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

  // Render chart components based on configuration
  const renderChart = (chartConfig) => {
    const chartKey = chartConfig.id;

    switch (chartKey) {
      case "procurementTrend":
        return <ProcurementChart />;

      case "riskTrend":
        return <RiskTrendChart />;

      case "complianceTrend":
        return <ComplianceTrendChart />;

      case "departmentSpending":
        return <DepartmentSpendingChart />;

      default:
        return null;
    }
  };

  return (

    <MainLayout>

      {/* Dashboard Title */}
      <Typography
        variant="h4"
        className="dashboard-title"
        sx={{ mb: 3 }}
      >
        {dashboardConfig.title || "Dashboard"}
      </Typography>

      {/* KPI Cards */}
      <Grid
        container
        spacing={2}
        sx={{ mb: 3 }}
      >
        {visibleKPIs.map((kpi) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={kpi.id}
          >
            <KPICard
              title={kpi.label}
              value={derivedKpiValues[kpi.id] ?? roleData[kpi.id] ?? 0}
              color={kpi.color}
            />
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      {visibleCharts && visibleCharts.length > 0 && (
        <Box sx={{ mb: 3 }}>
          {visibleCharts.map((chart) => (
            <Paper
              key={chart.id}
              className="dashboard-chart"
              sx={{ mb: 2 }}
            >
              <Typography
                variant="h5"
                gutterBottom
                color="text.primary"
                fontWeight={600}
              >
                {chart.label}
              </Typography>

              {renderChart(chart)}

            </Paper>
          ))}
        </Box>
      )}

      {/* Activities Section */}
      {shouldShowActivities && (
        <Paper className="dashboard-chart">

          <Typography
            variant="h5"
            gutterBottom
            color="text.primary"
            fontWeight={600}
          >
            Recent Activities
          </Typography>

          <ActivityTimeline
            activities={dynamicActivities.length > 0 ? dynamicActivities : roleActivities}
          />

        </Paper>
      )}

    </MainLayout>
  );
}