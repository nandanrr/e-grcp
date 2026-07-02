import {
  describe,
  test,
  expect,
  jest,
} from "@jest/globals";

import {
  getUsers,
} from "../services/userService";

describe(
  "User Service",
  () => {

    test(
      "returns user data",
      async () => {

        const randomSpy = jest
          .spyOn(Math, "random")
          .mockReturnValue(0.9);

        const data =
          await getUsers();

        expect(
          Array.isArray(data)
        ).toBe(true);

        expect(
          data.length
        ).toBeGreaterThan(0);

        randomSpy.mockRestore();

      }
    );

  }
);