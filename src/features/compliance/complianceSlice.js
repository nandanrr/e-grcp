import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getComplianceData,
} from "../../services/complianceService.js";

export const fetchComplianceData =
  createAsyncThunk(
    "compliance/fetchComplianceData",
    async () => {

      const data =
        await getComplianceData();

      return data;

    }
  );

const initialState = {

  data: [],

  loading: false,

  error: null,

};

const complianceSlice = createSlice({

  name: "compliance",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(
        fetchComplianceData.pending,
        (state) => {

          state.loading = true;
          state.error = null;

        }
      )

      .addCase(
        fetchComplianceData.fulfilled,
        (state, action) => {

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
        fetchComplianceData.rejected,
        (state, action) => {

          state.loading = false;
          state.error =
            action.error.message;

        }
      );

  },

});

export default complianceSlice.reducer;