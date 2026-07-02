/**
 * RBAC Utility Functions
 * Helper functions for role-based access control
 */

import {
  ROLES,
  normalizeRole,
  getSidebarItemsForRole,
  getDashboardConfigForRole,
  getNotificationConfigForRole,
  hasPermission,
  hasRouteAccess,
  getAccessibleRoutesForRole,
  getActivityTypesForRole,
} from "../config/roleConfig";

/**
 * Check if user has a specific role
 */
export const isRole = (userRole, roleName) => {
  return normalizeRole(userRole) === normalizeRole(roleName);
};

/**
 * Check if user has one of multiple roles
 */
export const isAnyRole = (userRole, roleNames) => {
  const normalizedRole = normalizeRole(userRole);
  return roleNames.some((roleName) => normalizeRole(roleName) === normalizedRole);
};

/**
 * Check if user is Admin
 */
export const isAdmin = (userRole) => {
  return normalizeRole(userRole) === ROLES.ADMIN;
};

/**
 * Check if user is Procurement Manager
 */
export const isProcurementManager = (userRole) => {
  return normalizeRole(userRole) === ROLES.PROCUREMENT_MANAGER;
};

/**
 * Check if user is Employee
 */
export const isEmployee = (userRole) => {
  return normalizeRole(userRole) === ROLES.EMPLOYEE;
};

/**
 * Check if user is Compliance Officer
 */
export const isComplianceOfficer = (userRole) => {
  return normalizeRole(userRole) === ROLES.COMPLIANCE_OFFICER;
};

/**
 * Check if user is Auditor
 */
export const isAuditor = (userRole) => {
  return normalizeRole(userRole) === ROLES.AUDITOR;
};

/**
 * Check if user can view a specific module
 */
export const canViewModule = (userRole, module) => {
  return hasPermission(userRole, module, "canView");
};

/**
 * Check if user can create in a specific module
 */
export const canCreateInModule = (userRole, module) => {
  return hasPermission(userRole, module, "canCreate");
};

/**
 * Check if user can edit in a specific module
 */
export const canEditInModule = (userRole, module) => {
  return hasPermission(userRole, module, "canEdit");
};

/**
 * Check if user can delete in a specific module
 */
export const canDeleteInModule = (userRole, module) => {
  return hasPermission(userRole, module, "canDelete");
};

/**
 * Check if user can approve in a specific module
 */
export const canApproveInModule = (userRole, module) => {
  return hasPermission(userRole, module, "canApprove");
};

/**
 * Check if user can reject in a specific module
 */
export const canRejectInModule = (userRole, module) => {
  return hasPermission(userRole, module, "canReject");
};

/**
 * Check if user can export from a specific module
 */
export const canExportFromModule = (userRole, module) => {
  return hasPermission(userRole, module, "canExport");
};

/**
 * Get sidebar items for user role
 */
export const getUserSidebarItems = (userRole) => {
  return getSidebarItemsForRole(userRole);
};

/**
 * Get dashboard configuration for user role
 */
export const getUserDashboardConfig = (userRole) => {
  return getDashboardConfigForRole(userRole);
};

/**
 * Get notification configuration for user role
 */
export const getUserNotificationConfig = (userRole) => {
  return getNotificationConfigForRole(userRole);
};

/**
 * Check if user has access to a route
 */
export const canAccessRoute = (userRole, route) => {
  return hasRouteAccess(userRole, route);
};

/**
 * Get all accessible routes for a user
 */
export const getAccessibleRoutes = (userRole) => {
  return getAccessibleRoutesForRole(userRole);
};

/**
 * Filter activities based on user role
 */
export const filterActivitiesByRole = (activities, userRole, userData = null) => {
  const allowedActivityTypes = getActivityTypesForRole(userRole);

  let filtered = activities.filter((activity) =>
    allowedActivityTypes.includes(activity.type)
  );

  // Employees should only see their own activities
  if (isEmployee(userRole) && userData) {
    filtered = filtered.filter((activity) =>
      activity.userId === userData.id || activity.submittedBy === userData.email
    );
  }

  return filtered;
};

/**
 * Filter notifications based on user role
 */
export const filterNotificationsByRole = (notifications, userRole) => {
  const allowedTypes = getNotificationConfigForRole(userRole);
  const allowedTypeNames = allowedTypes.map((type) => type.type);

  return notifications.filter((notification) =>
    allowedTypeNames.includes(notification.type)
  );
};

/**
 * Get role display name
 */
export const getRoleDisplayName = (role) => {
  const normalizedRole = normalizeRole(role);

  const roleDisplayNames = {
    [ROLES.ADMIN]: "Administrator",
    [ROLES.PROCUREMENT_MANAGER]: "Procurement Manager",
    [ROLES.EMPLOYEE]: "Employee",
    [ROLES.COMPLIANCE_OFFICER]: "Compliance Officer",
    [ROLES.AUDITOR]: "Auditor",
  };

  return roleDisplayNames[normalizedRole] || normalizedRole || role;
};

/**
 * Get role color (for badges, badges, etc.)
 */
export const getRoleColor = (role) => {
  const normalizedRole = normalizeRole(role);

  const roleColors = {
    [ROLES.ADMIN]: "error",
    [ROLES.PROCUREMENT_MANAGER]: "warning",
    [ROLES.EMPLOYEE]: "info",
    [ROLES.COMPLIANCE_OFFICER]: "success",
    [ROLES.AUDITOR]: "secondary",
  };

  return roleColors[normalizedRole] || "default";
};

/**
 * Check if user can edit their own request/item
 * Used for employees who can edit their own pending requests
 */
export const canEditOwnItem = (userRole, item, userData) => {
  if (isEmployee(userRole)) {
    // Employees can edit their own pending items
    return (
      (item.submittedBy === userData.email || item.submittedBy === userData.name) &&
      (item.status === "Pending" || item.status === "Draft")
    );
  }

  // Others follow normal permissions
  return canEditInModule(userRole, "procurement");
};

/**
 * Get role-specific KPI conversion
 * Converts generic KPI data to role-specific labels
 */
export const getRoleSpecificKPIs = (baseKPIs, userRole) => {
  const dashboardConfig = getUserDashboardConfig(userRole);
  const kpiConfig = dashboardConfig.kpis || [];

  return kpiConfig.map((config) => ({
    ...config,
    value: baseKPIs[config.id] || 0,
  }));
};

/**
 * Get visible KPIs for a role
 */
export const getVisibleKPIsForRole = (userRole, allKPIs) => {
  const dashboardConfig = getUserDashboardConfig(userRole);
  const kpiConfig = dashboardConfig.kpis || [];
  const hiddenKPIs = dashboardConfig.hiddenKPIs || [];

  const visibleKPIIds = kpiConfig
    .map((config) => config.id)
    .filter((id) => !hiddenKPIs.includes(id));

  return Object.keys(allKPIs).reduce((acc, key) => {
    if (visibleKPIIds.includes(key)) {
      acc[key] = allKPIs[key];
    }
    return acc;
  }, {});
};

/**
 * Get visible charts for a role
 */
export const getVisibleChartsForRole = (userRole) => {
  const dashboardConfig = getUserDashboardConfig(userRole);
  return dashboardConfig.charts || [];
};

/**
 * Check if role should see activities section
 */
export const shouldShowActivitiesForRole = (userRole) => {
  const dashboardConfig = getUserDashboardConfig(userRole);
  return dashboardConfig.showActivities === true;
};

/**
 * Check if role should see recent activities section
 */
export const shouldShowRecentActivitiesForRole = (userRole) => {
  const dashboardConfig = getUserDashboardConfig(userRole);
  return dashboardConfig.showRecentActivities === true;
};

/**
 * Get module visibility for role
 * Returns object with module names as keys and visibility as values
 */
export const getModuleVisibilityForRole = (userRole) => {
  const modules = {
    procurement: canViewModule(userRole, "procurement"),
    vendors: canViewModule(userRole, "vendors"),
    compliance: canViewModule(userRole, "compliance"),
    audit: canViewModule(userRole, "audit"),
    reports: canViewModule(userRole, "reports"),
    risk: canViewModule(userRole, "risk"),
    users: isAdmin(userRole),
    settings: true, // All roles can access settings
  };

  return modules;
};

/**
 * Validate user has required permissions before action
 * Used for authorization checks
 */
export const validatePermission = (userRole, module, action) => {
  const hasPermissionFlag = hasPermission(userRole, module, action);

  if (!hasPermissionFlag) {
    throw new Error(
      `User with role "${userRole}" does not have permission to "${action}" in "${module}"`
    );
  }

  return true;
};

/**
 * Create role-specific dashboard context
 */
export const createRoleDashboardContext = (userRole, userData) => {
  return {
    role: userRole,
    user: userData,
    config: getUserDashboardConfig(userRole),
    sidebarItems: getUserSidebarItems(userRole),
    notificationConfig: getUserNotificationConfig(userRole),
    accessibility: getModuleVisibilityForRole(userRole),
    canApprove: canApproveInModule(userRole, "procurement"),
    canManageUsers: isAdmin(userRole),
    isManager: isProcurementManager(userRole) || isAdmin(userRole),
    isEmployee: isEmployee(userRole),
  };
};
