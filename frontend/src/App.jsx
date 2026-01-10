import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import { HRDashboard } from "./pages/hr/Dashboard";
import {InterviewerDashboard} from "./pages/interviewer/Dashboard";
import {CandidateDashboard} from "./pages/candidate/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import RootRedirect from "./routes/RootRedirect";
import { Signup } from "./pages/auth/Signup";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROOT ROUTE (THIS FIXES YOUR ERROR) */}
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
