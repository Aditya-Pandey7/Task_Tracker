import { CheckCheck } from "lucide-react";
import { useState } from "react";
import { TaskInput } from "./components/taskInput/TaskInput";
import { TaskItem } from "./components/taskItem/TaskItem";
import type { Task } from "./components/taskItem/TaskItem";
import TaskHeader from "@/components/shared/taskHeader";

const dummyTasks: Task[] = [
  {
    id: "1",
    text: "Complete project documentation",
    completed: false,
    priority: "high",
    createdAt: new Date("2026-02-18"),
  },
  {
    id: "2",
    text: "Review pull requests",
    completed: false,
    priority: "medium",
    createdAt: new Date("2026-02-17"),
  },
  {
    id: "3",
    text: "Update dependencies",
    completed: true,
    priority: "low",
    createdAt: new Date("2026-02-16"),
  },
  {
    id: "4",
    text: "Write unit tests for auth module",
    completed: false,
    priority: "high",
    createdAt: new Date("2026-02-19"),
  },
  {
    id: "5",
    text: "Schedule team meeting",
    completed: true,
    priority: "medium",
    createdAt: new Date("2026-02-15"),
  },
];

function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [filter] = useState<"all" | "active" | "completed">("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (id: string, newText: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text: newText } : task)),
    );
  };

  return (
    <div>
      <div className="text-center space-y-3 pt-8">
        <div className="inline-block">
          <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-xl">
            <CheckCheck className="size-10" />
            <h1 className="text-5xl font-bold">Task Tracker</h1>
          </div>
        </div>
        <p className="text-lg text-gray-600 font-medium">
          Organize, prioritize, and conquer your day ✨
        </p>
      </div>

      <TaskInput />
      <TaskHeader />
      <div className="space-y-3 pb-8">
        {filteredTasks.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm p-16 rounded-3xl shadow-lg text-center border border-white/50">
            <div className="space-y-4">
              <div className="inline-block p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full">
                <CheckCheck className="size-16 text-gray-400" />
              </div>
              <p className="text-gray-400 text-xl font-medium">
                {filter === "completed"
                  ? "No completed tasks yet. Keep going! 💪"
                  : filter === "active"
                    ? "No active tasks. Time to add something new! 🎯"
                    : "Your task list is empty. Start by adding your first task! 🚀"}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={toggleComplete}
                onDelete={deleteTask}
                onEdit={editTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
