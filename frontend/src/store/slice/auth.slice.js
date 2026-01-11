import { login, getProfile, logout } from "../../services/auth.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* LOGIN */
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await login(credentials);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Login failed"
      );
    }
  }
);


export const getProfileThunk = createAsyncThunk(
  "auth/me",
  async (_, thunkAPI) => {
    try {
      return await getProfile();
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || "Fetch profile failed");
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await logout();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Logout failed"
      );
    }
  }
);


const initialState = {
  user: null,
  role: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  authChecked: false,
};


export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setAuthChecked: (state) => {
      state.authChecked = true;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.role = action.payload.data.role;
        state.isAuthenticated = true;
        state.authChecked = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.authChecked = true;
      })
      .addCase(getProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.role = action.payload.data.role;
        state.isAuthenticated = true;
        state.authChecked = true;
      })

      .addCase(getProfileThunk.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.role = null;
        state.isAuthenticated = false;
        state.authChecked = true;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.role = null;
        state.isAuthenticated = false;
        state.authChecked = true;
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Still logout on frontend even if backend fails
        state.user = null;
        state.role = null;
        state.isAuthenticated = false;
        state.authChecked = true;
      });
  },
});

export const { clearError, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;
