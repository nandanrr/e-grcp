import {
  describe,
  test,
  expect,
  jest,
} from "@jest/globals";

import {
  getReportData,
} from "../services/reportService";

describe(
  "Report Service",
  () => {

    test(
      "returns report data",
      async () => {

        const randomSpy = jest
          .spyOn(Math, "random")
          .mockReturnValue(0.9);

        const data =
          await getReportData();

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