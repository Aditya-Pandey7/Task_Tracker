import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Clock, Plus } from "lucide-react";

const tasks = [
  {
    id: 1,
    title: "Design landing page mockup",
    assignee: "Sarah Johnson",
    priority: "High",
    status: "In Progress",
    dueDate: "Feb 20, 2026",
  },
  {
    id: 2,
    title: "Implement user authentication",
    assignee: "Mike Chen",
    priority: "High",
    status: "In Progress",
    dueDate: "Feb 21, 2026",
  },
  {
    id: 3,
    title: "Write API documentation",
    assignee: "Emily Davis",
    priority: "Medium",
    status: "Pending",
    dueDate: "Feb 22, 2026",
  },
  {
    id: 4,
    title: "Fix bug in payment gateway",
    assignee: "John Smith",
    priority: "High",
    status: "Completed",
    dueDate: "Feb 19, 2026",
  },
  {
    id: 5,
    title: "Update product catalog",
    assignee: "Anna Lee",
    priority: "Low",
    status: "Pending",
    dueDate: "Feb 25, 2026",
  },
  {
    id: 6,
    title: "Conduct user testing",
    assignee: "David Wilson",
    priority: "Medium",
    status: "In Progress",
    dueDate: "Feb 23, 2026",
  },
];

export function TaskList() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "In Progress":
        return <Clock className="w-5 h-5 text-amber-600" />;
      default:
        return <Circle className="w-5 h-5 text-slate-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Active Tasks</h2>
        <Button className="cursor-pointer">
          <Plus />
          Add Task
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-sm text-slate-600">
                Task
              </th>
              <th className="text-left py-3 px-2 text-sm text-slate-600">
                Assignee
              </th>
              <th className="text-left py-3 px-2 text-sm text-slate-600">
                Priority
              </th>
              <th className="text-left py-3 px-2 text-sm text-slate-600">
                Status
              </th>
              <th className="text-left py-3 px-2 text-sm text-slate-600">
                Due Date
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
              >
                <td className="py-3 px-2">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(task.status)}
                    <span className="text-slate-900">{task.title}</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-slate-700">{task.assignee}</td>
                <td className="py-3 px-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-slate-700">{task.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
