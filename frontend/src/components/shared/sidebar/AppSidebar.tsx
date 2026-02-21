import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Home, Film, Tv, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

function AppSidebar() {
  const menuItems = [
    { title: "Dashboard", icon: Home, path: "/" },
    { title: "Analytics", icon: Film, path: "/analytics" },
    { title: "Profile", icon: Tv, path: "/me" },
  ];

  return (
    <Sidebar className="border-r bg-background" variant="inset" side="left">
      {/* Header */}
      <SidebarHeader className="p-6 text-xl font-bold">
        🎬 MovieApp
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="px-4">
        <SidebarGroup className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-2 transition-all 
                  ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 border-t">
        <button className="flex items-center gap-2 text-sm hover:text-destructive transition">
          <LogOut size={16} />
          Logout
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
