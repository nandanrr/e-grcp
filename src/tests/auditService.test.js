import {
  describe,
  test,
  expect,
  jest,
} from "@jest/globals";

import {
  getAuditData,
} from "../services/auditService";

describe(
  "Audit Service",
  () => {

    test(
      "returns audit data",
      async () => {

        const randomSpy = jest
          .spyOn(Math, "random")
          .mockReturnValue(0.9);

        const data =
          await getAuditData();

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