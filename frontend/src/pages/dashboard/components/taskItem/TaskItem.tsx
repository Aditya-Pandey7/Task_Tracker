import { Trash2, Edit2, Check, X, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: string;
  createdAt: Date;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export function TaskItem({ task, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const priorityConfig = {
    low: {
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      border: "border-l-emerald-400",
    },
    medium: {
      color: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-l-amber-400",
    },
    high: {
      color: "text-rose-500",
      bg: "bg-rose-50",
      border: "border-l-rose-400",
    },
  };

  const config = priorityConfig[task.priority as keyof typeof priorityConfig];

  return (
    <div
      className={`group flex items-center gap-4 p-5 bg-white rounded-2xl border-l-4 shadow-sm hover:shadow-xl transition-all duration-300 ${
        config.border
      } ${task.completed ? "opacity-50" : "hover:scale-[1.01]"}`}
    >
      <div className="shrink-0">
        <input
          type="checkbox"
          checked={task.completed}
          id={`task-${task.id}`}
          className="size-6 rounded-lg data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-indigo-500 data-[state=checked]:to-purple-600"
        />
      </div>

      <div className={`shrink-0 p-2 rounded-lg ${config.bg}`}>
        <Flag className={`size-4 ${config.color}`} />
      </div>

      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 h-10 border-2 rounded-xl"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveEdit();
              if (e.key === "Escape") handleCancelEdit();
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSaveEdit}
            className="shrink-0 hover:bg-green-50 rounded-xl"
          >
            <Check className="size-5 text-green-600" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancelEdit}
            className="shrink-0 hover:bg-red-50 rounded-xl"
          >
            <X className="size-5 text-red-600" />
          </Button>
        </div>
      ) : (
        <>
          <label
            htmlFor={`task-${task.id}`}
            className={`flex-1 cursor-pointer text-base ${
              task.completed
                ? "line-through text-gray-400"
                : "text-gray-800 font-medium"
            }`}
          >
            {task.text}
          </label>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="shrink-0 hover:bg-blue-50 rounded-xl"
            >
              <Edit2 className="size-4 text-blue-600" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="shrink-0 hover:bg-red-50 rounded-xl"
            >
              <Trash2 className="size-4 text-red-600" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
