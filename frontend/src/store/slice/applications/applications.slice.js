import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApplicationForJob } from "../../../services/applications.service";

export const getApplications = createAsyncThunk(
    "applications/getByJob",
    async (jobId, thunkAPI) => {
        try {
            const response = await getApplicationForJob(jobId);
            return response;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || "Failed to fetch applications"
            );
        }
    }
);


export const applicationsSlice = createSlice({
    name: "applications",
    initialState: {
        applicationsList: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getApplications.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
            )
            .addCase(getApplications.fulfilled, (state, action) => {
                state.loading = false;
                state.applicationsList = action.payload.data;
            })
            .addCase(getApplications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default applicationsSlice.reducer;