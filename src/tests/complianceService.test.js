import {
  describe,
  test,
  expect,
  jest,
} from "@jest/globals";

import {
  getComplianceData,
} from "../services/complianceService";

describe(
  "Compliance Service",
  () => {

    test(
      "returns compliance data",
      async () => {

        const randomSpy = jest
          .spyOn(Math, "random")
          .mockReturnValue(0.9);

        const data =
          await getComplianceData();

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