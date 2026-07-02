import {
  describe,
  test,
  expect,
} from "@jest/globals";

import reducer, {
  addRequest,
  approveRequest,
  rejectRequest,
  fetchProcurementData,
} from "../features/procurement/procurementSlice";

describe("procurementSlice", () => {

  const initialState = {

    data: [],

    loading: false,

    error: null,

  };

  test(
    "should return initial state",
    () => {

      expect(
        reducer(undefined, {
          type: undefined,
        })
      ).toEqual(initialState);

    }
  );

  test(
    "should add a procurement request",
    () => {

      const request = {

        id: 1,

        request: "Laptop Purchase",

        department: "IT",

        status: "Pending",

      };

      const state = reducer(
        initialState,
        addRequest(request)
      );

      expect(state.data).toHaveLength(1);

      expect(
        state.data[0].request
      ).toBe("Laptop Purchase");

    }
  );

  test(
    "should approve a procurement request",
    () => {

      const state = {

        data: [

          {

            id: 1,

            request: "Laptop Purchase",

            status: "Pending",

          },

        ],

        loading: false,

        error: null,

      };

      const updatedState = reducer(
        state,
        approveRequest(1)
      );

      expect(
        updatedState.data[0].status
      ).toBe("Approved");

    }
  );

  test(
    "should reject a procurement request",
    () => {

      const state = {

        data: [

          {

            id: 1,

            request: "Laptop Purchase",

            status: "Pending",
          },

        ],

        loading: false,

        error: null,

      };

      const updatedState = reducer(
        state,
        rejectRequest(1)
      );

      expect(
        updatedState.data[0].status
      ).toBe("Rejected");

    }
  );

  test(
    "should enrich approval state with workflow details",
    () => {

      const state = {

        data: [

          {

            id: 1,

            request: "Laptop Purchase",

            status: "Pending",
            approvalHistory: [
              {
                stage: "Manager Approval",
                status: "Pending",
                date: null,
              },
            ],
          },

        ],

        loading: false,

        error: null,

      };

      const updatedState = reducer(
        state,
        approveRequest({
          id: 1,
          actor: "Procurement Manager",
          timestamp: "2025-01-01",
          note: "Budget approved",
        })
      );

      expect(
        updatedState.data[0].status
      ).toBe("Approved");

      expect(
        updatedState.data[0].approvalHistory[0].status
      ).toBe("Completed");

      expect(
        updatedState.data[0].lastUpdatedBy
      ).toBe("Procurement Manager");

    }
  );

  test(
    "should handle fetchProcurementData.pending",
    () => {

      const action = {

        type: fetchProcurementData.pending.type,

      };

      const state = reducer(
        initialState,
        action
      );

      expect(
        state.loading
      ).toBe(true);

      expect(
        state.error
      ).toBeNull();

    }
  );

  test(
    "should handle fetchProcurementData.fulfilled",
    () => {

      const payload = [

        {

          id: 1,

          request: "Laptop Purchase",

          status: "Pending",

        },

      ];

      const action = {

        type: fetchProcurementData.fulfilled.type,

        payload,

      };

      const state = reducer(
        initialState,
        action
      );

      expect(
        state.loading
      ).toBe(false);

      expect(
        state.data
      ).toEqual(payload);

    }
  );

  test(
    "should merge fetched data with existing requests",
    () => {

      const existingState = {

        data: [

          {

            id: 10,

            request: "Existing Request",

            status: "Pending",

          },

        ],

        loading: true,

        error: null,

      };

      const action = {

        type: fetchProcurementData.fulfilled.type,

        payload: [

          {

            id: 20,

            request: "New Request",

            status: "Pending",

          },

        ],

      };

      const state = reducer(
        existingState,
        action
      );

      expect(
        state.loading
      ).toBe(false);

      expect(
        state.data
      ).toHaveLength(2);

      expect(
        state.data.some((item) => item.id === 10)
      ).toBe(true);

      expect(
        state.data.some((item) => item.id === 20)
      ).toBe(true);

    }
  );

  test(
    "should handle fetchProcurementData.rejected",
    () => {

      const action = {

        type: fetchProcurementData.rejected.type,

        error: {

          message: "Server Error",

        },

      };

      const state = reducer(
        initialState,
        action
      );

      expect(
        state.loading
      ).toBe(false);

      expect(
        state.error
      ).toBe("Server Error");

    }
  );

});