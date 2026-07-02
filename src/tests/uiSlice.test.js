import {
  describe,
  test,
  expect,
} from "@jest/globals";

import reducer, {
  toggleDarkMode,
  setDarkMode,
  toggleCompactLayout,
  setCompactLayout,
} from "../features/settings/uiSlice";

describe("uiSlice", () => {

  const initialState = {
    darkMode: false,
    compactLayout: false,
  };

  test("should return the initial state", () => {

    expect(
      reducer(undefined, { type: "" })
    ).toEqual(initialState);

  });

  test("should toggle dark mode", () => {

    const state = reducer(
      initialState,
      toggleDarkMode()
    );

    expect(state.darkMode)
      .toBe(true);

  });

  test("should set dark mode", () => {

    const state = reducer(
      initialState,
      setDarkMode(true)
    );

    expect(state.darkMode)
      .toBe(true);

  });

  test("should toggle compact layout", () => {

    const state = reducer(
      initialState,
      toggleCompactLayout()
    );

    expect(state.compactLayout)
      .toBe(true);

  });

  test("should set compact layout", () => {

    const state = reducer(
      initialState,
      setCompactLayout(true)
    );

    expect(state.compactLayout)
      .toBe(true);

  });

});