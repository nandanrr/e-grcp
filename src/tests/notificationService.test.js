import {
  describe,
  test,
  expect,
  jest,
} from "@jest/globals";

import {
  getNotificationData,
} from "../services/notificationService";

describe(
  "Notification Service",
  () => {

    test(
      "returns notification data",
      async () => {

        const randomSpy = jest
          .spyOn(Math, "random")
          .mockReturnValue(0.9);

        const data =
          await getNotificationData();

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