import { useDispatch, useSelector } from "react-redux";
import { 
    createJobThunk, 
    getAllJobsThunk, 
    updateJobThunk, 
    deleteJobThunk 
} from "../store/slice/hr/jobs.slice";

export const useJobs = () => {
    const dispatch = useDispatch();

    const { jobList, loading, error } = useSelector((state) => state.jobs);

    // Load all jobs
    const loadJobs = () => {
        return dispatch(getAllJobsThunk());
    };

    // Create a new job
    const createJob = async (jobData) => {
        try {
            const result = await dispatch(createJobThunk(jobData)).unwrap();
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error };
        }
    };

    // Update an existing job
    const updateJob = async (jobId, jobData) => {
        try {
            const result = await dispatch(updateJobThunk({ jobId, jobData })).unwrap();
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error };
        }
    };

    // Delete a job
    const deleteJob = async (jobId) => {
        try {
            const result = await dispatch(deleteJobThunk(jobId)).unwrap();
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error };
        }
    };

    return {
        jobs: jobList,
        loading,
        error,
        loadJobs,
        createJob,
        updateJob,
        deleteJob,
    };
};
