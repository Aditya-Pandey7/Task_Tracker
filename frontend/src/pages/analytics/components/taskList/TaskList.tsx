import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme/ThemeContext";
import type { ITaskData, IUser } from "@/sharedType";
import { format } from "date-fns";
import { CheckCircle2, Circle, Clock, Plus } from "lucide-react";

interface TaskListProps {
  tasks: ITaskData[] | undefined;
  user: IUser | undefined;
}

export function TaskList({ tasks, user }: TaskListProps) {
  const { theme } = useTheme();
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on track":
        return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
      case "off track":
        return <Clock className="w-5 h-5 text-red-600" />;
      case "not started":
      default:
        return <Circle className="w-5 h-5 text-slate-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-amber-100 text-amber-700";
      case "low":
      default:
        return "bg-green-100 text-green-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on track":
        return "bg-blue-100 text-blue-700";
      case "off track":
        return "bg-red-100 text-red-700";
      case "not started":
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div
      className={`
    ${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-slate-200"}
    rounded-xl p-6 shadow-sm border
  `}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Active Tasks
        </h2>
        <Button className="cursor-pointer">
          <Plus />
          Add Task
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="text-left py-3 px-2 text-sm text-slate-600 dark:text-slate-400">
                Task
              </th>
              <th className="text-left py-3 px-2 text-sm text-slate-600 dark:text-slate-400">
                Assignee
              </th>
              <th className="text-left py-3 px-2 text-sm text-slate-600 dark:text-slate-400">
                Priority
              </th>
              <th className="text-left py-3 px-2 text-sm text-slate-600 dark:text-slate-400">
                Status
              </th>
              <th className="text-left py-3 px-2 text-sm text-slate-600 dark:text-slate-400">
                Due Date
              </th>
            </tr>
          </thead>

          <tbody>
            {tasks
              ?.filter((task) => !task.isCompleted)
              .map((task) => (
                <tr
                  key={task._id}
                  className="
              border-b border-slate-100
              dark:border-slate-800
              last:border-0
              hover:bg-slate-50
              dark:hover:bg-slate-800/50
              transition-colors
            "
                >
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(task.status)}
                      <span className="text-slate-800 dark:text-slate-200">
                        {task.title}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-2 text-slate-700 dark:text-slate-300">
                    {task.user == user?.id ? "Self" : user?.username}
                  </td>

                  <td className="py-3 px-2">
                    <span
                      className={`
                  px-2 py-1 rounded-full text-xs
                  ${getPriorityColor(task.priority)}
                  dark:bg-opacity-20
                `}
                    >
                      {task.priority}
                    </span>
                  </td>

                  <td className="py-3 px-2">
                    <span
                      className={`
                  px-2 py-1 rounded-full text-xs
                  ${getStatusColor(task.status)}
                  dark:bg-opacity-20
                `}
                    >
                      {task.status}
                    </span>
                  </td>

                  <td className="py-3 px-2 text-slate-700 dark:text-slate-300">
                    {format(new Date(task.dueDate), "MMM d, yyyy 'at' h:mm a")}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
