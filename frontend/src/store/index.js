import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth.slice";
import jobReducer from "./slice/hr/jobs.slice";
import applicationReducer from "./slice/applications/applications.slice";
import candidateJobsReducer from "./slice/candidate/jobs.slice";
import candidateApplicationsReducer from "./slice/candidate/applications.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        jobs: jobReducer,
        applications: applicationReducer,
        candidateJobs: candidateJobsReducer,
        candidateApplications: candidateApplicationsReducer,
    },
})