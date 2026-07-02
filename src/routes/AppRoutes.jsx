import {
  Suspense,
  lazy,
} from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ProtectedRoute from "../components/common/ProtectedRoute";

import Loader from "../components/common/Loader";

/* ---------------- Public Pages ---------------- */

const Login = lazy(() =>
  import("../features/auth/pages/Login")
);

const ForgotPassword = lazy(() =>
  import("../features/auth/pages/ForgotPassword")
);

const ResetPassword = lazy(() =>
  import("../features/auth/pages/ResetPassword")
);

const SessionExpired = lazy(() =>
  import("../features/auth/pages/SessionExpired")
);

/* ---------------- Dashboard ---------------- */

const Dashboard = lazy(() =>
  import("../features/dashboard/pages/Dashboard")
);

/* ---------------- Procurement ---------------- */

const ProcurementList = lazy(() =>
  import("../features/procurement/pages/ProcurementList")
);

const ProcurementDetails = lazy(() =>
  import("../features/procurement/pages/ProcurementDetails")
);

const CreateRequest = lazy(() =>
  import("../features/procurement/pages/CreateRequest")
);

/* ---------------- Vendors ---------------- */

const VendorList = lazy(() =>
  import("../features/vendors/pages/VendorList")
);

const VendorProfile = lazy(() =>
  import("../features/vendors/pages/VendorProfile")
);

/* ---------------- Governance Modules ---------------- */

const RiskDashboard = lazy(() =>
  import("../features/risk/pages/RiskDashboard")
);

const ComplianceDashboard = lazy(() =>
  import("../features/compliance/pages/ComplianceDashboard")
);

const AuditCenter = lazy(() =>
  import("../features/audit/pages/AuditCenter")
);

const ApprovalWorkbench = lazy(() =>
  import("../features/approval/pages/ApprovalWorkbench")
);

const NotificationCenter = lazy(() =>
  import("../features/notification/pages/NotificationCenter")
);

const ReportingCenter = lazy(() =>
  import("../features/reports/pages/ReportingCenter")
);

const UserSettings = lazy(() =>
  import("../features/settings/pages/UserSettings")
);

/* ---------- User Management ---------- */

const UserManagement = lazy(() =>
  import("../features/users/pages/UserManagement")
);

/* ---------------- Loading Screen ---------------- */


export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Suspense
        fallback={<Loader />}
      >

        <Routes>

          {/* Public Routes */}

          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

          <Route
            path="/session-expired"
            element={<SessionExpired />}
          />

          {/* Protected Routes */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "Admin",
                  "Administrator",
                  "Manager",
                  "Procurement Manager",
                  "Employee",
                  "Vendor",
                  "Compliance Officer",
                  "Auditor",
                ]}
              >
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/procurement"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "Admin",
                  "Administrator",
                  "Manager",
                  "Procurement Manager",
                  "Employee",
                ]}
              >
                <ProcurementList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/procurement/new"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "Admin",
                  "Administrator",
                  "Manager",
                  "Procurement Manager",
                  "Employee",
                ]}
              >
                <CreateRequest />
              </ProtectedRoute>
            }
          />

          <Route
            path="/procurement/:id"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "Admin",
                  "Administrator",
                  "Manager",
                  "Procurement Manager",
                  "Employee",
                ]}
              >
                <ProcurementDetails />
              </ProtectedRoute>
            }
          />
                    <Route
            path="/vendors"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "Admin",
                  "Administrator",
                  "Manager",
                  "Procurement Manager",
                  "Vendor",
                ]}
              >
                <VendorList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vendors/:id"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "Admin",
                  "Administrator",
                  "Manager",
                  "Procurement Manager",
                  "Vendor",
                ]}
              >
                <VendorProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/risk"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "Admin",
                  "Administrator",
                  "Manager",
                  "Procurement Manager",
                ]}
              >
                <RiskDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/compliance"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "Admin",
                  "Administrator",
                  "Manager",
                  "Procurement Manager",
                  "Compliance Officer",
                ]}
              >
                <ComplianceDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/audit"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "Admin",
                  "Administrator",
                  "Auditor",
                ]}
              >
                <AuditCenter />
              </ProtectedRoute>
            }
          />

          <Route
            path="/approval"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "Admin",
                  "Administrator",
                  "Manager",
                  "Procurement Manager",
                ]}
              >
                <ApprovalWorkbench />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "Admin",
                  "Administrator",
                  "Manager",
                  "Procurement Manager",
                  "Vendor",
                  "Employee",
                  "Compliance Officer",
                  "Auditor",
                ]}
              >
                <NotificationCenter />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "Admin",
                  "Administrator",
                  "Manager",
                  "Procurement Manager",
                  "Auditor",
                ]}
              >
                <ReportingCenter />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "Admin",
                ]}
              >
                <UserSettings />
              </ProtectedRoute>
            }
          />

          {/* ---------- User Management ---------- */}

          <Route
            path="/users"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "Admin",
                  "Administrator",
                ]}
              >
                <UserManagement />
              </ProtectedRoute>
            }
          />

        </Routes>

      </Suspense>

    </BrowserRouter>

  );

}