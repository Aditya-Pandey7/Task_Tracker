import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCreateTask } from "@/hooks/query_hook";
import DatePicker from "@/pages/dashboard/components/updateSheet/datePicker";

import {
  Flag,
  ClipboardList,
  CircleDashed,
  Loader2,
  PlayCircle,
  AlertCircle,
  Repeat,
} from "lucide-react";

interface TaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
  time: string;
  priority: "low" | "medium" | "high";
  status: "not started" | "on track" | "off track";
  repeat: "never" | "daily" | "weekly" | "monday to friday" | "monthly";
}

export const CreateTaskDialog: React.FC<TaskDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const { mutate: createTask, isPending } = useCreateTask();

  // Get current time in HH:mm format
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      time: getCurrentTime(),
      priority: "medium",
      status: "not started",
      repeat: "never",
    },
  });

  const onSubmit = (data: TaskFormData) => {
    // Build task data - only send required fields and non-empty optional fields
    const taskData: {
      title: string;
      priority: "low" | "medium" | "high";
      description?: string;
      dueDate?: string;
      time?: string;
      status?: "not started" | "on track" | "off track";
      repeat?: "never" | "daily" | "weekly" | "monday to friday" | "monthly";
    } = {
      title: data.title,
      priority: data.priority,
    };

    // Only include optional fields if they have values
    if (data.description) taskData.description = data.description;
    if (data.dueDate) taskData.dueDate = data.dueDate;
    if (data.time) taskData.time = data.time;
    if (data.status) taskData.status = data.status;
    if (data.repeat && data.repeat !== "never") taskData.repeat = data.repeat;

    createTask(taskData, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden rounded-2xl">
        {/* Gradient Header */}
        <DialogHeader className="px-6 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <ClipboardList className="w-5 h-5" />
            Create New Task
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label>Task Title *</Label>
            <Input
              {...register("title", {
                required: "Title is required",
                minLength: { value: 1, message: "Title cannot be empty" },
                maxLength: {
                  value: 100,
                  message: "Title must be less than 100 characters",
                },
              })}
              placeholder="Design system update"
              className="focus-visible:ring-indigo-500"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <textarea
              {...register("description", {
                maxLength: {
                  value: 500,
                  message: "Description must be less than 500 characters",
                },
              })}
              placeholder="Describe the task..."
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Date & Time Picker */}
          <Controller
            control={control}
            name="dueDate"
            render={({ field: dueDateField }) => (
              <Controller
                control={control}
                name="time"
                render={({ field: timeField }) => (
                  <DatePicker
                    dueDate={dueDateField.value}
                    time={timeField.value}
                    onDateChange={(date) => dueDateField.onChange(date || "")}
                    onTimeChange={(time) => timeField.onChange(time || "")}
                  />
                )}
              />
            )}
          />

          {/* Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-rose-500" />
                Priority *
              </Label>
              <Controller
                control={control}
                name="priority"
                rules={{ required: "Priority is required" }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="low"
                        className="text-green-600 font-medium"
                      >
                        <span
                          style={{
                            fontSize: "2em",
                            color: "green",
                            verticalAlign: "middle",
                          }}
                        >
                          &#8226;
                        </span>{" "}
                        Low
                      </SelectItem>
                      <SelectItem
                        value="medium"
                        className="text-yellow-600 font-medium"
                      >
                        <span
                          style={{
                            fontSize: "2em",
                            color: "goldenrod",
                            verticalAlign: "middle",
                          }}
                        >
                          &#8226;
                        </span>{" "}
                        Medium
                      </SelectItem>
                      <SelectItem
                        value="high"
                        className="text-red-600 font-medium"
                      >
                        <span
                          style={{
                            fontSize: "2em",
                            color: "red",
                            verticalAlign: "middle",
                          }}
                        >
                          &#8226;
                        </span>{" "}
                        High
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.priority && (
                <p className="text-sm text-red-500">
                  {errors.priority.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Status</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="not started"
                        className="text-slate-600"
                      >
                        <div className="flex items-center gap-2">
                          <CircleDashed className="w-4 h-4" />
                          Not Started
                        </div>
                      </SelectItem>
                      <SelectItem value="on track" className="text-blue-600">
                        <div className="flex items-center gap-2">
                          <PlayCircle className="w-4 h-4" />
                          On Track
                        </div>
                      </SelectItem>
                      <SelectItem value="off track" className="text-red-600">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Off Track
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Repeat */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Repeat className="w-4 h-4 text-indigo-600" />
              Repeat
            </Label>
            <Controller
              control={control}
              name="repeat"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select repeat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monday to friday">
                      Monday to Friday
                    </SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Footer */}
          <DialogFooter className="pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="rounded-xl"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Task"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
