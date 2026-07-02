import dashboardData from "../mocks/dashboardData";

import simulateApi from "./apiSimulator.js";

export const getDashboardData = () =>
  simulateApi(dashboardData);