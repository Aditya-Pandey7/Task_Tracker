import {
  ListTodo,
  Flag,
  CalendarDays,
  User,
  CheckCircle2,
  ArrowUpDown,
} from "lucide-react";

function TaskHeader() {
  return (
    <div className="w-full border-b bg-muted/30 px-6 py-4">
      <div className="grid grid-cols-5 items-center text-sm font-semibold text-muted-foreground">
        {/* Task */}
        <div className="flex items-center gap-2 cursor-pointer hover:text-foreground transition">
          <ListTodo size={16} />
          <span>Task</span>
          <ArrowUpDown size={14} />
        </div>

        {/* Priority */}
        <div className="flex items-center gap-2 cursor-pointer hover:text-foreground transition">
          <Flag size={16} />
          <span>Priority</span>
          <ArrowUpDown size={14} />
        </div>

        {/* Due Date */}
        <div className="flex items-center gap-2 cursor-pointer hover:text-foreground transition">
          <CalendarDays size={16} />
          <span>Due Date</span>
          <ArrowUpDown size={14} />
        </div>

        {/* Assigned To */}
        <div className="flex items-center gap-2 cursor-pointer hover:text-foreground transition">
          <User size={16} />
          <span>Assigned To</span>
          <ArrowUpDown size={14} />
        </div>

        {/* Status */}
        <div className="flex items-center justify-end gap-2 cursor-pointer hover:text-foreground transition">
          <CheckCircle2 size={16} />
          <span>Status</span>
          <ArrowUpDown size={14} />
        </div>
      </div>
    </div>
  );
}

export default TaskHeader;
