import { Trash2, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ITaskData } from "@/sharedType";
import { format } from "date-fns";
import { useDeleteTask } from "@/hooks/query_hook";
import UpdateSheet from "../updateSheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppDispatch } from "@/store";
import { markAsComplete } from "@/store/task/taskSlice";

interface TaskItemProps {
  task: ITaskData;
  assignedTo?: string;
}

export function TaskItem({ task, assignedTo }: TaskItemProps) {
  const { mutate } = useDeleteTask();
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    mutate(task._id);
  };

  const priorityColors = {
    low: "bg-emerald-100 text-emerald-600",
    medium: "bg-amber-100 text-amber-600",
    high: "bg-rose-100 text-rose-600",
  };

  const onToggleComplete = (id: string, isCompleted: boolean) => {
    dispatch(markAsComplete({ id, isCompleted }));
  };

  return (
    <div className="grid grid-cols-6 items-center px-6 py-4 border-b hover:bg-muted/40 transition">
      {/* Task Column */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={(e) => onToggleComplete(task._id, e.target.checked)}
          className=" h-5 w-5 rounded-md border-2 border-gray-300 checked:bg-green-600 checked:border-green-600 transition-all duration-200 cursor-pointer
"
        />

        <span
          className={`text-md font-bold ${
            task.isCompleted
              ? "line-through text-muted-foreground"
              : "font-bold text-foreground "
          }`}
        >
          {task.title}
        </span>
      </div>

      {/* Priority Column */}
      <div>
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 text-sm capitalize rounded-full ${
            priorityColors[task.priority as keyof typeof priorityColors]
          }`}
        >
          <Flag size={12} />
          {task.priority}
        </span>
      </div>

      {/* Due Date Column */}
      <div className="text-sm text-muted-foreground">
        {format(new Date(task.dueDate), "MMM d, yyyy")} at{" "}
        {format(new Date(task.time), "h:mm a")}
      </div>

      {/* Assigned To Column */}
      <div className="text-sm">{assignedTo ?? "—"}</div>

      {/* Status Column */}
      <div className="flex items-center justify-end gap-2">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            task.status === "pending"
              ? "bg-emerald-100 text-gray-600"
              : "bg-gray-100 text-green-600"
          }`}
        >
          {task.status}
        </span>
      </div>
      {/* Action Column  */}
      <div className="flex items-center justify-end gap-2">
        {/* Edit Tooltip */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="inline-block">
              <UpdateSheet task={task} />
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Edit Task</p>
          </TooltipContent>
        </Tooltip>

        {/* Delete Tooltip */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={handleDelete}>
              <Trash2 size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Delete Task</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
