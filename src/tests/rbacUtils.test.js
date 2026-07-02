import {
  isRole,
  isAnyRole,
  isAdmin,
  isProcurementManager,
  isEmployee,
  isComplianceOfficer,
  isAuditor,
  canViewModule,
  canCreateInModule,
  canEditInModule,
  canDeleteInModule,
  canApproveInModule,
  canRejectInModule,
  canExportFromModule,
  getUserSidebarItems,
  getUserDashboardConfig,
  getUserNotificationConfig,
  canAccessRoute,
  getAccessibleRoutes,
  filterActivitiesByRole,
  filterNotificationsByRole,
  getRoleDisplayName,
  getRoleColor,
  canEditOwnItem,
  getRoleSpecificKPIs,
  getVisibleKPIsForRole,
  getVisibleChartsForRole,
  shouldShowActivitiesForRole,
  shouldShowRecentActivitiesForRole,
  getModuleVisibilityForRole,
  validatePermission,
  createRoleDashboardContext,
} from "../utils/rbacUtils";

describe("rbacUtils", () => {
  test("matches and normalizes role helpers", () => {
    expect(isRole("Admin", "administrator")).toBe(true);
    expect(isAnyRole("manager", ["Employee", "Procurement Manager"])).toBe(true);
    expect(isAdmin("Administrator")).toBe(true);
    expect(isProcurementManager("procurement manager")).toBe(true);
    expect(isEmployee("employee")).toBe(true);
    expect(isComplianceOfficer("Compliance Officer")).toBe(true);
    expect(isAuditor("auditor")).toBe(true);
    expect(isRole(undefined, "Employee")).toBe(false);
  });

  test("checks module permissions and route access", () => {
    expect(canViewModule("Employee", "procurement")).toBe(true);
    expect(canCreateInModule("Employee", "procurement")).toBe(true);
    expect(canEditInModule("Employee", "procurement")).toBe(true);
    expect(canDeleteInModule("Employee", "procurement")).toBe(false);
    expect(canApproveInModule("Employee", "procurement")).toBe(false);
    expect(canRejectInModule("Employee", "procurement")).toBe(false);
    expect(canExportFromModule("Employee", "procurement")).toBe(false);
    expect(canAccessRoute("Admin", "/users")).toBe(true);
    expect(canAccessRoute("Employee", "/users")).toBe(false);
    expect(getAccessibleRoutes("Admin")).toContain("/dashboard");
    expect(getUserSidebarItems("Admin")).toEqual(
      expect.arrayContaining([expect.objectContaining({ path: "/dashboard" })])
    );
  });

  test("filters activities and notifications by role", () => {
    const activities = [
      { type: "REQUEST_SUBMITTED", userId: 1, submittedBy: "a@x.com" },
      { type: "USER_CREATED", userId: 2, submittedBy: "b@x.com" },
      { type: "MANAGER_COMMENT", userId: 3, submittedBy: "c@x.com" },
    ];

    const filteredActivities = filterActivitiesByRole(activities, "Employee", {
      id: 1,
      email: "a@x.com",
    });

    expect(filteredActivities).toHaveLength(1);
    expect(filteredActivities[0].type).toBe("REQUEST_SUBMITTED");

    const notifications = [{ type: "REQUEST_SUBMITTED" }, { type: "UNSUPPORTED" }];
    expect(filterNotificationsByRole(notifications, "Employee")).toHaveLength(1);
  });

  test("returns role display names and colors", () => {
    expect(getRoleDisplayName("admin")).toBe("Administrator");
    expect(getRoleDisplayName("unknown")).toBe("unknown");
    expect(getRoleColor("procurement manager")).toBe("warning");
    expect(getRoleColor("unknown")).toBe("default");
  });

  test("checks edit permission for employee-owned items", () => {
    expect(
      canEditOwnItem("Employee", { submittedBy: "a@x.com", status: "Pending" }, { email: "a@x.com" })
    ).toBe(true);
    expect(
      canEditOwnItem("Employee", { submittedBy: "b@x.com", status: "Approved" }, { email: "a@x.com" })
    ).toBe(false);
    expect(canEditOwnItem("Admin", { submittedBy: "a@x.com", status: "Pending" }, { email: "a@x.com" })).toBe(true);
  });

  test("builds role-specific dashboard config and visibility helpers", () => {
    expect(getUserDashboardConfig("Employee").title).toBe("My Requests");
    expect(getUserNotificationConfig("Admin")).toEqual(expect.arrayContaining([expect.objectContaining({ type: "AUDIT_COMPLETED" })]));
    expect(getRoleSpecificKPIs({ totalRequests: 2 }, "Employee")).toEqual(expect.arrayContaining([expect.objectContaining({ id: "myRequests" })]));
    expect(getVisibleKPIsForRole("Employee", { myRequests: 1, totalVendors: 2 })).toEqual({ myRequests: 1 });
    expect(getVisibleChartsForRole("Employee")).toEqual([]);
    expect(shouldShowActivitiesForRole("Employee")).toBe(true);
    expect(shouldShowRecentActivitiesForRole("Employee")).toBe(true);
    expect(getModuleVisibilityForRole("Employee")).toEqual(
      expect.objectContaining({ procurement: true, settings: true })
    );
  });

  test("validates permissions and creates dashboard context", () => {
    expect(() => validatePermission("Employee", "procurement", "canApprove")).toThrow();
    expect(validatePermission("Admin", "procurement", "canApprove")).toBe(true);
    expect(createRoleDashboardContext("Employee", { id: 1, email: "a@x.com" })).toEqual(
      expect.objectContaining({ role: "Employee", isEmployee: true, canApprove: false })
    );
  });
});
