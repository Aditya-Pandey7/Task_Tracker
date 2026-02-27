"use client";

import {
  Edit2,
  Save,
  X,
  Type,
  AlignLeft,
  Flag,
  Calendar as CalendarIcon,
  Activity,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "./datePicker";
import type { ITaskData } from "@/sharedType";
import { Controller, useForm, type SubmitHandler, type FieldErrors } from "react-hook-form";
import { useUpdateTask } from "@/hooks/query_hook";
import { toast } from "sonner";

interface UpdateTaskSheetProps {
  task: ITaskData;
}

const UpdateTaskSheet = ({ task }: UpdateTaskSheetProps) => {
  const { register, handleSubmit, reset, control } = useForm<ITaskData>({
    defaultValues: task,
  });

  const { mutate: updateTask } = useUpdateTask();

  const handleSave: SubmitHandler<ITaskData> = (data) => {
    console.log("Saving task:", data);
    updateTask(data);
    reset(data);
  };

  const onInvalid = (errors: FieldErrors<ITaskData>) => {
    const firstError = Object.values(errors)[0];
    if (firstError?.message) {
      toast.error(firstError.message as string);
    } else if (firstError) {
      toast.error("Please fill in all required fields");
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-amber-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on track":
        return "text-blue-600";
      case "off track":
        return "text-red-600";
      case "not started":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Edit2 className="size-4" />
          <span className="sr-only">Edit task</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="
          flex flex-col
          bg-linear-to-br
          from-gray-50 to-gray-100/50
          dark:from-gray-900 dark:to-gray-950
          sm:max-w-lg p-0
        "
      >
        {/* Header */}
        <SheetHeader
          className="
            bg-white/80 dark:bg-gray-900/80
            backdrop-blur-sm
            border-b border-gray-200 dark:border-gray-700
            px-6 py-5 shadow-sm
          "
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
              <Edit2 className="size-5 text-white" />
            </div>
            <div>
              <SheetTitle className="text-xl text-gray-900 dark:text-gray-100">
                Update Task
              </SheetTitle>
              <SheetDescription className="text-sm text-gray-600 dark:text-gray-400">
                Make changes to your task details below.
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(handleSave, onInvalid)}
          className="flex-1 flex flex-col"
        >
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-3">
                <Label
                  htmlFor="title"
                  className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2"
                >
                  <Type className="size-4 text-gray-500 dark:text-gray-400" />
                  Title
                </Label>
                <Input
                  id="title"
                  {...register("title", {
                    required: "Task title is required",
                    minLength: {
                      value: 3,
                      message: "Title must be at least 3 characters",
                    },
                  })}
                  placeholder="Enter task title"
                  className="
                    bg-white dark:bg-gray-800
                    border-gray-200 dark:border-gray-700
                    text-gray-900 dark:text-gray-100
                    shadow-sm focus:shadow-md
                    transition-shadow h-11
                  "
                />
              </div>

              {/* Description */}
              <div className="space-y-3">
                <Label
                  htmlFor="description"
                  className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2"
                >
                  <AlignLeft className="size-4 text-gray-500 dark:text-gray-400" />
                  Description
                </Label>
                <textarea
                  id="description"
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 10,
                      message: "Description must be at least 10 characters",
                    },
                  })}
                  placeholder="Describe your task in detail..."
                  className="
                    min-h-35 w-full rounded-xl
                    border border-gray-200 dark:border-gray-700
                    bg-white dark:bg-gray-800
                    px-4 py-3 text-sm
                    text-gray-900 dark:text-gray-100
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                    shadow-sm transition-all duration-200
                    focus:outline-none
                    focus:ring-2 focus:ring-black/5 dark:focus:ring-white/10
                    focus:border-gray-400 dark:focus:border-gray-600
                    hover:border-gray-300 dark:hover:border-gray-600
                    hover:shadow-md resize-none
                  "
                />
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Flag
                    className={`size-4 text-gray-500 ${getPriorityColor(task?.priority || "low")}`}
                  />
                  Priority
                </Label>

                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="priority"
                        className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow h-11"
                      >
                        <SelectValue placeholder="Select priority" />{" "}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">
                          <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-green-500" />
                            Low
                          </div>
                        </SelectItem>
                        <SelectItem value="medium">
                          <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-amber-500" />
                            Medium
                          </div>
                        </SelectItem>
                        <SelectItem value="high">
                          <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-red-500" />
                            High
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Due Date */}
              <div className="space-y-3">
                <Label
                  htmlFor="due-date"
                  className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2"
                >
                  <CalendarIcon className="size-4 text-gray-500 dark:text-gray-400" />
                  Due Date
                </Label>
                <Controller
                  name="dueDate"
                  control={control}
                  render={({ field: dueDateField }) => (
                    <Controller
                      name="time"
                      control={control}
                      render={({ field: timeField }) => (
                        <DatePicker
                          dueDate={dueDateField.value}
                          time={timeField.value}
                          onDateChange={(date) => dueDateField.onChange(date)}
                          onTimeChange={(time) => timeField.onChange(time)}
                        />
                      )}
                    />
                  )}
                />
              </div>

              {/* Status */}
              <div className="space-y-3">
                <Label
                  htmlFor="status"
                  className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2"
                >
                  <Activity
                    className={`size-4 ${getStatusColor(task?.status || "not started")}`}
                  />
                  Status
                </Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="status"
                        className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow h-11"
                      >
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not started">
                          <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-gray-500" />
                            Not Started
                          </div>
                        </SelectItem>
                        <SelectItem value="on track">
                          <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-blue-500" />
                            On Track
                          </div>
                        </SelectItem>
                        <SelectItem value="off track">
                          <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-red-500" />
                            Off Track
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="
              sticky bottom-0
              bg-white/80 dark:bg-gray-900/80
              backdrop-blur-sm
              border-t border-gray-200 dark:border-gray-700
              px-6 py-5 shadow-lg
            "
          >
            <div className="flex justify-end gap-3">
              <SheetClose asChild>
                <Button
                  variant="outline"
                  className="
                    min-w-25 h-11
                    shadow-sm hover:shadow-md
                    transition-all
                    dark:border-gray-700
                    dark:bg-gray-800
                    dark:text-gray-200
                    dark:hover:bg-gray-700
                  "
                >
                  <X className="size-4 mr-2" />
                  Cancel
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button
                  type="submit"
                  className="
                    min-w-35 h-11
                    bg-linear-to-r from-blue-600 to-blue-700
                    hover:from-blue-700 hover:to-blue-800
                    shadow-lg shadow-blue-500/30
                    hover:shadow-xl hover:shadow-blue-500/40
                    transition-all
                  "
                >
                  <Save className="size-4 mr-2" />
                  Save Changes
                </Button>
              </SheetClose>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateTaskSheet;
