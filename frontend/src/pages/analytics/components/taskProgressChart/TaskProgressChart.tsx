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

const data = [
  { day: "Mon", completed: 12, inProgress: 8, pending: 5 },
  { day: "Tue", completed: 15, inProgress: 6, pending: 4 },
  { day: "Wed", completed: 10, inProgress: 9, pending: 6 },
  { day: "Thu", completed: 18, inProgress: 7, pending: 3 },
  { day: "Fri", completed: 14, inProgress: 5, pending: 7 },
  { day: "Sat", completed: 8, inProgress: 4, pending: 2 },
  { day: "Sun", completed: 6, inProgress: 3, pending: 1 },
];

export function TaskProgressChart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <h2 className="text-lg font-semibold text-slate-900 mb-6">
        Weekly Task Progress
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
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
          />
          <Bar
            dataKey="inProgress"
            stackId="a"
            fill="#f59e0b"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="pending"
            stackId="a"
            fill="#6b7280"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
