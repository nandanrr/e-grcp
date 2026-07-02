import reducer, {
  addAuditLog,
  fetchAuditData,
} from "../features/audit/auditSlice";

describe("Audit Slice", () => {

  test("should return initial state", () => {

    expect(
      reducer(undefined, {
        type: undefined,
      })
    ).toEqual({
      data: [],
      loading: false,
      error: null,
    });

  });

  test("should add audit log", () => {

    const previousState = {
      data: [],
      loading: false,
      error: null,
    };

    const audit = {
      id: 1,
      activity: "Request Created",
      user: "Admin",
    };

    const state = reducer(
      previousState,
      addAuditLog(audit)
    );

    expect(state.data).toHaveLength(1);

    expect(state.data[0]).toEqual(audit);

  });

  test("should handle fetchAuditData.pending", () => {

    const state = reducer(
      undefined,
      fetchAuditData.pending("", undefined)
    );

    expect(state.loading).toBe(true);

    expect(state.error).toBeNull();

  });

  test("should handle fetchAuditData.fulfilled", () => {

    const payload = [
      {
        id: 1,
        activity: "Audit Completed",
      },
    ];

    const state = reducer(
      undefined,
      fetchAuditData.fulfilled(
        payload,
        "",
        undefined
      )
    );

    expect(state.loading).toBe(false);

    expect(state.data).toEqual(payload);

  });

  test("should handle fetchAuditData.rejected", () => {

    const action = {
      type: fetchAuditData.rejected.type,
      error: {
        message: "Server Error",
      },
    };

    const state = reducer(
      undefined,
      action
    );

    expect(state.loading).toBe(false);

    expect(state.error).toBe("Server Error");

  });

});