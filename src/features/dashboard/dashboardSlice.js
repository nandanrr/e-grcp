import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getDashboardData,
} from "../../services/dashboardService.js";

export const fetchDashboardData =
  createAsyncThunk(
    "dashboard/fetchDashboardData",
    async () => {

      const data =
        await getDashboardData();

      return data;

    }
  );

const initialState = {

  data: {},

  loading: false,

  error: null,

};

const dashboardSlice = createSlice({

  name: "dashboard",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(
        fetchDashboardData.pending,
        (state) => {

          state.loading = true;

          state.error = null;

        }
      )

      .addCase(
        fetchDashboardData.fulfilled,
        (state, action) => {

          state.loading = false;

          state.data = action.payload;

        }
      )

      .addCase(
        fetchDashboardData.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.error.message;

        }
      );

  },

});

export default dashboardSlice.reducer;