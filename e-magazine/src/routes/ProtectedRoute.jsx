import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  // Wait until authentication state is loaded
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // User is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User does not have permission
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  // User is authorized
  return children;
};

export default ProtectedRoute;