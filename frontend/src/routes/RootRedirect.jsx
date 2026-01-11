import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ROLE_REDIRECT = {
  HR: "/hr/dashboard",
  INTERVIEWER: "/interviewer/dashboard",
  CANDIDATE: "/candidate/dashboard",
};

const RootRedirect = () => {
  const { isAuthenticated, role, authChecked } = useAuth();

  if (!authChecked) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={ROLE_REDIRECT[role]} replace />;
};

export default RootRedirect;
