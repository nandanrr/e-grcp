import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getNotificationData,
} from "../../services/notificationService.js";

export const fetchNotificationData =
  createAsyncThunk(
    "notification/fetchNotificationData",
    async () => {

      const data =
        await getNotificationData();

      return data;

    }
  );

const initialState = {

  data: [],

  loading: false,

  error: null,

};

const notificationSlice =
  createSlice({

    name: "notification",

    initialState,

    reducers: {

      addNotification: (
        state,
        action
      ) => {

        state.data.unshift(
          action.payload
        );

      },

      markAsRead: (
        state,
        action
      ) => {

        const notification =
          state.data.find(
            (item) =>
              item.id ===
              action.payload
          );

        if (notification) {

          notification.status =
            "Read";

        }

      },

    },

    extraReducers: (
      builder
    ) => {

      builder

        .addCase(
          fetchNotificationData.pending,
          (state) => {

            state.loading = true;

            state.error = null;

          }
        )

        .addCase(
  fetchNotificationData.fulfilled,
  (state, action) => {

    state.loading = false;

    if (state.data.length === 0) {

      state.data = action.payload;

    }

  }
)

        .addCase(
          fetchNotificationData.rejected,
          (
            state,
            action
          ) => {

            state.loading = false;

            state.error =
              action.error.message;

          }
        );

    },

  });

export const {

  addNotification,

  markAsRead,

} =
  notificationSlice.actions;

export default
notificationSlice.reducer;