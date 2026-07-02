import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getReportData,
} from "../../services/reportService.js";


export const fetchReportData =
  createAsyncThunk(
    "report/fetchReportData",
    async () => {

      const data =
        await getReportData();

      return data;

    }
  );

const initialState = {

  data: [],

  loading: false,

  error: null,

};

const reportSlice = createSlice({

  name: "report",

  initialState,

  reducers: {

  addReport: (
    state,
    action
  ) => {

    state.data.unshift(
      action.payload
    );

  },

},

  extraReducers: (builder) => {

    builder

      .addCase(
        fetchReportData.pending,
        (state) => {

          state.loading = true;

          state.error = null;

        }
      )

      .addCase(
  fetchReportData.fulfilled,
  (state, action) => {

    state.loading = false;

    if (state.data.length === 0) {

      state.data = action.payload;

    }

  }
)

      .addCase(
        fetchReportData.rejected,
        (state, action) => {

          state.loading = false;

          state.error = action.error.message;

        }
      );

  },

});

export const {

  addReport,

} =
  reportSlice.actions;

export default reportSlice.reducer;