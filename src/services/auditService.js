import auditData from "../mocks/auditData.json";

import simulateApi from "./apiSimulator.js";

export const getAuditData = () =>
  simulateApi(auditData);