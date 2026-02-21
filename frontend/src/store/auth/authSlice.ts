import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { checkAuthStatus } from "./authThunk";

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      console.log("User set in auth slice:", state.user);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuthStatus.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(checkAuthStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(checkAuthStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});
export const { logout, setUser, clearError } = authSlice.actions;

export default authSlice.reducer;
