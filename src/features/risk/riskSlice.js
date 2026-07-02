import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getRiskData,
} from "../../services/riskService.js";

export const fetchRiskData =
  createAsyncThunk(
    "risk/fetchRiskData",
    async () => {

      const data =
        await getRiskData();

      return data;

    }
  );

const initialState = {

  data: [],

  loading: false,

  error: null,

};

const riskSlice = createSlice({

  name: "risk",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(
        fetchRiskData.pending,
        (state) => {

          state.loading = true;

          state.error = null;

        }
      )

      .addCase(
        fetchRiskData.fulfilled,
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
        fetchRiskData.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.error.message;

        }
      );

  },

});

export default riskSlice.reducer; 