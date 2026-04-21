import React from 'react';
import { Search, Bell, Menu, Plus } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

export default function Header({ onMenuClick, title }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-slate-600" />
        </button>
        
        <div className="relative w-96 hidden md:block">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Search className="w-4 h-4 text-slate-400" />
          </span>
          <input 
            type="text" 
            placeholder="Tìm kiếm nội dung, bài đăng..." 
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full bg-slate-50 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900">Nguyễn Minh</p>
            <p className="text-xs text-slate-500">Manager</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">NM</div>
        </div>
      </div>
    </header>
  );
}
