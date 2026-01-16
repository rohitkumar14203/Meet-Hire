import { createJobService, getAllJobsByHRService, updateJobService, deleteJobService } from "../../../services/jobs.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const createJobThunk = createAsyncThunk(
    "jobs/create",
    async (jobData, thunkAPI) => {
        try {
            const response = await createJobService(jobData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || "Job creation failed"
            );
        }
    }
);

export const getAllJobsThunk = createAsyncThunk(
    "jobs/getAll",
    async (_, thunkAPI) => {
        try {
            const response = await getAllJobsByHRService();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || "Failed to fetch jobs"
            );
        }
    }
);

export const updateJobThunk = createAsyncThunk(
    "jobs/update",
    async ({ jobId, jobData }, thunkAPI) => {
        try {
            const response = await updateJobService(jobId, jobData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || "Job update failed"
            );
        }
    }
);

export const deleteJobThunk = createAsyncThunk(
    "jobs/delete",
    async (jobId, thunkAPI) => {
        try {
            const response = await deleteJobService(jobId);
            return { jobId, ...response };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || "Job deletion failed"
            );
        }
    }
);


export const jobsSlice = createSlice({
    name: "jobs",
    initialState: {
        jobList: [],
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            // Create Job
            .addCase(createJobThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createJobThunk.fulfilled, (state, action) => {
                state.loading = false;
                const job = action.payload.data;
                state.jobList.unshift(job);
            })
            .addCase(createJobThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get All Jobs
            .addCase(getAllJobsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllJobsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.jobList = action.payload.data;
            })
            .addCase(getAllJobsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Job
            .addCase(updateJobThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateJobThunk.fulfilled, (state, action) => {
                state.loading = false;
                const updatedJob = action.payload.data;
                const index = state.jobList.findIndex(job => job._id === updatedJob._id);
                if (index !== -1) {
                    state.jobList[index] = updatedJob;
                }
            })
            .addCase(updateJobThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Job
            .addCase(deleteJobThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteJobThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.jobList = state.jobList.filter(job => job._id !== action.payload.jobId);
            })
            .addCase(deleteJobThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
}
});

export default jobsSlice.reducer;