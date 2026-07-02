import riskData from "../mocks/riskData.json";

import simulateApi from "./apiSimulator.js";

export const getRiskData = () =>
  simulateApi(riskData);