import { CheckCircle2, PartyPopper } from "lucide-react";
import { TaskItem } from "../dashboard/components/taskItem/TaskItem";
import TaskHeader from "@/components/shared/taskHeader";
import { useAppSelector } from "@/store";
import type { ITaskData } from "@/sharedType";
import { Card, CardContent } from "@/components/ui/card";
import { selectCompletedTasks } from "@/store/task/taskSlice";

function CompletedTasks() {
  const tasks = useAppSelector(selectCompletedTasks);
  const { user } = useAppSelector((state) => state.auth);

  const assignedTo = (task: ITaskData) => {
    if (user?.id === task.user) {
      return "self";
    }
  };

  return (
    <div>
      <div className="text-center my-12">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg">
          <CheckCircle2 className="w-5 h-5" />
          <h1 className="text-2xl font-bold">Completed Tasks</h1>
        </div>
        <p className="mt-2">All your accomplished tasks in one place 🎉</p>
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
                  from-amber-100/40 via-transparent to-orange-100/40
                  dark:from-amber-900/20 dark:to-orange-900/20
                "
              />

              <div className="relative space-y-6">
                <div
                  className="
                    mx-auto w-fit p-6 rounded-full
                    bg-gradient-to-br
                    from-amber-100 to-amber-200
                    dark:from-amber-900 dark:to-amber-800
                    shadow-inner
                    dark:shadow-amber-900/40
                    transition-transform duration-300
                    hover:scale-105
                  "
                >
                  <PartyPopper
                    className="
                      w-16 h-16
                      text-amber-600
                      dark:text-amber-400
                      drop-shadow-sm
                    "
                  />
                </div>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  No Completed Tasks Yet
                </h3>

                <p className="text-sm max-w-xs mx-auto text-gray-500 dark:text-zinc-400">
                  Start completing tasks and they'll appear here!
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

export default CompletedTasks;
