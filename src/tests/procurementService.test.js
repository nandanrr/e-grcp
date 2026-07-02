import {
  describe,
  test,
  expect,
  jest,
} from "@jest/globals";

import {
  getRequests,
} from "../services/procurementService";

describe(
  "Procurement Service",
  () => {

    test(
      "returns procurement requests",
      async () => {

        const randomSpy = jest
          .spyOn(Math, "random")
          .mockReturnValue(0.9);

        const data =
          await getRequests();

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