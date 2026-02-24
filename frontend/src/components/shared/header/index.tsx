import {
  Sun,
  ChevronDown,
  LogOutIcon,
  Plus,
  Search,
  Settings,
  UserIcon,
} from "lucide-react";
import logoMark from "@/assets/logo-mark.png";
import { useAppSelector } from "@/store";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLogout } from "@/hooks/query_hook";
import { useTheme } from "@/context/theme/ThemeContext";

const navItems = [
  { label: "Dashboard", active: true },
  { label: "My Tasks" },
  { label: "Projects" },
  { label: "Team" },
];

const Header = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { mutate } = useLogout();
  const handleLogout = () => {
    mutate();
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200  backdrop-blur">
      <div className="max-w-screen-2xl mx-auto h-14 px-6 flex items-center gap-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img
            src={logoMark}
            alt="Taskly logo"
            className="w-7 h-7 rounded-lg"
          />
          <span className="text-lg font-bold tracking-tight">Taskly</span>
        </a>
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all hover:text-black duration-200 ${
                item.active ? "bg-gray-100 text-black" : "hover:bg-gray-100"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        {/* Search */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full rounded-lg border  pl-9 pr-4 py-2   text-sm   transition-all duration-200  focus:outline-none  focus:ring-2 focus:ring-teal-500   
               /* Light theme */
               border-gray-200  bg-gray-50  text-gray-900  placeholder:text-gray-40
                /* Dark theme */ 
               dark:border-gray-700  dark:bg-gray-800  dark:text-gray-100  dark:placeholder:text-gray-400
  "
            />
          </div>
        </div>
        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* New Task */}
          <button className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-600 text-sm font-medium hover:bg-teal-700 active:scale-95 transition-all duration-200">
            <Plus className="w-4 h-4" />
            New Task
          </button>

          {/* Icon Buttons */}

          <button
            className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 hover:text-black active:scale-95 transition-all duration-200"
            onClick={toggleTheme}
          >
            <Sun className="w-4 h-4" />
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-200 mx-1" />

          {/* Avatar */}
          {!isAuthenticated ? (
            <Link to="/login">
              <Button className="cursor-pointer bg-teal-600 hover:bg-teal-700">
                Login
              </Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 active:scale-95 hover:text-black transition-all duration-200">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-xs font-bold">
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="hidden md:block text-sm font-medium">
                    {user?.username}
                  </span>
                  <ChevronDown className="hidden md:block w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <Link to="/me">
                  <DropdownMenuItem>
                    <UserIcon />
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                  <LogOutIcon />
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
