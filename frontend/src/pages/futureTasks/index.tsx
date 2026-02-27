import { CalendarClock, CalendarDays } from "lucide-react";
import { TaskItem } from "../dashboard/components/taskItem/TaskItem";
import TaskHeader from "@/components/shared/taskHeader";
import { useAppSelector } from "@/store";
import type { ITaskData } from "@/sharedType";
import { Card, CardContent } from "@/components/ui/card";
import { selectFutureTasks } from "@/store/task/taskSlice";

function FutureTasks() {
  const tasks = useAppSelector(selectFutureTasks);
  const { user } = useAppSelector((state) => state.auth);

  const assignedTo = (task: ITaskData) => {
    if (user?.id === task.user) {
      return "self";
    }
  };

  return (
    <div>
      <div className="text-center my-12">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
          <CalendarClock className="w-5 h-5" />
          <h1 className="text-2xl font-bold">Upcoming Tasks</h1>
        </div>
        <p className="mt-2">Plan ahead with your future tasks 🔮</p>
      </div>

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
              <div
                className="
                  absolute inset-0 pointer-events-none
                  bg-gradient-to-br
                  from-purple-100/40 via-transparent to-pink-100/40
                  dark:from-purple-900/20 dark:to-pink-900/20
                "
              />

              <div className="relative space-y-6">
                <div
                  className="
                    mx-auto w-fit p-6 rounded-full
                    bg-gradient-to-br
                    from-purple-100 to-purple-200
                    dark:from-purple-900 dark:to-purple-800
                    shadow-inner
                    dark:shadow-purple-900/40
                    transition-transform duration-300
                    hover:scale-105
                  "
                >
                  <CalendarDays
                    className="
                      w-16 h-16
                      text-purple-600
                      dark:text-purple-400
                      drop-shadow-sm
                    "
                  />
                </div>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  No Upcoming Tasks
                </h3>

                <p className="text-sm max-w-xs mx-auto text-gray-500 dark:text-zinc-400">
                  No tasks scheduled for the future. Add some to plan ahead!
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

export default FutureTasks;
