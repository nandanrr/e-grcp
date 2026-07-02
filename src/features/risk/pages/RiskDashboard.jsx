import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchRiskData,
} from "../riskSlice";

import MainLayout from "../../../components/layouts/MainLayout";

import KPICard from "../../../components/cards/KPICard";

import RiskTrendChart from "../../../components/charts/RiskTrendChart";
import RiskPieChart from "../../../components/charts/RiskPieChart";
import RiskDepartmentChart from "../../../components/charts/RiskDepartmentChart";
import RiskHeatMap from "../../../components/charts/RiskHeatMap";
import "../../../styles/dashboardCommon.css";
import Paper from "@mui/material/Paper";

import Loader from "../../../components/common/Loader";
import ErrorState from "../../../components/common/ErrorState";
import "../../../styles/dashboardCommon.css";

export default function RiskDashboard() {

  const dispatch = useDispatch();

  const {
    data: riskData,
    loading,
    error,
  } = useSelector(
    (state) => state.risk
  );

  useEffect(() => {
    dispatch(fetchRiskData());
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

  return (
    <MainLayout>

      <h1 className="dashboard-title">
        Risk Center
      </h1>

      {/* KPI Cards */}

      <div className="dashboard-grid">

        <KPICard
          title="Total Risks"
          value={riskData.length}
        />

        <KPICard
          title="High Risks"
          value={
            riskData.filter(
              (risk) => risk.level === "High"
            ).length
          }
        />

        <KPICard
          title="Medium Risks"
          value={
            riskData.filter(
              (risk) => risk.level === "Medium"
            ).length
          }
        />

        <KPICard
          title="Low Risks"
          value={
            riskData.filter(
              (risk) => risk.level === "Low"
            ).length
          }
        />

      </div>

      {/* Risk Trend */}

      <Paper className="dashboard-chart">

        <h2>
          Risk Trend
        </h2>

        <RiskTrendChart />

      </Paper>

      {/* Risk Distribution */}

      <Paper className="dashboard-chart">

        <h2>
          Risk Distribution
        </h2>

        <RiskPieChart />

      </Paper>

      {/* Department Risk Distribution */}

      <Paper className="dashboard-chart">

        <h2>
          Department Risk Distribution
        </h2>

        <RiskDepartmentChart />

      </Paper>

      {/* Risk Matrix */}

      <Paper className="dashboard-chart">

        <h2>
          Risk Matrix
        </h2>

        <RiskHeatMap />

      </Paper>

    </MainLayout>
  );
}