/**
 * Role-Specific Mock Dashboard Data
 * Different data for different roles based on their responsibilities
 */

export const adminDashboardData = {
  totalRequests: 1250,
  pendingRequests: 185,
  approvedRequests: 920,
  rejectedRequests: 145,
  totalVendors: 310,
  risks: 47,
  complianceIssues: 23,
};

export const procurementManagerDashboardData = {
  totalRequests: 580,
  pendingRequests: 95,
  approvedRequests: 420,
  rejectedRequests: 65,
  totalVendors: 180,
  risks: 32,
};

export const employeeDashboardData = () => ({
  myRequests: 12,
  pendingRequests: 3,
  approvedRequests: 7,
  rejectedRequests: 2,
  // NOT SHOWN: totalVendors, risks, complianceIssues, departmentSpending, companyAnalytics
});

export const complianceOfficerDashboardData = {
  complianceIssues: 23,
  pendingReviews: 18,
  verifiedDocuments: 156,
  violations: 8,
};

export const auditorDashboardData = {
  auditLogs: 342,
  todayActivities: 24,
  generatedReports: 18,
  criticalActivities: 5,
};

/**
 * Role-Specific Notifications Mock Data
 */
export const adminNotifications = [
  {
    id: 1,
    type: "USER_CREATED",
    message: "New user 'Sarah Johnson' has been created with Employee role",
    priority: "Medium",
    status: "Unread",
    timestamp: new Date().toISOString(),
    icon: "PersonAdd",
  },
  {
    id: 2,
    type: "VENDOR_ADDED",
    message: "New vendor 'Tech Solutions Inc' has been registered",
    priority: "Medium",
    status: "Unread",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    icon: "Business",
  },
  {
    id: 3,
    type: "RISK_UPDATED",
    message: "High-risk vendor detected: ABC Supplies - Risk Score 8.5/10",
    priority: "High",
    status: "Read",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    icon: "WarningAmber",
  },
  {
    id: 4,
    type: "AUDIT_COMPLETED",
    message: "Quarterly audit by Daniel Auditor has been completed",
    priority: "Medium",
    status: "Read",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    icon: "CheckCircle",
  },
  {
    id: 5,
    type: "COMPLIANCE_UPDATED",
    message: "ISO 27001 compliance certificate will expire in 30 days",
    priority: "High",
    status: "Read",
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    icon: "AlertTriangle",
  },
];

export const procurementManagerNotifications = [
  {
    id: 1,
    type: "APPROVAL_PENDING",
    message: "5 procurement requests awaiting your approval",
    priority: "High",
    status: "Unread",
    timestamp: new Date().toISOString(),
    icon: "AssignmentIn",
  },
  {
    id: 2,
    type: "BUDGET_EXCEEDED",
    message: "Department 'IT Operations' has exceeded quarterly budget by 15%",
    priority: "High",
    status: "Unread",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    icon: "TrendingUp",
  },
  {
    id: 3,
    type: "VENDOR_APPROVED",
    message: "Vendor 'CloudBase Solutions' has been approved",
    priority: "Medium",
    status: "Read",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    icon: "ThumbUp",
  },
  {
    id: 4,
    type: "REQUEST_SUBMITTED",
    message: "New procurement request PRO-2024-001245 submitted by John Smith",
    priority: "Medium",
    status: "Read",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    icon: "NoteAdd",
  },
];

export const employeeNotifications = [
  {
    id: 1,
    type: "REQUEST_SUBMITTED",
    message: "Your request PRO-2024-001245 has been successfully submitted",
    priority: "Medium",
    status: "Unread",
    timestamp: new Date().toISOString(),
    icon: "CheckCircle",
  },
  {
    id: 2,
    type: "REQUEST_APPROVED",
    message: "Your request PRO-2024-001240 has been approved by Manager",
    priority: "High",
    status: "Unread",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    icon: "ThumbUp",
  },
  {
    id: 3,
    type: "MANAGER_COMMENT",
    message: "Manager David left a comment on your request",
    priority: "Medium",
    status: "Read",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    icon: "ModeComment",
  },
  {
    id: 4,
    type: "REMINDER",
    message: "Please review your pending requests - 2 items need attention",
    priority: "Low",
    status: "Read",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    icon: "Notifications",
  },
];

export const complianceOfficerNotifications = [
  {
    id: 1,
    type: "CERTIFICATE_EXPIRED",
    message: "SSL Certificate for vendor 'TechCorp' expires in 15 days",
    priority: "High",
    status: "Unread",
    timestamp: new Date().toISOString(),
    icon: "AlertTriangle",
  },
  {
    id: 2,
    type: "COMPLIANCE_FAILED",
    message: "Department 'Finance' failed GDPR compliance check",
    priority: "High",
    status: "Unread",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    icon: "Error",
  },
  {
    id: 3,
    type: "VERIFICATION_PENDING",
    message: "5 compliance documents are awaiting your verification",
    priority: "Medium",
    status: "Read",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    icon: "AssignmentIn",
  },
];

export const auditorNotifications = [
  {
    id: 1,
    type: "AUDIT_SCHEDULED",
    message: "Financial audit scheduled for December 15, 2024",
    priority: "Medium",
    status: "Unread",
    timestamp: new Date().toISOString(),
    icon: "Event",
  },
  {
    id: 2,
    type: "AUDIT_COMPLETED",
    message: "Q3 operational audit has been completed - 15 findings",
    priority: "High",
    status: "Unread",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    icon: "CheckCircle",
  },
  {
    id: 3,
    type: "REPORT_GENERATED",
    message: "Annual audit report has been generated and is ready for export",
    priority: "High",
    status: "Read",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    icon: "Description",
  },
];

/**
 * Role-Specific Activities Mock Data
 */
export const adminActivities = [
  {
    id: 1,
    type: "USER_CREATED",
    timestamp: new Date().toISOString(),
    user: "John Admin",
    action: "Created new user",
    module: "User Management",
    details: "User 'Sarah Johnson' created with Employee role",
    status: "Completed",
  },
  {
    id: 2,
    type: "VENDOR_ADDED",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    user: "David Manager",
    action: "Added new vendor",
    module: "Vendors",
    details: "Vendor 'Tech Solutions Inc' registered",
    status: "Completed",
  },
  {
    id: 3,
    type: "RISK_DETECTED",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    user: "System",
    action: "Risk detected",
    module: "Risk",
    details: "High-risk vendor ABC Supplies identified",
    status: "Active",
  },
  {
    id: 4,
    type: "REQUEST_APPROVED",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    user: "David Manager",
    action: "Approved procurement request",
    module: "Procurement",
    details: "Request PRO-2024-001200 approved",
    status: "Completed",
  },
  {
    id: 5,
    type: "COMPLIANCE_UPDATED",
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    user: "Anna Compliance",
    action: "Updated compliance",
    module: "Compliance",
    details: "ISO 27001 compliance status updated",
    status: "Completed",
  },
];

export const procurementManagerActivities = [
  {
    id: 1,
    type: "REQUEST_SUBMITTED",
    timestamp: new Date().toISOString(),
    user: "John Smith",
    action: "Submitted procurement request",
    module: "Procurement",
    details: "Request PRO-2024-001245 for Office Supplies",
    status: "Pending",
  },
  {
    id: 2,
    type: "REQUEST_APPROVED",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    user: "David Manager",
    action: "Approved procurement request",
    module: "Procurement",
    details: "Request PRO-2024-001240 approved",
    status: "Completed",
  },
  {
    id: 3,
    type: "REQUEST_REJECTED",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    user: "David Manager",
    action: "Rejected procurement request",
    module: "Procurement",
    details: "Request PRO-2024-001235 rejected - Budget exceeded",
    status: "Completed",
  },
  {
    id: 4,
    type: "VENDOR_APPROVED",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    user: "David Manager",
    action: "Approved vendor",
    module: "Procurement",
    details: "Vendor 'CloudBase Solutions' approved",
    status: "Completed",
  },
  {
    id: 5,
    type: "BUDGET_EXCEEDED",
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    user: "System",
    action: "Budget alert",
    module: "Procurement",
    details: "Department 'IT Operations' exceeded budget by 15%",
    status: "Active",
  },
];

export const employeeActivities = (userEmail) => [
  {
    id: 1,
    type: "REQUEST_SUBMITTED",
    timestamp: new Date().toISOString(),
    user: "Sarah Employee",
    action: "Submitted procurement request",
    module: "Procurement",
    details: "Request PRO-2024-001245 for Office Supplies",
    status: "Pending",
    submittedBy: userEmail,
  },
  {
    id: 2,
    type: "REQUEST_APPROVED",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    user: "Sarah Employee",
    action: "Request approved",
    module: "Procurement",
    details: "Request PRO-2024-001240 approved by Manager",
    status: "Completed",
    submittedBy: userEmail,
  },
  {
    id: 3,
    type: "MANAGER_COMMENT",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    user: "David Manager",
    action: "Added comment",
    module: "Procurement",
    details: "Manager added comment: 'Please provide additional documentation'",
    status: "Completed",
    submittedBy: userEmail,
  },
];

export const complianceOfficerActivities = [
  {
    id: 1,
    type: "COMPLIANCE_UPDATED",
    timestamp: new Date().toISOString(),
    user: "Anna Compliance",
    action: "Updated compliance",
    module: "Compliance",
    details: "ISO 27001 compliance status updated",
    status: "Completed",
  },
  {
    id: 2,
    type: "CERTIFICATE_EXPIRED",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    user: "System",
    action: "Certificate expiry alert",
    module: "Compliance",
    details: "SSL Certificate for TechCorp expires in 15 days",
    status: "Active",
  },
  {
    id: 3,
    type: "VERIFICATION_COMPLETED",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    user: "Anna Compliance",
    action: "Verified document",
    module: "Compliance",
    details: "GDPR compliance document verified",
    status: "Completed",
  },
];

export const auditorActivities = [
  {
    id: 1,
    type: "AUDIT_COMPLETED",
    timestamp: new Date().toISOString(),
    user: "Daniel Auditor",
    action: "Completed audit",
    module: "Audit",
    details: "Q3 operational audit completed - 15 findings",
    status: "Completed",
  },
  {
    id: 2,
    type: "AUDIT_SCHEDULED",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    user: "Daniel Auditor",
    action: "Scheduled audit",
    module: "Audit",
    details: "Financial audit scheduled for December 15, 2024",
    status: "Scheduled",
  },
  {
    id: 3,
    type: "REPORT_GENERATED",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    user: "Daniel Auditor",
    action: "Generated report",
    module: "Audit",
    details: "Annual audit report generated",
    status: "Completed",
  },
];

/**
 * Function to get role-specific dashboard data
 */
const normalizeRoleKey = (role) => {
  const normalizedRole = role?.toString().trim().toLowerCase();

  switch (normalizedRole) {
    case "admin":
    case "administrator":
      return "Admin";
    case "manager":
    case "procurement manager":
      return "Procurement Manager";
    case "employee":
      return "Employee";
    case "compliance officer":
      return "Compliance Officer";
    case "auditor":
      return "Auditor";
    default:
      return role;
  }
};

export const getRoleDashboardData = (role) => {
  const roleDataMap = {
    Admin: adminDashboardData,
    "Procurement Manager": procurementManagerDashboardData,
    Employee: employeeDashboardData,
    "Compliance Officer": complianceOfficerDashboardData,
    Auditor: auditorDashboardData,
  };

  return roleDataMap[normalizeRoleKey(role)] || employeeDashboardData;
};

/**
 * Function to get role-specific notifications
 */
export const getRoleNotifications = (role) => {
  const roleNotificationsMap = {
    Admin: adminNotifications,
    "Procurement Manager": procurementManagerNotifications,
    Employee: employeeNotifications,
    "Compliance Officer": complianceOfficerNotifications,
    Auditor: auditorNotifications,
  };

  return roleNotificationsMap[normalizeRoleKey(role)] || [];
};

/**
 * Function to get role-specific activities
 */
export const getRoleActivities = (role, userEmail = null) => {
  const roleActivitiesMap = {
    Admin: adminActivities,
    "Procurement Manager": procurementManagerActivities,
    Employee: employeeActivities(userEmail),
    "Compliance Officer": complianceOfficerActivities,
    Auditor: auditorActivities,
  };

  return roleActivitiesMap[normalizeRoleKey(role)] || [];
};
