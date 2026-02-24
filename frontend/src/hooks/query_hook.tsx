import { useMutation } from "@tanstack/react-query";
import axios from "@/config/axios";
import { logout, setUser } from "@/store/auth/authSlice";
import type { IApiresponse, IErrorResponse, IUser } from "@/sharedType";
import { useAppDispatch } from "@/store";
import { showErrorToast } from "@/utils/errorToast";
import successToast from "@/utils/successToast";

export const useSignup = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: {
      username: string;
      email: string;
      password: string;
    }) => {
      const response = await axios.post("/auth/signup", data);
      return response.data;
    },
    onSuccess: (data: IApiresponse<IUser>) => {
      successToast(data.message);
    },
    onError: (error: IErrorResponse) => {
      showErrorToast(error);
    },
  });
};

export const useLogin = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await axios.post("/auth/login", data);
      return response.data;
    },
    onSuccess: (data: IApiresponse<IUser>) => {
      dispatch(setUser(data.data));
      console.log("User set in useLogin onSuccess:", data.data);
    },
    onError: (error: IErrorResponse) => {
      showErrorToast(error);
    },
  });
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      await axios.post("/auth/logout");
    },
    onSuccess: () => {
      dispatch(logout());
    },
    onError: (error: IErrorResponse) => {
      showErrorToast(error);
    },
  });
};

export const useVerifyOtp = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationKey: ["verifyOtp"],
    mutationFn: async (data: { email: string; otp: string }) => {
      const response = await axios.post("/auth/verify-otp", data);
      return response.data;
    },
    onSuccess: (data: IApiresponse<IUser>) => {
      dispatch(setUser(data.data));
      successToast(data.message);
      console.log("User set in useVerifyOtp onSuccess:", data.data);
    },
    onError: (error: IErrorResponse) => {
      showErrorToast(error);
    },
  });
};
