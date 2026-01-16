import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllJobsService, getJobByIdService } from "../../../services/jobs.service";

export const getAllJobsThunk = createAsyncThunk(
    "candidateJobs/getAll",
    async ({ page = 1, limit = 10 } = {}, thunkAPI) => {
        try {
            const response = await getAllJobsService(page, limit);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || "Failed to fetch jobs"
            );
        }
    }
);

export const getJobByIdThunk = createAsyncThunk(
    "candidateJobs/getById",
    async (jobId, thunkAPI) => {
        try {
            const response = await getJobByIdService(jobId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || "Failed to fetch job details"
            );
        }
    }
);

export const candidateJobsSlice = createSlice({
    name: "candidateJobs",
    initialState: {
        jobList: [],
        selectedJob: null,
        loading: false,
        error: null,
        totalCount: 0,
    },

    reducers: {
        clearSelectedJob: (state) => {
            state.selectedJob = null;
        },
    },

    extraReducers: (builder) => {
        builder
            // Get All Jobs
            .addCase(getAllJobsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllJobsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.jobList = action.payload.data;
                state.totalCount = action.payload.count;
            })
            .addCase(getAllJobsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Job By ID
            .addCase(getJobByIdThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getJobByIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedJob = action.payload.data;
            })
            .addCase(getJobByIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearSelectedJob } = candidateJobsSlice.actions;
export default candidateJobsSlice.reducer;
