import type { ITaskData } from "@/sharedType";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface TaskProgressChartProps {
  tasks: ITaskData[] | undefined;
}

export function TaskProgressChart({ tasks }: TaskProgressChartProps) {
  const chartData = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekData = days.map((day) => ({
      day,
      completed: 0,
      onTrack: 0,
      notStarted: 0,
    }));

    if (!tasks) return weekData;

    tasks.forEach((task) => {
      const taskDate = new Date(task.createdAt);
      const dayIndex = taskDate.getDay();

      if (task.isCompleted) {
        weekData[dayIndex].completed += 1;
      } else if (task.status === "on track") {
        weekData[dayIndex].onTrack += 1;
      } else {
        weekData[dayIndex].notStarted += 1;
      }
    });

    return weekData;
  }, [tasks]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <h2 className="text-lg font-semibold text-slate-900 mb-6">
        Weekly Task Progress
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="day" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar
            dataKey="completed"
            stackId="a"
            fill="#10b981"
            radius={[0, 0, 0, 0]}
            name="Completed"
          />
          <Bar
            dataKey="onTrack"
            stackId="a"
            fill="#3b82f6"
            radius={[0, 0, 0, 0]}
            name="On Track"
          />
          <Bar
            dataKey="notStarted"
            stackId="a"
            fill="#6b7280"
            radius={[8, 8, 0, 0]}
            name="Not Started"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
