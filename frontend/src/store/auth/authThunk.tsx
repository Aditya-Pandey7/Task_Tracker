import axios from "@/config/axios";
import type { IApiresponse, IUser } from "@/sharedType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { setTasks } from "../task/taskSlice";

export const checkAuthStatus = createAsyncThunk<
  IApiresponse<IUser>,
  void,
  { rejectValue: string }
>("auth/checkAuthStatus", async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.get("/auth/isAuthenticated");

    if (!response.status || response.status !== 200) {
      throw new Error("Failed to check authentication status");
    }
    dispatch(setTasks(response.data.data.tasks));
    const data = response.data;
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    return rejectWithValue(
      axiosError.message || "Failed to check authentication status",
    );
  }
});
