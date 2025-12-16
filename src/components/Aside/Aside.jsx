import { useState } from "react";
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  UserPlus,
  Settings,
  FileText,
  LogOut,
  Menu,
  ChevronLeft,
} from "lucide-react";

export default function Aside() {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
    { label: "Add Request", icon: UserPlus, to: "/dashboard/add-request" },
    { label: "Reports", icon: FileText, to: "/dashboard/reports" },
    { label: "Settings", icon: Settings, to: "/dashboard/settings" },
  ];

  return (
    <aside
      className={`h-screen bg-slate-900 text-slate-100 flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
        {!collapsed && (
          <h1 className="text-lg font-semibold tracking-wide">Admin Panel</h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-slate-800 transition"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition
              ${
                isActive
                  ? "bg-slate-800 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            <item.icon size={20} className="shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-2 py-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium hover:bg-red-500/10 hover:text-red-400 transition">
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}