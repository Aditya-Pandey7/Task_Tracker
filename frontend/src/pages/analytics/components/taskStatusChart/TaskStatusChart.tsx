import type { ITaskData } from "@/sharedType";
import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = ["#10b981", "#3b82f6", "#6b7280", "#ef4444"];

interface TaskStatusChartProps {
  tasks: ITaskData[] | undefined;
}

export function TaskStatusChart({ tasks }: TaskStatusChartProps) {
  const chartData = useMemo(() => {
    if (!tasks || tasks.length === 0) {
      return [
        { name: "Completed", value: 0 },
        { name: "On Track", value: 0 },
        { name: "Not Started", value: 0 },
        { name: "Off Track", value: 0 },
      ];
    }

    const completed = tasks.filter((t) => t.isCompleted).length;
    const onTrack = tasks.filter(
      (t) => !t.isCompleted && t.status === "on track",
    ).length;
    const notStarted = tasks.filter(
      (t) => !t.isCompleted && t.status === "not started",
    ).length;
    const offTrack = tasks.filter(
      (t) => !t.isCompleted && t.status === "off track",
    ).length;

    return [
      { name: "Completed", value: completed },
      { name: "On Track", value: onTrack },
      { name: "Not Started", value: notStarted },
      { name: "Off Track", value: offTrack },
    ].filter((item) => item.value > 0);
  }, [tasks]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <h2 className="text-lg font-semibold text-slate-900 mb-6">
        Task Status Distribution
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
            }
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
