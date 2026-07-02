/**
 * Role-Based Access Control Configuration
 * Defines permissions, UI elements, and features for each role
 */

export const ROLES = {
  ADMIN: "Administrator",
  PROCUREMENT_MANAGER: "Procurement Manager",
  EMPLOYEE: "Employee",
  COMPLIANCE_OFFICER: "Compliance Officer",
  AUDITOR: "Auditor",
};

export const normalizeRole = (role) => {
  if (!role) {
    return "";
  }

  const normalizedValue = role.toString().trim().toLowerCase();

  const roleAliases = {
    admin: ROLES.ADMIN,
    administrator: ROLES.ADMIN,
    manager: ROLES.PROCUREMENT_MANAGER,
    "procurement manager": ROLES.PROCUREMENT_MANAGER,
    employee: ROLES.EMPLOYEE,
    "compliance officer": ROLES.COMPLIANCE_OFFICER,
    auditor: ROLES.AUDITOR,
  };

  return roleAliases[normalizedValue] || role.toString().trim();
};

/**
 * Sidebar Configuration by Role
 * Defines which modules are visible in the sidebar for each role
 */
export const sidebarConfig = {
  [ROLES.ADMIN]: [
    { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: "Dashboard" },
    { id: "procurement", label: "Procurement", path: "/procurement", icon: "BusinessCenter" },
    { id: "vendors", label: "Vendors", path: "/vendors", icon: "Groups" },
    { id: "risk", label: "Risk", path: "/risk", icon: "WarningAmber" },
    { id: "compliance", label: "Compliance", path: "/compliance", icon: "VerifiedUser" },
    { id: "audit", label: "Audit", path: "/audit", icon: "FactCheck" },
    { id: "approval", label: "Approval", path: "/approval", icon: "TaskAlt" },
    { id: "notifications", label: "Notifications", path: "/notifications", icon: "NotificationsActive" },
    { id: "reports", label: "Reports", path: "/reports", icon: "Assessment" },
    { id: "users", label: "User Management", path: "/users", icon: "People" },
    { id: "settings", label: "Settings", path: "/settings", icon: "Settings" },
  ],

  [ROLES.PROCUREMENT_MANAGER]: [
    { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: "Dashboard" },
    { id: "procurement", label: "Procurement", path: "/procurement", icon: "BusinessCenter" },
    { id: "vendors", label: "Vendors", path: "/vendors", icon: "Groups" },
    { id: "risk", label: "Risk", path: "/risk", icon: "WarningAmber" },
    { id: "compliance", label: "Compliance", path: "/compliance", icon: "VerifiedUser" },
    { id: "approval", label: "Approval", path: "/approval", icon: "TaskAlt" },
    { id: "notifications", label: "Notifications", path: "/notifications", icon: "NotificationsActive" },
    { id: "reports", label: "Reports", path: "/reports", icon: "Assessment" },
  ],

  [ROLES.EMPLOYEE]: [
    { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: "Dashboard" },
    { id: "procurement", label: "Procurement", path: "/procurement", icon: "BusinessCenter" },
    { id: "notifications", label: "Notifications", path: "/notifications", icon: "NotificationsActive" },
  ],

  [ROLES.COMPLIANCE_OFFICER]: [
    { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: "Dashboard" },
    { id: "compliance", label: "Compliance", path: "/compliance", icon: "VerifiedUser" },
    { id: "notifications", label: "Notifications", path: "/notifications", icon: "NotificationsActive" },
  ],

  [ROLES.AUDITOR]: [
    { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: "Dashboard" },
    { id: "audit", label: "Audit", path: "/audit", icon: "FactCheck" },
    { id: "reports", label: "Reports", path: "/reports", icon: "Assessment" },
  ],
};

/**
 * Dashboard Configuration by Role
 * Defines dashboard title, KPIs, and charts for each role
 */
export const dashboardConfig = {
  [ROLES.ADMIN]: {
    title: "Executive Dashboard",
    kpis: [
      { id: "totalRequests", label: "Total Requests", color: "primary" },
      { id: "pendingRequests", label: "Pending Requests", color: "warning" },
      { id: "approvedRequests", label: "Approved Requests", color: "success" },
      { id: "rejectedRequests", label: "Rejected Requests", color: "error" },
      { id: "totalVendors", label: "Total Vendors", color: "info" },
      { id: "risks", label: "Risks", color: "error" },
      { id: "complianceIssues", label: "Compliance Issues", color: "warning" },
    ],
    charts: [
      { id: "procurementTrend", label: "Monthly Procurement Trend", type: "line" },
      { id: "departmentSpending", label: "Department Spending", type: "bar" },
      { id: "riskTrend", label: "Risk Trend", type: "area" },
      { id: "complianceTrend", label: "Compliance Trend", type: "area" },
    ],
    showActivities: true,
    showRecentActivities: true,
  },

  [ROLES.PROCUREMENT_MANAGER]: {
    title: "Procurement Dashboard",
    kpis: [
      { id: "totalRequests", label: "Total Requests", color: "primary" },
      { id: "pendingRequests", label: "Pending Approvals", color: "warning" },
      { id: "approvedRequests", label: "Approved Requests", color: "success" },
      { id: "rejectedRequests", label: "Rejected Requests", color: "error" },
      { id: "totalVendors", label: "Vendors", color: "info" },
      { id: "risks", label: "Risks", color: "error" },
    ],
    charts: [
      { id: "procurementTrend", label: "Procurement Trend", type: "line" },
      { id: "departmentSpending", label: "Department Spending", type: "bar" },
    ],
    showActivities: true,
    showRecentActivities: true,
  },

  [ROLES.EMPLOYEE]: {
    title: "My Requests",
    kpis: [
      { id: "myRequests", label: "My Requests", color: "primary" },
      { id: "pendingRequests", label: "Pending", color: "warning" },
      { id: "approvedRequests", label: "Approved", color: "success" },
      { id: "rejectedRequests", label: "Rejected", color: "error" },
    ],
    charts: [],
    showActivities: true,
    showRecentActivities: true,
    hiddenKPIs: ["totalVendors", "risks", "complianceIssues", "departmentSpending"],
  },

  [ROLES.COMPLIANCE_OFFICER]: {
    title: "Compliance Dashboard",
    kpis: [
      { id: "complianceIssues", label: "Compliance Issues", color: "error" },
      { id: "pendingReviews", label: "Pending Reviews", color: "warning" },
      { id: "verifiedDocuments", label: "Verified Documents", color: "success" },
      { id: "violations", label: "Violations", color: "error" },
    ],
    charts: [
      { id: "complianceTrend", label: "Compliance Trend", type: "area" },
      { id: "departmentCompliance", label: "Department Compliance", type: "bar" },
    ],
    showActivities: true,
    showRecentActivities: true,
  },

  [ROLES.AUDITOR]: {
    title: "Audit Dashboard",
    kpis: [
      { id: "auditLogs", label: "Audit Logs", color: "primary" },
      { id: "todayActivities", label: "Today's Activities", color: "info" },
      { id: "generatedReports", label: "Generated Reports", color: "success" },
      { id: "criticalActivities", label: "Critical Activities", color: "error" },
    ],
    charts: [],
    showActivities: true,
    showRecentActivities: true,
  },
};

/**
 * Notification Types Configuration by Role
 * Defines which notification types each role receives
 */
export const notificationConfig = {
  [ROLES.ADMIN]: [
    { type: "USER_CREATED", label: "User Created", priority: "Medium" },
    { type: "VENDOR_ADDED", label: "Vendor Added", priority: "Medium" },
    { type: "RISK_UPDATED", label: "Risk Updated", priority: "High" },
    { type: "AUDIT_COMPLETED", label: "Audit Completed", priority: "Medium" },
    { type: "COMPLIANCE_UPDATED", label: "Compliance Updated", priority: "High" },
  ],

  [ROLES.PROCUREMENT_MANAGER]: [
    { type: "APPROVAL_PENDING", label: "Approval Pending", priority: "High" },
    { type: "BUDGET_EXCEEDED", label: "Budget Exceeded", priority: "High" },
    { type: "VENDOR_APPROVED", label: "Vendor Approved", priority: "Medium" },
    { type: "REQUEST_SUBMITTED", label: "Request Submitted", priority: "Medium" },
  ],

  [ROLES.EMPLOYEE]: [
    { type: "REQUEST_SUBMITTED", label: "Request Submitted", priority: "Medium" },
    { type: "REQUEST_APPROVED", label: "Request Approved", priority: "High" },
    { type: "REQUEST_REJECTED", label: "Request Rejected", priority: "High" },
    { type: "MANAGER_COMMENT", label: "Manager Comment", priority: "Medium" },
    { type: "REMINDER", label: "Reminder", priority: "Low" },
  ],

  [ROLES.COMPLIANCE_OFFICER]: [
    { type: "CERTIFICATE_EXPIRED", label: "Certificate Expired", priority: "High" },
    { type: "COMPLIANCE_FAILED", label: "Compliance Failed", priority: "High" },
    { type: "VERIFICATION_PENDING", label: "Verification Pending", priority: "Medium" },
  ],

  [ROLES.AUDITOR]: [
    { type: "AUDIT_SCHEDULED", label: "Audit Scheduled", priority: "Medium" },
    { type: "AUDIT_COMPLETED", label: "Audit Completed", priority: "High" },
    { type: "REPORT_GENERATED", label: "Report Generated", priority: "High" },
  ],
};

/**
 * Permissions Configuration by Role
 * Defines what actions each role can perform
 */
export const permissionsConfig = {
  [ROLES.ADMIN]: {
    procurement: {
      canView: true,
      canCreate: true,
      canApprove: true,
      canReject: true,
      canEdit: true,
      canDelete: true,
      canExport: true,
    },
    vendors: {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canApprove: true,
    },
    compliance: {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canVerify: true,
    },
    audit: {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canExport: true,
    },
    reports: {
      canView: true,
      canGenerate: true,
      canExport: true,
      canSchedule: true,
    },
    users: {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canManageRoles: true,
    },
  },

  [ROLES.PROCUREMENT_MANAGER]: {
    procurement: {
      canView: true,
      canCreate: true,
      canApprove: true,
      canReject: true,
      canEdit: false,
      canDelete: false,
      canExport: true,
    },
    vendors: {
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
      canApprove: true,
    },
    compliance: {
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
      canVerify: false,
    },
    reports: {
      canView: true,
      canGenerate: true,
      canExport: true,
      canSchedule: false,
    },
  },

  [ROLES.EMPLOYEE]: {
    procurement: {
      canView: true,
      canCreate: true,
      canApprove: false,
      canReject: false,
      canEdit: true,
      canDelete: false,
      canExport: false,
    },
    vendors: {
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
      canApprove: false,
    },
    compliance: {
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
      canVerify: false,
    },
  },

  [ROLES.COMPLIANCE_OFFICER]: {
    compliance: {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: false,
      canVerify: true,
    },
    reports: {
      canView: true,
      canGenerate: true,
      canExport: true,
      canSchedule: false,
    },
  },

  [ROLES.AUDITOR]: {
    audit: {
      canView: true,
      canCreate: true,
      canEdit: false,
      canDelete: false,
      canExport: true,
    },
    reports: {
      canView: true,
      canGenerate: true,
      canExport: true,
      canSchedule: false,
    },
  },
};

/**
 * Routes Access Control Configuration
 * Defines which routes are accessible to each role
 */
export const routeAccessConfig = {
  "/dashboard": [ROLES.ADMIN, ROLES.PROCUREMENT_MANAGER, ROLES.EMPLOYEE, ROLES.COMPLIANCE_OFFICER, ROLES.AUDITOR],
  "/procurement": [ROLES.ADMIN, ROLES.PROCUREMENT_MANAGER, ROLES.EMPLOYEE],
  "/vendors": [ROLES.ADMIN, ROLES.PROCUREMENT_MANAGER],
  "/risk": [ROLES.ADMIN, ROLES.PROCUREMENT_MANAGER],
  "/compliance": [ROLES.ADMIN, ROLES.PROCUREMENT_MANAGER, ROLES.COMPLIANCE_OFFICER],
  "/audit": [ROLES.ADMIN, ROLES.AUDITOR],
  "/approval": [ROLES.ADMIN, ROLES.PROCUREMENT_MANAGER],
  "/notifications": [ROLES.ADMIN, ROLES.PROCUREMENT_MANAGER, ROLES.EMPLOYEE, ROLES.COMPLIANCE_OFFICER, ROLES.AUDITOR],
  "/reports": [ROLES.ADMIN, ROLES.PROCUREMENT_MANAGER, ROLES.COMPLIANCE_OFFICER, ROLES.AUDITOR],
  "/users": [ROLES.ADMIN],
  "/settings": [ROLES.ADMIN],
};

/**
 * Helper function to get sidebar items for a role
 */
export const getSidebarItemsForRole = (role) => {
  return sidebarConfig[normalizeRole(role)] || [];
};

/**
 * Helper function to get dashboard config for a role
 */
export const getDashboardConfigForRole = (role) => {
  return dashboardConfig[normalizeRole(role)] || dashboardConfig[ROLES.EMPLOYEE];
};

/**
 * Helper function to get notifications config for a role
 */
export const getNotificationConfigForRole = (role) => {
  return notificationConfig[normalizeRole(role)] || [];
};

/**
 * Helper function to check if role has permission
 */
export const hasPermission = (role, module, action) => {
  const permissions = permissionsConfig[normalizeRole(role)];
  if (!permissions || !permissions[module]) {
    return false;
  }
  return permissions[module][action] === true;
};

/**
 * Helper function to check if role has access to route
 */
export const hasRouteAccess = (role, route) => {
  const allowedRoles = routeAccessConfig[route];
  const normalizedRole = normalizeRole(role);
  return allowedRoles && allowedRoles.includes(normalizedRole);
};

/**
 * Helper function to get all accessible routes for a role
 */
export const getAccessibleRoutesForRole = (role) => {
  return Object.keys(routeAccessConfig).filter((route) =>
    hasRouteAccess(role, route)
  );
};

/**
 * Activity Types Configuration
 * Used to filter activities based on role
 */
export const activityTypesConfig = {
  [ROLES.ADMIN]: [
    "USER_CREATED",
    "VENDOR_ADDED",
    "RISK_DETECTED",
    "AUDIT_COMPLETED",
    "COMPLIANCE_UPDATED",
    "REQUEST_SUBMITTED",
    "REQUEST_APPROVED",
    "REQUEST_REJECTED",
  ],

  [ROLES.PROCUREMENT_MANAGER]: [
    "REQUEST_SUBMITTED",
    "REQUEST_APPROVED",
    "REQUEST_REJECTED",
    "VENDOR_APPROVED",
    "BUDGET_EXCEEDED",
  ],

  [ROLES.EMPLOYEE]: [
    "REQUEST_SUBMITTED",
    "REQUEST_APPROVED",
    "REQUEST_REJECTED",
    "MANAGER_COMMENT",
  ],

  [ROLES.COMPLIANCE_OFFICER]: [
    "COMPLIANCE_UPDATED",
    "CERTIFICATE_EXPIRED",
    "VERIFICATION_COMPLETED",
  ],

  [ROLES.AUDITOR]: [
    "AUDIT_COMPLETED",
    "AUDIT_SCHEDULED",
    "REPORT_GENERATED",
  ],
};

/**
 * Get activity types for a role
 */
export const getActivityTypesForRole = (role) => {
  return activityTypesConfig[normalizeRole(role)] || [];
};
