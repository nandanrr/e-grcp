import vendors from "../mocks/vendors.json";

import simulateApi from "./apiSimulator.js";

export const getVendors = () =>
  simulateApi(vendors);