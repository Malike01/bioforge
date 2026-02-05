import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Dna,
  Microscope,
  Database,
  Settings,
  BookOpen,
  Lock,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils"; // Shadcn utility
import { APP_CONTENT } from "@/constant/appConstants";
import { PATHS } from "@/router/paths";

export function AppSidebar() {
  const location = useLocation();

  const menuItems = [
    {
      label: APP_CONTENT.menu.dashboard,
      icon: LayoutDashboard,
      path: PATHS.dashboard.root,
      disabled: true,
    },
    {
      label: APP_CONTENT.menu.design,
      icon: Dna,
      path: PATHS.design,
      disabled: false,
    },
    {
      label: APP_CONTENT.menu.simulation,
      icon: Microscope,
      path: PATHS.simulation,
      disabled: true, // Phase 2
      badge: "Beta",
    },
    {
      label: APP_CONTENT.menu.lims,
      icon: Database,
      path: PATHS.lims,
      disabled: true, // Phase 3
    },
  ];

  return (
    <aside className="h-screen w-64 bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 z-40 shadow-sm">
      {/* 1. LOGO */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <div className="flex items-center gap-2 font-bold text-lg text-slate-900 tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-indigo-200 shadow-md">
            <Zap size={18} fill="currentColor" />
          </div>
          BioForge
        </div>
      </div>

      {/* 2. MENÜ */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
          Platform
        </div>

        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.disabled ? "#" : item.path}
            onClick={(e) => item.disabled && e.preventDefault()}
            className={({ isActive }) =>
              cn(
                "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                !item.disabled && isActive
                  ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                item.disabled &&
                  "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-slate-600",
              )
            }
          >
            <div className="flex items-center gap-3">
              <item.icon size={18} strokeWidth={2} />
              {item.label}
            </div>

            {item.disabled ? (
              <Lock size={14} className="text-slate-400" />
            ) : item.badge ? (
              <span className="bg-indigo-100 text-indigo-600 text-[10px] px-1.5 py-0.5 rounded font-bold">
                {item.badge}
              </span>
            ) : null}
          </NavLink>
        ))}
      </nav>

      {/* 3.Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <nav className="space-y-1 mb-4">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors">
            <BookOpen size={18} />
            {APP_CONTENT.menu.help}
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors">
            <Settings size={18} />
            {APP_CONTENT.menu.settings}
          </button>
        </nav>

        <div className="flex items-center gap-3 pt-2 pl-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white shadow-sm">
            DW
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-700">
              {APP_CONTENT.menu.userProfile}
            </span>
            <span className="text-xs text-slate-500">Pro License</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
