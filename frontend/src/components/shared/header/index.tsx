import { Bell, ChevronDown, Plus, Search, Settings } from "lucide-react";
import logoMark from "@/assets/logo-mark.png";

const navItems = [
  { label: "Dashboard", active: true },
  { label: "My Tasks" },
  { label: "Projects" },
  { label: "Team" },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white backdrop-blur">
      <div className="max-w-screen-2xl mx-auto h-14 px-6 flex items-center gap-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img
            src={logoMark}
            alt="Taskly logo"
            className="w-7 h-7 rounded-lg"
          />
          <span className="text-lg font-bold tracking-tight text-gray-900">
            Taskly
          </span>
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                item.active
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Search */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-4 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* New Task */}
          <button className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 active:scale-95 transition-all duration-200">
            <Plus className="w-4 h-4" />
            New Task
          </button>

          {/* Icon Buttons */}
          {[Settings, Bell].map((Icon, i) => (
            <button
              key={i}
              className="relative flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 active:scale-95 transition-all duration-200"
            >
              <Icon className="w-4 h-4" />
              {Icon === Bell && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-teal-500 rounded-full" />
              )}
            </button>
          ))}

          {/* Divider */}
          <div className="w-px h-6 bg-gray-200 mx-1" />

          {/* Avatar */}
          <button className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 active:scale-95 transition-all duration-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-xs font-bold text-white">
              JD
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-900">
              John D.
            </span>
            <ChevronDown className="hidden md:block w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
