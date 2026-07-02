import {
  describe,
  test,
  expect,
} from "@jest/globals";

import {
  getRiskData,
} from "../services/riskService";

describe(
  "Risk Service",
  () => {

    test(
      "returns risk data",
      async () => {

        const data =
          await getRiskData();

        expect(
          Array.isArray(data)
        ).toBe(true);

        expect(
          data.length
        ).toBeGreaterThan(0);

      }
    );

  }
);