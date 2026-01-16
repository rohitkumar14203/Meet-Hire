import { axiosInstance } from "../api/axiosInstance"

export const createJobService = async (jobData) => {
    const response = await axiosInstance.post("jobs", jobData);
    return response.data;
}

export const getAllJobsByHRService = async () => {
    const response = await axiosInstance.get("jobs/my-jobs");
    return response.data;
}

export const getAllJobsService = async (page = 1, limit = 10) => {
    const response = await axiosInstance.get(`jobs?page=${page}&limit=${limit}`);
    return response.data;
}

export const getJobByIdService = async (jobId) => {
    const response = await axiosInstance.get(`jobs/${jobId}`);
    return response.data;
}

export const updateJobService = async (jobId, jobData) => {
    const response = await axiosInstance.put(`jobs/${jobId}`, jobData);
    return response.data;
}

export const deleteJobService = async (jobId) => {
    const response = await axiosInstance.delete(`jobs/${jobId}`);
    return response.data;
}