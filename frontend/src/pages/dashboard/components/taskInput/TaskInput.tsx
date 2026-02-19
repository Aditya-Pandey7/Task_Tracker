import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TaskInput() {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      console.log("Task added:", taskText, priority);
      setTaskText("");
      setPriority("medium");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-3 border">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="What needs to be done today?"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            className="w-full h-14 text-lg px-6 border-2 border-gray-200 focus:border-indigo-400 rounded-2xl shadow-sm"
          />
          <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
        </div>
        <Button
          type="submit"
          size="lg"
          className="h-14 px-8 rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-200 transition-all duration-300 hover:scale-105"
        >
          <Plus className="size-5 mr-2" />
          Add Task
        </Button>
      </div>
      <div className="flex gap-3 items-center justify-center">
        <span className="text-sm font-medium text-gray-700">Priority:</span>
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
              className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                priority === p.value
                  ? `bg-gradient-to-r ${p.color} text-white shadow-lg scale-105`
                  : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
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
