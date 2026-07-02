import notificationData from "../mocks/notificationData.json";

import simulateApi from "./apiSimulator.js";

export const getNotificationData = () =>
  simulateApi(notificationData);