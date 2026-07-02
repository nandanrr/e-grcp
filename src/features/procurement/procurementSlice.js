import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getRequests,
} from "../../services/procurementService.js";

export const fetchProcurementData =
  createAsyncThunk(
    "procurement/fetchProcurementData",
    async () => {
      const data =
        await getRequests();

      return data;
    }
  );

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const mergeRequests = (existingData = [], incomingData = []) => {
  const mergedById = new Map();

  [...existingData, ...incomingData].forEach((item) => {
    if (item?.id != null) {
      mergedById.set(item.id, item);
    }
  });

  return Array.from(mergedById.values());
};

const applyDecision = (request, status, payload) => {
  if (!request) {
    return;
  }

  const timestamp =
    payload?.timestamp ||
    new Date().toISOString();

  const actor =
    payload?.actor ||
    "System";

  const note =
    payload?.note ||
    `${status} by ${actor}`;

  request.status = status;
  request.lastUpdatedAt = timestamp;
  request.lastUpdatedBy = actor;
  request.decisionNote = note;

  const history = Array.isArray(request.approvalHistory)
    ? request.approvalHistory
    : [];

  if (history.length > 0) {
    request.approvalHistory = history.map((entry, index) => {
      if (index === 0) {
        return {
          ...entry,
          status: "Completed",
          date: timestamp,
          actor,
          note,
        };
      }

      if (entry.stage === "Manager Approval") {
        return {
          ...entry,
          status: "Completed",
          date: timestamp,
          actor,
          note,
        };
      }

      return entry;
    });
  } else {
    request.approvalHistory = [
      {
        stage: "Manager Approval",
        status: "Completed",
        date: timestamp,
        actor,
        note,
      },
    ];
  }
};

const procurementSlice = createSlice({
  name: "procurement",

  initialState,

  reducers: {

    addRequest: (
      state,
      action
    ) => {

      const existingIndex = state.data.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.data[existingIndex] = action.payload;
      } else {
        state.data.push(action.payload);
      }

    },

    approveRequest: (
      state,
      action
    ) => {

      const payload =
        typeof action.payload === "object"
          ? action.payload
          : { id: action.payload };

      const request =
        state.data.find(
          (item) => item.id === payload.id
        );

      if (request) {
        applyDecision(request, "Approved", payload);
      }

    },

    rejectRequest: (
      state,
      action
    ) => {

      const payload =
        typeof action.payload === "object"
          ? action.payload
          : { id: action.payload };

      const request =
        state.data.find(
          (item) => item.id === payload.id
        );

      if (request) {
        applyDecision(request, "Rejected", payload);
      }

    },

  },

  extraReducers: (
    builder
  ) => {

    builder

      .addCase(
        fetchProcurementData.pending,
        (state) => {

          state.loading = true;
          state.error = null;

        }
      )

      .addCase(
        fetchProcurementData.fulfilled,
        (state, action) => {

          state.loading = false;

          state.data = mergeRequests(
            state.data,
            action.payload
          );

        }
      )

      .addCase(
        fetchProcurementData.rejected,
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

  addRequest,

  approveRequest,

  rejectRequest,

} =
  procurementSlice.actions;

export default procurementSlice.reducer;