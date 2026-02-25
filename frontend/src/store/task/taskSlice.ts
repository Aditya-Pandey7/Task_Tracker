import type { ITaskData } from "@/sharedType";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TaskStatus = "not started" | "on track" | "off track";
export type TaskPriority = "low" | "medium" | "high";
export type TaskRepeat =
  | "never"
  | "daily"
  | "weekly"
  | "monday to friday"
  | "monthly";

export interface TaskState {
  tasks: ITaskData[];
  selectedTask: ITaskData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  selectedTask: null,
  isLoading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<ITaskData[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<ITaskData>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<ITaskData>) => {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id,
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
    markAsComplete: (
      state,
      action: PayloadAction<{ id: string; isCompleted: boolean }>,
    ) => {
      const data = state.tasks.find((task) => task._id === action.payload.id);
      if (data) {
        data.isCompleted = action.payload.isCompleted;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  markAsComplete,
  clearError,
} = taskSlice.actions;

export default taskSlice.reducer;
