import type { LucideIcon } from "lucide-react";

interface TaskStatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

export function TaskStatCard({
  title,
  value,
  icon: Icon,
  iconColor,
  iconBg,
}: TaskStatCardProps) {
  return (
    <div className="rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <p className=" text-sm mb-2">{title}</p>
          <h3 className="text-3xl font-semibold ">{value}</h3>
        </div>
        <div
          className={`w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center`}
        >
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
