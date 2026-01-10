import { login } from "../../services/auth.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Login failed"
      );
    }
  }
);

// fake persistence (localStorage
const savedAuth = JSON.parse(localStorage.getItem("auth"));
const initialState = {
  user: savedAuth?.user || null,
  role: savedAuth?.user?.role || null,
  token: savedAuth?.token || null,
  isAuthenticated: !!savedAuth,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("auth");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN START
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // LOGIN SUCCESS fake
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.role = action.payload.user.role;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        // 🔥 PERSIST AUTH
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: action.payload.user,
            token: action.payload.token,
          })
        );
      })


      // LOGIN ERROR
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
