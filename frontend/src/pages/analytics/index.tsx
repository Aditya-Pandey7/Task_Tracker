import { CheckCircle2, Clock, ListTodo, AlertCircle } from "lucide-react";
import { TaskStatCard } from "./components/taskStatCard/TaskStatCard";
import { TaskProgressChart } from "./components/taskProgressChart/TaskProgressChart";
import { TaskStatusChart } from "./components/taskStatusChart/TaskStatusChart";
import { TaskList } from "./components/taskList/TaskList";
import { useTheme } from "@/context/theme/ThemeContext";

function Analytics() {
  const { theme } = useTheme();
  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-slate-50"} `}
    >
      {/* Main Content */}
      <main className="p-8 ">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-xl text-slate-900 mb-1">Welcome back, John!</h2>
          <p className="text-slate-600">
            Here's an overview of your team's tasks and progress.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <TaskStatCard
            title="Total Tasks"
            value="100"
            icon={ListTodo}
            iconColor="text-blue-600"
            iconBg="bg-blue-100"
          />
          <TaskStatCard
            title="Completed"
            value="45"
            icon={CheckCircle2}
            iconColor="text-green-600"
            iconBg="bg-green-100"
          />
          <TaskStatCard
            title="In Progress"
            value="32"
            icon={Clock}
            iconColor="text-amber-600"
            iconBg="bg-amber-100"
          />
          <TaskStatCard
            title="Overdue"
            value="5"
            icon={AlertCircle}
            iconColor="text-red-600"
            iconBg="bg-red-100"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TaskProgressChart />
          <TaskStatusChart />
        </div>

        {/* Task List */}
        <div className="mb-8">
          <TaskList />
        </div>
      </main>
    </div>
  );
}

export default Analytics;
