import { useDispatch, useSelector } from "react-redux";
import { 
    applyForJobThunk, 
    getCandidateApplicationsThunk,
    clearApplyStatus 
} from "../store/slice/candidate/applications.slice";

export const useCandidateApplications = () => {
    const dispatch = useDispatch();
    const { 
        applicationsList, 
        loading, 
        error,
        applyLoading,
        applyError,
        applySuccess
    } = useSelector((state) => state.candidateApplications);

    const applyForJob = (jobId) => {
        dispatch(applyForJobThunk(jobId));
    };

    const fetchMyApplications = () => {
        dispatch(getCandidateApplicationsThunk());
    };

    const clearStatus = () => {
        dispatch(clearApplyStatus());
    };

    const hasApplied = (jobId) => {
        return applicationsList.some(app => app.job._id === jobId || app.job === jobId);
    };

    return {
        applicationsList,
        loading,
        error,
        applyLoading,
        applyError,
        applySuccess,
        applyForJob,
        fetchMyApplications,
        clearStatus,
        hasApplied,
    };
};
