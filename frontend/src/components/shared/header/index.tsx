import {
  Sun,
  Moon,
  ChevronDown,
  LogOutIcon,
  Plus,
  Search,
  UserIcon,
} from "lucide-react";
import { useAppSelector } from "@/store";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useLogout } from "@/hooks/query_hook";
import { useTheme } from "@/context/theme/ThemeContext";
import { useState } from "react";
import { CreateTaskDialog } from "../CreateTaskDialog";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { mutate } = useLogout();
  const handleLogout = () => {
    mutate();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-foreground bg-background">
      <div className="max-w-screen-2xl mx-auto h-16 px-6 flex items-center justify-between gap-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 brutalist-border bg-foreground flex items-center justify-center transition-transform group-hover:rotate-12">
            <div className="w-4 h-4 bg-background rounded-full" />
          </div>
          <span className="text-xl font-black uppercase tracking-tighter">
            Taskly.
          </span>
        </a>

        {/* Search */}
        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="SEARCH TASKS OR GOALS..."
              className="w-full bg-background border border-foreground pl-12 pr-4 py-2.5 text-xs font-bold uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-foreground transition-all"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button
            className="flex items-center rounded-sm gap-2 px-4 py-2 bg-foreground text-background text-xs font-bold uppercase tracking-widest hover:invert transition-all active:scale-95"
            onClick={() => setOpen(true)}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Task</span>
          </button>

          <CreateTaskDialog isOpen={open} onClose={() => setOpen(false)} />

          <button
            className="w-10 h-10 rounded-sm border border-foreground flex items-center justify-center hover:bg-muted transition-all active:scale-95"
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>

          {/* User Menu */}
          {!isAuthenticated ? (
            <Link to="/login">
              <button className="px-4 py-2 rounded-sm border border-foreground text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-all">
                Login
              </button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1 border border-foreground hover:bg-muted transition-all">
                  <div className="w-8 h-8 bg-foreground flex items-center justify-center text-background text-xs font-black">
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-none border-foreground">
                <DropdownMenuLabel className="uppercase text-[10px] tracking-widest text-muted-foreground">
                  Account
                </DropdownMenuLabel>
                <Link to="/me">
                  <DropdownMenuItem className="focus:bg-foreground focus:text-background rounded-none cursor-pointer uppercase text-xs font-bold">
                    <UserIcon className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator className="bg-foreground" />
                <DropdownMenuItem
                  className="focus:bg-destructive focus:text-white rounded-none cursor-pointer uppercase text-xs font-bold"
                  onClick={handleLogout}
                >
                  <LogOutIcon className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
