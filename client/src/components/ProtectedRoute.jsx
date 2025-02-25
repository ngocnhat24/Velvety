import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  const roleName = localStorage.getItem("roleName");

  console.log("User role:", roleName);
  console.log("Allowed roles:", allowedRoles);


  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(roleName)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
