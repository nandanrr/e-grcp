import complianceData from "../mocks/complianceData.json";

import simulateApi from "./apiSimulator.js";

export const getComplianceData = () =>
  simulateApi(complianceData);