import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ROLE_REDIRECT = {
  HR: "/hr/dashboard",
  INTERVIEWER: "/interviewer/dashboard",
  CANDIDATE: "/candidate/dashboard",
};

const RootRedirect = () => {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={ROLE_REDIRECT[role]} replace />;
};

export default RootRedirect;
