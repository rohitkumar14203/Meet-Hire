import { useDispatch, useSelector } from "react-redux";
import { getAllJobsThunk, getJobByIdThunk, clearSelectedJob } from "../store/slice/candidate/jobs.slice";

export const useCandidateJobs = () => {
    const dispatch = useDispatch();
    const { jobList, selectedJob, loading, error, totalCount } = useSelector(
        (state) => state.candidateJobs
    );

    const fetchAllJobs = (page = 1, limit = 10) => {
        dispatch(getAllJobsThunk({ page, limit }));
    };

    const fetchJobById = (jobId) => {
        dispatch(getJobByIdThunk(jobId));
    };

    const clearJob = () => {
        dispatch(clearSelectedJob());
    };

    return {
        jobList,
        selectedJob,
        loading,
        error,
        totalCount,
        fetchAllJobs,
        fetchJobById,
        clearJob,
    };
};
