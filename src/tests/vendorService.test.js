import {
  describe,
  test,
  expect,
  jest,
} from "@jest/globals";

import {
  getVendors,
} from "../services/vendorService";

describe(
  "Vendor Service",
  () => {

    test(
      "returns vendor data",
      async () => {

        const randomSpy = jest
          .spyOn(Math, "random")
          .mockReturnValue(0.9);

        const data =
          await getVendors();

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