import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import { HRDashboard } from "./pages/hr/Dashboard";
import { InterviewerDashboard } from "./pages/interviewer/Dashboard";
import { CandidateDashboard } from "./pages/candidate/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import RootRedirect from "./routes/RootRedirect";
import { Signup } from "./pages/auth/Signup";
import Jobs from "./pages/hr/Jobs";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<RootRedirect />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />



        {/* HR */}
        <Route
          path="/hr/dashboard"
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <HRDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hr/jobs"
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <Jobs />
            </ProtectedRoute>
          }
        />

        {/* INTERVIEWER */}
        <Route
          path="/interviewer/dashboard"
          element={
            <ProtectedRoute allowedRoles={["INTERVIEWER"]}>
              <InterviewerDashboard />
            </ProtectedRoute>
          }
        />

        {/* CANDIDATE */}
        <Route
          path="/candidate/dashboard"
          element={
            <ProtectedRoute allowedRoles={["CANDIDATE"]}>
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
