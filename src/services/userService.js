import users from "../mocks/users.json";

import simulateApi from "./apiSimulator.js";

export const getUsers = () =>
  simulateApi(users);