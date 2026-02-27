import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateTask } from "@/hooks/query_hook";
import { useForm, type SubmitHandler } from "react-hook-form";
import LoadingDialog from "@/components/shared/loadingDialog";

type FormData = {
  title: string;
  priority: string;
};

export function TaskInput() {
  const [priority, setPriority] = useState("medium");
  const { mutate: createTask, isPending } = useCreateTask();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (data.title.trim()) {
      console.log("Task added:", data.title, data.priority);
      createTask({ title: data.title, priority });
      reset();
      setPriority("medium");
    }
  };

  if (isPending) {
    return <LoadingDialog open={true} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex gap-3 ">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="What needs to be done today?"
            {...register("title", {
              required: "Task title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
              maxLength: {
                value: 100,
                message: "Title must be at most 100 characters",
              },
            })}
            className={`w-full h-14 text-lg px-6 border-2 ${errors.title ? "border-red-400" : "border-gray-200"} focus:border-indigo-400 rounded-2xl shadow-sm`}
          />
          <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
        </div>
        <Button
          type="submit"
          size="lg"
          className="h-14 px-8 rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600  shadow-2xl font-bold transition-all duration-300 hover:scale-105 "
        >
          <Plus className="size-5 " />
          Add Task
        </Button>
      </div>

      <div className="flex gap-3 items-center justify-center mb-12">
        <span className="text-sm  text-muted-foreground font-bold">
          Priority:
        </span>
        <div className="flex gap-3">
          {[
            {
              value: "low",
              label: "Low",
              color: "from-emerald-400 to-green-500",
            },
            {
              value: "medium",
              label: "Medium",
              color: "from-amber-400 to-orange-500",
            },
            { value: "high", label: "High", color: "from-rose-400 to-red-500" },
          ].map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setPriority(p.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                priority === p.value.toLowerCase()
                  ? priority === "low"
                    ? "bg-emerald-500 text-white shadow-md"
                    : priority === "medium"
                      ? "bg-amber-500 text-white shadow-md"
                      : "bg-rose-500 text-white shadow-md"
                  : "bg-white text-slate-600 hover:bg-slate-50 border"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
