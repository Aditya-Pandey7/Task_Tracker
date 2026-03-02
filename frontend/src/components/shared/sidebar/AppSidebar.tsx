import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Home,
  Film,
  Tv,
  LogOut,
  CheckCircle2,
  Calendar,
  CalendarClock,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLogout } from "@/hooks/query_hook";

function AppSidebar() {
  const { mutate } = useLogout();

  const handleLogout = () => {
    mutate();
  };
  const menuItems = [
    { title: "DASHBOARD", icon: Home, path: "/" },
    { title: "TODAY", icon: Calendar, path: "/today" },
    { title: "UPCOMING", icon: CalendarClock, path: "/upcoming" },
    { title: "COMPLETED", icon: CheckCircle2, path: "/completed" },
    { title: "ANALYTICS", icon: Film, path: "/analytics" },
    { title: "PROFILE", icon: Tv, path: "/me" },
  ];

  return (
    <Sidebar
      variant="sidebar"
      side="left"
      className="border-r border-foreground bg-background"
    >
      {/* Header */}
      <SidebarHeader className="px-6 py-10 flex flex-col gap-2 border-b border-foreground bg-background">
        <div className="flex items-center gap-3">
          <img
            src="/src/assets/logo-mark.png"
            alt="Taskly Logo"
            className="w-6 h-6  "
          />
          <h1 className="text-xl font-black uppercase tracking-tighter">
            TASKLY.
          </h1>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          PRODUCTIVITY SYSTEM v1.0
        </p>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="px-0 py-6 bg-background">
        <SidebarGroup className="space-y-0 p-0">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `group relative flex items-center gap-4 px-8 py-4 text-[11px] font-black uppercase tracking-widest transition-all
                  ${
                    isActive
                      ? "bg-foreground text-background"
                      : "text-foreground hover:bg-muted"
                  } border-b border-foreground/10 last:border-0`
                }
              >
                <Icon
                  size={16}
                  className="transition-transform group-hover:rotate-12"
                />
                <span>{item.title}</span>
                <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </NavLink>
            );
          })}
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-0 border-t border-foreground bg-background">
        <button
          className="flex w-full items-center gap-4 px-8 py-6 text-[11px] font-black uppercase tracking-widest text-foreground hover:bg-destructive hover:text-white transition-all"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          <span>LOGOUT</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
