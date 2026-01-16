import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { applyForJobService, getCandidateApplicationsService } from "../../../services/applications.service";

export const applyForJobThunk = createAsyncThunk(
    "candidateApplications/apply",
    async (jobId, thunkAPI) => {
        try {
            const response = await applyForJobService(jobId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || "Failed to apply for job"
            );
        }
    }
);

export const getCandidateApplicationsThunk = createAsyncThunk(
    "candidateApplications/getAll",
    async (_, thunkAPI) => {
        try {
            const response = await getCandidateApplicationsService();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || "Failed to fetch applications"
            );
        }
    }
);

export const candidateApplicationsSlice = createSlice({
    name: "candidateApplications",
    initialState: {
        applicationsList: [],
        loading: false,
        error: null,
        applyLoading: false,
        applyError: null,
        applySuccess: false,
    },

    reducers: {
        clearApplyStatus: (state) => {
            state.applyLoading = false;
            state.applyError = null;
            state.applySuccess = false;
        },
    },

    extraReducers: (builder) => {
        builder
            // Apply for Job
            .addCase(applyForJobThunk.pending, (state) => {
                state.applyLoading = true;
                state.applyError = null;
                state.applySuccess = false;
            })
            .addCase(applyForJobThunk.fulfilled, (state, action) => {
                state.applyLoading = false;
                state.applySuccess = true;
                state.applicationsList.push(action.payload.data);
            })
            .addCase(applyForJobThunk.rejected, (state, action) => {
                state.applyLoading = false;
                state.applyError = action.payload;
                state.applySuccess = false;
            })

            // Get Candidate Applications
            .addCase(getCandidateApplicationsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCandidateApplicationsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.applicationsList = action.payload.data;
            })
            .addCase(getCandidateApplicationsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearApplyStatus } = candidateApplicationsSlice.actions;
export default candidateApplicationsSlice.reducer;
