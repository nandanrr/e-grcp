import {
  describe,
  test,
  expect,
} from "@jest/globals";

import reducer, {
  addNotification,
  markAsRead,
  fetchNotificationData,
} from "../features/notification/notificationSlice";

describe("notificationSlice", () => {

  const initialState = {
    data: [],
    loading: false,
    error: null,
  };

  test("should return the initial state", () => {

    expect(
      reducer(undefined, { type: "" })
    ).toEqual(initialState);

  });

  test("should add a notification", () => {

    const notification = {
      id: 1,
      message: "New Request",
      status: "Unread",
    };

    const state = reducer(
      initialState,
      addNotification(notification)
    );

    expect(state.data).toHaveLength(1);

    expect(state.data[0].message)
      .toBe("New Request");

  });

  test("should mark notification as read", () => {

    const state = {
      data: [
        {
          id: 1,
          message: "New Request",
          status: "Unread",
        },
      ],
      loading: false,
      error: null,
    };

    const updatedState = reducer(
      state,
      markAsRead(1)
    );

    expect(
      updatedState.data[0].status
    ).toBe("Read");

  });

  test("should handle fetchNotificationData pending", () => {

    const state = reducer(
      initialState,
      {
        type: fetchNotificationData.pending.type,
      }
    );

    expect(state.loading)
      .toBe(true);

    expect(state.error)
      .toBeNull();

  });

  test("should handle fetchNotificationData fulfilled", () => {

    const notifications = [
      {
        id: 1,
        message: "Notification",
        status: "Unread",
      },
    ];

    const state = reducer(
      initialState,
      {
        type: fetchNotificationData.fulfilled.type,
        payload: notifications,
      }
    );

    expect(state.loading)
      .toBe(false);

    expect(state.data)
      .toEqual(notifications);

  });

  test("should handle fetchNotificationData rejected", () => {

    const state = reducer(
      initialState,
      {
        type: fetchNotificationData.rejected.type,
        error: {
          message: "API Error",
        },
      }
    );

    expect(state.loading)
      .toBe(false);

    expect(state.error)
      .toBe("API Error");

  });

});