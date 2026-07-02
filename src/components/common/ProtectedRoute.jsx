import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { normalizeRole } from "../../config/roleConfig";

export default function ProtectedRoute({
  children,
  allowedRoles,
}) {

  const {
    isAuthenticated,
    user,
  } = useSelector(
    (state) => state.auth
  );

  const hasAccess = (userRole, roles = []) => {
    const normalizedUserRole = normalizeRole(userRole);

    return roles.some(
      (role) => normalizeRole(role) === normalizedUserRole
    );
  };

  // Authentication Check

  if (!isAuthenticated) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  // Role-Based Check

  if (
    allowedRoles &&
    !hasAccess(user?.role, allowedRoles)
  ) {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );

  }

  return children;

}