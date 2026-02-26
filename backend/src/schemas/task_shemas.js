import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title cannot be empty")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  status: z
    .enum(["not started", "on track", "off track"], {
      errorMap: () => ({
        message: "Status must be 'not started', 'on track', or 'off track'",
      }),
    })
    .optional(),
  dueDate: z
    .string({ required_error: "Due date is required" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Due date must be a valid date",
    }),
  time: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Time must be a valid date",
    })
    .optional(),
  repeat: z
    .enum(["never", "daily", "weekly", "monday to friday", "monthly"], {
      errorMap: () => ({
        message:
          "Repeat must be 'never', 'daily', 'weekly', 'monday to friday', or 'monthly'",
      }),
    })
    .optional(),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Priority is required",
    errorMap: () => ({
      message: "Priority must be 'low', 'medium', or 'high'",
    }),
  }),
  isCompleted: z.boolean().optional(),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title cannot be empty")
    .max(100, "Title must be less than 100 characters")
    .optional(),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  status: z
    .enum(["not started", "on track", "off track"], {
      errorMap: () => ({
        message: "Status must be 'not started', 'on track', or 'off track'",
      }),
    })
    .optional(),
  dueDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Due date must be a valid date",
    })
    .optional(),
  time: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Time must be a valid date",
    })
    .optional(),
  repeat: z
    .enum(["never", "daily", "weekly", "monday to friday", "monthly"], {
      errorMap: () => ({
        message:
          "Repeat must be 'never', 'daily', 'weekly', 'monday to friday', or 'monthly'",
      }),
    })
    .optional(),
  priority: z
    .enum(["low", "medium", "high"], {
      errorMap: () => ({
        message: "Priority must be 'low', 'medium', or 'high'",
      }),
    })
    .optional(),
  isCompleted: z.boolean().optional(),
});
