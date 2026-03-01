import { useMutation } from "@tanstack/react-query";
import axios from "@/config/axios";
import { logout, setUser } from "@/store/auth/authSlice";
import type {
  IApiresponse,
  IErrorResponse,
  ITaskData,
  IUser,
} from "@/sharedType";
import { useAppDispatch } from "@/store";
import { showErrorToast } from "@/utils/errorToast";
import successToast from "@/utils/successToast";
import { addTask, deleteTask, updateTask } from "@/store/task/taskSlice";

// Custom hooks for authentication-related operations
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

// hook for Task related operations
export const useCreateTask = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationKey: ["createTask"],
    mutationFn: async (data: {
      title: string;
      priority: "low" | "medium" | "high";
      description?: string;
      dueDate?: string;
      time?: string;
      status?: "not started" | "on track" | "off track";
      repeat?: "never" | "daily" | "weekly" | "monday to friday" | "monthly";
    }) => {
      const response = await axios.post("/tasks", data);
      return response.data;
    },
    onSuccess: (data: IApiresponse<ITaskData>) => {
      dispatch(addTask(data.data));
      successToast(data.message);
    },
    onError: (error: IErrorResponse) => {
      showErrorToast(error);
    },
  });
};

export const useDeleteTask = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: async (id: string) => {
      const response = await axios.delete(`/tasks/${id}`);
      return response.data;
    },
    onSuccess: (data: IApiresponse<ITaskData>) => {
      successToast("Task deleted successfully");
      dispatch(deleteTask(data.data._id));
    },
    onError: (error: IErrorResponse) => {
      showErrorToast(error);
    },
  });
};

export const useUpdateTask = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationKey: ["updateTask"],
    mutationFn: async (data: Partial<ITaskData>) => {
      const response = await axios.put(`/tasks/${data._id}`, data);
      return response.data;
    },
    onSuccess: (data: IApiresponse<ITaskData>) => {
      successToast("Task updated successfully");
      dispatch(updateTask(data.data));
    },
    onError: (error: IErrorResponse) => {
      showErrorToast(error);
    },
  });
};

export const useMarkComplete = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationKey: ["markComplete"],
    mutationFn: async (data: { id: string; isCompleted: boolean }) => {
      const response = await axios.put(`/tasks/${data.id}`, {
        isCompleted: data.isCompleted,
      });
      return response.data;
    },
    onSuccess: (data: IApiresponse<ITaskData>) => {
      dispatch(updateTask(data.data));
      successToast(
        data.data.isCompleted
          ? "Task marked as completed"
          : "Task marked as incomplete"
      );
    },
    onError: (error: IErrorResponse) => {
      showErrorToast(error);
    },
  });
};
