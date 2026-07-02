import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getVendors,
} from "../../services/vendorService.js";

export const fetchVendors =
  createAsyncThunk(
    "vendor/fetchVendors",
    async () => {

      const data =
        await getVendors();

      return data;

    }
  );

const initialState = {

  data: [],

  loading: false,

  error: null,

};

const vendorSlice = createSlice({

  name: "vendor",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(
        fetchVendors.pending,
        (state) => {

          state.loading = true;
          state.error = null;

        }
      )

      .addCase(
  fetchVendors.fulfilled,
  (state, action) => {

    state.loading = false;

    if (state.data.length === 0) {

      state.data = action.payload;

    }

  }
)

      .addCase(
        fetchVendors.rejected,
        (state, action) => {

          state.loading = false;
          state.error = action.error.message;

        }
      );

  },

});

export default vendorSlice.reducer;