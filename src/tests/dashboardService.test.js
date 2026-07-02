import {
  describe,
  test,
  expect,
} from "@jest/globals";

import {
  getDashboardData,
} from "../services/dashboardService";

describe(
  "Dashboard Service",
  () => {

    test(
      "returns dashboard data",
      async () => {

        const randomSpy =
          jest.spyOn(Math, "random").mockReturnValue(0.5);

        try {
          const data =
            await getDashboardData();

          expect(data)
            .toBeDefined();
        } finally {
          randomSpy.mockRestore();
        }

      }
    );

  }
);