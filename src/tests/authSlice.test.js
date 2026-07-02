import {
  describe,
  test,
  expect,
} from "@jest/globals";

import reducer, {
  loginSuccess,
  logout,
} from "../features/auth/authSlice";

describe("authSlice", () => {

  const initialState = {
    user: null,
    isAuthenticated: false,
  };

  test("should return the initial state", () => {

    expect(
      reducer(undefined, { type: "" })
    ).toEqual(initialState);

  });

  test("should login the user", () => {

    const user = {
      id: 1,
      name: "Admin",
      email: "admin@example.com",
      role: "Admin",
    };

    const state = reducer(
      initialState,
      loginSuccess(user)
    );

    expect(state.user).toEqual(user);

    expect(state.isAuthenticated)
      .toBe(true);

  });

  test("should logout the user", () => {

    const loggedInState = {
      user: {
        id: 1,
        name: "Admin",
        role: "Admin",
      },
      isAuthenticated: true,
    };

    const state = reducer(
      loggedInState,
      logout()
    );

    expect(state.user).toBeNull();

    expect(state.isAuthenticated)
      .toBe(false);

  });

});