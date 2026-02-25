import { CheckCheck, CheckCircle2 } from "lucide-react";
import { TaskInput } from "./components/taskInput/TaskInput";
import { TaskItem } from "./components/taskItem/TaskItem";
import TaskHeader from "@/components/shared/taskHeader";
import { useAppSelector } from "@/store";
import type { ITaskData } from "@/sharedType";
import { Card, CardContent } from "@/components/ui/card";

function Dashboard() {
  const { tasks } = useAppSelector((state) => state.task);
  const { user } = useAppSelector((state) => state.auth);

  const assignedTo = (task: ITaskData) => {
    if (user?.id === task.user) {
      return "self";
    }
  };

  return (
    <div>
      <div className="text-center my-12">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-lg">
          <CheckCircle2 className="w-5 h-5" />
          <h1 className="text-2xl font-bold">Task Tracker</h1>
        </div>
        <p className=" mt-2">Organize, prioritize, and conquer your day ✨</p>
      </div>

      <TaskInput />
      <TaskHeader />
      <div className="space-y-3 mt-5 pb-8">
        {tasks.length === 0 ? (
          <Card
            className="
        relative
        bg-white/70 dark:bg-zinc-900/70
        backdrop-blur-xl
        rounded-3xl
        shadow-xl dark:shadow-2xl
        border border-white/40 dark:border-zinc-700/50
        p-10
        text-center
        overflow-hidden
        transition-colors duration-300
      "
          >
            <CardContent className="p-0">
              {/* Soft Gradient Glow Background */}
              <div
                className="
            absolute inset-0 pointer-events-none
            bg-gradient-to-br
            from-green-100/40 via-transparent to-blue-100/40
            dark:from-green-900/20 dark:to-blue-900/20
          "
              />

              <div className="relative space-y-6">
                {/* Icon Wrapper */}
                <div
                  className="
              mx-auto w-fit p-6 rounded-full
              bg-gradient-to-br
              from-green-100 to-green-200
              dark:from-green-900 dark:to-green-800
              shadow-inner
              dark:shadow-green-900/40
              transition-transform duration-300
              hover:scale-105
            "
                >
                  <CheckCheck
                    className="
                w-16 h-16
                text-green-600
                dark:text-green-400
                drop-shadow-sm
              "
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  All Tasks Completed 🎉
                </h3>

                {/* Subtitle */}
                <p className="text-sm max-w-xs mx-auto text-gray-500 dark:text-zinc-400">
                  Great job! You've completed everything on your list.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                assignedTo={assignedTo(task)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
