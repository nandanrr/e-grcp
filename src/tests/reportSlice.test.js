import reducer, {
  addReport,
  fetchReportData,
} from "../features/reports/reportSlice";

describe("Report Slice", () => {

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

  test("should add report", () => {

    const previousState = {
      data: [],
      loading: false,
      error: null,
    };

    const report = {
      id: 1,
      report: "Vendor Report",
      department: "IT",
    };

    const state = reducer(
      previousState,
      addReport(report)
    );

    expect(state.data).toHaveLength(1);

    expect(state.data[0]).toEqual(report);

  });

  test("should handle fetchReportData.pending", () => {

    const state = reducer(
      undefined,
      fetchReportData.pending("", undefined)
    );

    expect(state.loading).toBe(true);

    expect(state.error).toBeNull();

  });

  test("should handle fetchReportData.fulfilled", () => {

    const payload = [
      {
        id: 1,
        report: "Vendor Report",
        department: "IT",
      },
    ];

    const state = reducer(
      undefined,
      fetchReportData.fulfilled(
        payload,
        "",
        undefined
      )
    );

    expect(state.loading).toBe(false);

    expect(state.data).toEqual(payload);

  });

  test("should handle fetchReportData.rejected", () => {

    const action = {
      type: fetchReportData.rejected.type,
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