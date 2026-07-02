import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getAuditData,
} from "../../services/auditService.js";

export const fetchAuditData =
  createAsyncThunk(
    "audit/fetchAuditData",
    async () => {

      const data =
        await getAuditData();

      return data;

    }
  );

const initialState = {

  data: [],

  loading: false,

  error: null,

};

const auditSlice =
  createSlice({

    name: "audit",

    initialState,

    reducers: {

      addAuditLog: (
        state,
        action
      ) => {

        state.data.unshift(
          action.payload
        );

      },

    },

    extraReducers: (
      builder
    ) => {

      builder

        .addCase(
          fetchAuditData.pending,
          (state) => {

            state.loading = true;

            state.error = null;

          }
        )

        .addCase(
          fetchAuditData.fulfilled,
          (
            state,
            action
          ) => {

            state.loading = false;

            if (
              state.data.length === 0
            ) {

              state.data =
                action.payload;

            }

          }
        )

        .addCase(
          fetchAuditData.rejected,
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

  addAuditLog,

} =
  auditSlice.actions;

export default
auditSlice.reducer;