import simulateApi from "./apiSimulator.js";

export const login = (credentials) =>
  simulateApi({

    success: true,

    user: {

      username: credentials.username,

      role: "Admin",

    },

    token: "mock-jwt-token",

  });