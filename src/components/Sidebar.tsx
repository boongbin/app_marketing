import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  Megaphone, 
  BarChart3, 
  CheckSquare, 
  Settings,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'content', label: 'Kho nội dung', icon: FileText },
    { id: 'calendar', label: 'Lịch đăng bài', icon: Calendar },
    { id: 'campaigns', label: 'Chiến dịch', icon: Megaphone },
    { id: 'analytics', label: 'Phân tích', icon: BarChart3 },
    { id: 'tasks', label: 'Công việc', icon: CheckSquare },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full bg-white border-r border-slate-200 z-50 w-60 transition-transform duration-300 lg:translate-x-0 overflow-y-auto flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              M
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">MarketerPro</h1>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-500 hover:text-slate-800">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-4 px-4 space-y-1 flex-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 font-medium",
                activeTab === item.id 
                  ? "bg-indigo-50 text-indigo-700" 
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-indigo-600" : "text-slate-400")} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="bg-slate-900 text-white rounded-xl p-4">
            <p className="text-[10px] text-slate-400 mb-1 uppercase font-bold tracking-wider">Gói Pro</p>
            <p className="text-sm mb-3">Dùng AI không giới hạn</p>
            <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-xs font-semibold transition-colors">
              Nâng cấp ngay
            </button>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200 text-sm">
              NM
            </div>
            <div className="flex flex-col truncate">
              <span className="text-sm font-bold text-slate-900">Nguyễn Minh</span>
              <span className="text-xs text-slate-500 truncate">Manager</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
