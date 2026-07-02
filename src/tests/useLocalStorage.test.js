import { renderHook, act } from "@testing-library/react";
import useLocalStorage from "../hooks/useLocalStorage";

describe("useLocalStorage", () => {

  beforeEach(() => {
    localStorage.clear();
  });

  test("returns initial value", () => {

    const { result } = renderHook(() =>
      useLocalStorage("username", "Nandan")
    );

    expect(result.current[0]).toBe("Nandan");

  });

  test("updates localStorage value", () => {

    const { result } = renderHook(() =>
      useLocalStorage("username", "Nandan")
    );

    act(() => {

      result.current[1]("React");

    });

    expect(result.current[0]).toBe("React");

    expect(
      JSON.parse(
        localStorage.getItem("username")
      )
    ).toBe("React");

  });

});