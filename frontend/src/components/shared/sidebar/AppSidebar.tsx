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
import logoMark from "@/assets/logo-mark.png";
import { useLogout } from "@/hooks/query_hook";

function AppSidebar() {
  const { mutate } = useLogout();

  const handleLogout = () => {
    mutate();
  };
  const menuItems = [
    { title: "Dashboard", icon: Home, path: "/" },
    { title: "Today", icon: Calendar, path: "/today" },
    { title: "Upcoming", icon: CalendarClock, path: "/upcoming" },
    { title: "Completed", icon: CheckCircle2, path: "/completed" },
    { title: "Analytics", icon: Film, path: "/analytics" },
    { title: "Profile", icon: Tv, path: "/me" },
  ];

  return (
    <Sidebar
      variant="inset"
      side="left"
      className="border-r bg-background/80 backdrop-blur-xl"
    >
      {/* Header */}
      <SidebarHeader className="px-6 py-6 flex flex-row items-center gap-3 border-b">
        <div className="p-2 rounded-xl bg-primary/10">
          <img src={logoMark} alt="Taskly logo" className="w-5 h-5" />
        </div>

        <div>
          <h1 className="text-lg font-semibold tracking-tight">Taskly</h1>
          <p className="text-xs text-muted-foreground">Productivity App</p>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="px-4 py-6">
        <SidebarGroup className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`
                }
              >
                <Icon
                  size={18}
                  className="transition-transform group-hover:scale-105"
                />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 border-t">
        <button
          className="flex w-full items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          Logout
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
