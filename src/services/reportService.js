import reportData from "../mocks/reportData.json";

import simulateApi from "./apiSimulator.js";

export const getReportData = () =>
  simulateApi(reportData);