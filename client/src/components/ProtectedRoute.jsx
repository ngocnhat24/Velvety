import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  const roleName = localStorage.getItem("roleName");

  // Check if the route allows guests (unauthenticated users)
  const isGuestAllowed = allowedRoles.includes("Guest") && !token;

  // Check if the user is authenticated and their role is allowed
  const isUserAllowed = token && allowedRoles.includes(roleName);

  if (isGuestAllowed || isUserAllowed) {
    return <Outlet />;
  }

  // Redirect unauthorized users to home page
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
