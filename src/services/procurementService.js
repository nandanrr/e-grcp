import requests from "../mocks/requests.json";

import simulateApi from "./apiSimulator.js";

export const getRequests = () =>
  simulateApi(requests);