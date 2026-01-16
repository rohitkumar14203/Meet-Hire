import { axiosInstance } from "../api/axiosInstance"

export const getApplicationForJob = async (jobId) => {
    const response = await axiosInstance.get(`applications/job/${jobId}`);
    return response.data;
}

export const applyForJobService = async (jobId) => {
    const response = await axiosInstance.post(`applications/${jobId}`);
    return response.data;
}

export const getCandidateApplicationsService = async () => {
    const response = await axiosInstance.get("applications/my-applications");
    return response.data;
}