import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import { HRDashboard } from "./pages/hr/Dashboard";
import { InterviewerDashboard } from "./pages/interviewer/Dashboard";
import { CandidateDashboard, JobsPage, JobDetailsPage } from "./pages/candidate";
import { CandidateLayout } from "./components/layout/CandidateLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import RootRedirect from "./routes/RootRedirect";
import { Signup } from "./pages/auth/Signup";
import Jobs from "./pages/hr/Jobs";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { Applications } from "./pages/hr/Applications";
import LandingPage from "./pages/LandingPage";


export default function App() {
  const { getProfile } = useAuth();

  useEffect(() => {
    getProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
   
      <BrowserRouter>
        <Routes>

          {/* 🌐 Public Landing */}
          <Route path="/" element={<LandingPage />} />

          {/* 🔐 AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 🔁 Role Redirect */}
          <Route path="/redirect" element={<RootRedirect />} />

          {/* 👔 HR */}
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
          <Route
            path="/hr/applications"
            element={
              <ProtectedRoute allowedRoles={["HR"]}>
                <Applications />
              </ProtectedRoute>
            }
          />

          {/* 🎤 INTERVIEWER */}
          <Route
            path="/interviewer/dashboard"
            element={
              <ProtectedRoute allowedRoles={["INTERVIEWER"]}>
                <InterviewerDashboard />
              </ProtectedRoute>
            }
          />

          {/* 👨‍💻 CANDIDATE */}
          <Route
            path="/candidate"
            element={
              <ProtectedRoute allowedRoles={["CANDIDATE"]}>
                <CandidateLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<CandidateDashboard />} />
            <Route path="jobs" element={<JobsPage />} />
            <Route path="jobs/:jobId" element={<JobDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}
