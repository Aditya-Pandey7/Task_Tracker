import { Trash2, Edit2, Check, X, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: string;
  createdAt: Date;
  assignedTo?: string;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export function TaskItem({
  task,
  onDelete,
  onEdit,
  onToggleComplete,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  const priorityColors = {
    low: "bg-emerald-100 text-emerald-600",
    medium: "bg-amber-100 text-amber-600",
    high: "bg-rose-100 text-rose-600",
  };

  return (
    <div className="grid grid-cols-5 items-center px-6 py-4 border-b hover:bg-muted/40 transition">
      {/* Task Column */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="size-4"
        />

        {isEditing ? (
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveEdit();
              if (e.key === "Escape") setIsEditing(false);
            }}
            className="border rounded-md px-2 py-1 text-sm w-full"
            autoFocus
          />
        ) : (
          <span
            className={`text-sm ${
              task.completed
                ? "line-through text-muted-foreground"
                : "font-medium"
            }`}
          >
            {task.text}
          </span>
        )}
      </div>

      {/* Priority Column */}
      <div>
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
            priorityColors[task.priority as keyof typeof priorityColors]
          }`}
        >
          <Flag size={12} />
          {task.priority}
        </span>
      </div>

      {/* Due Date Column */}
      <div className="text-sm text-muted-foreground">
        {task.createdAt.toLocaleDateString()}
      </div>

      {/* Assigned To Column */}
      <div className="text-sm">{task.assignedTo ?? "—"}</div>

      {/* Status Column */}
      <div className="flex items-center justify-end gap-2">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            task.completed
              ? "bg-emerald-100 text-emerald-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>

        {!isEditing ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(task.id)}
            >
              <Trash2 size={16} />
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" size="icon" onClick={handleSaveEdit}>
              <Check size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(false)}
            >
              <X size={16} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
