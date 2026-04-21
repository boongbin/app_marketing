import React from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Facebook,
  Instagram,
  Music2,
  Globe
} from 'lucide-react';
import { MOCK_CONTENT } from '../mockData';
import { cn } from '../lib/utils';
import { Platform, ContentStatus } from '../types';

export default function CalendarManager() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case 'Facebook': return <Facebook className="w-3 h-3 text-blue-600" />;
      case 'Instagram': return <Instagram className="w-3 h-3 text-pink-600" />;
      case 'TikTok': return <Music2 className="w-3 h-3 text-slate-800" />;
      default: return <Globe className="w-3 h-3 text-emerald-600" />;
    }
  };

  const getStatusBg = (status: ContentStatus) => {
    switch (status) {
      case 'Đã đăng': return 'bg-emerald-100';
      case 'Đã lên lịch': return 'bg-primary-100';
      case 'Đã duyệt': return 'bg-indigo-100';
      case 'Chờ duyệt': return 'bg-amber-100';
      default: return 'bg-slate-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-display font-bold text-slate-800">Tháng 03, 2024</h3>
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1">
            <button className="p-1.5 hover:bg-slate-50 rounded text-slate-400"><ChevronLeft className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-slate-50 rounded text-slate-400"><ChevronRight className="w-4 h-4" /></button>
          </div>
          <button className="text-sm font-medium text-primary-600 px-3 py-1 bg-primary-50 rounded-lg">Hôm nay</button>
        </div>
        <div className="flex items-center gap-3">
          <select className="text-sm border-slate-200 rounded-lg bg-white px-3 py-1.5 focus:outline-none">
            <option>Tất cả nền tảng</option>
            <option>Facebook</option>
            <option>Instagram</option>
          </select>
          <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">
            <Plus className="w-4 h-4" />
            <span>Thêm bài</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="calendar-grid border-b border-slate-200">
          {weekDays.map(day => (
            <div key={day} className="py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-grid">
          {/* Empty days padding */}
          <div className="min-h-[140px] border-r border-b border-slate-100 bg-slate-50/30"></div>
          <div className="min-h-[140px] border-r border-b border-slate-100 bg-slate-50/30"></div>
          <div className="min-h-[140px] border-r border-b border-slate-100 bg-slate-50/30"></div>
          <div className="min-h-[140px] border-r border-b border-slate-100 bg-slate-50/30"></div>
          
          {days.map(day => {
            const dateStr = `2024-03-${String(day).padStart(2, '0')}`;
            const posts = MOCK_CONTENT.filter(p => p.scheduledDate === dateStr);
            
            return (
              <div key={day} className="min-h-[140px] p-3 border-r border-b border-slate-100 hover:bg-slate-50/50 transition-colors group relative">
                <span className={cn(
                  "text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full mb-2 transition-colors",
                  day === 21 ? "bg-primary-600 text-white" : "text-slate-600 group-hover:bg-slate-200"
                )}>
                  {day}
                </span>

                <div className="space-y-1 overflow-hidden">
                  {posts.map(post => (
                    <div 
                      key={post.id} 
                      className={cn(
                        "p-1.5 rounded-lg border border-transparent hover:border-slate-300 transition-all cursor-pointer truncate flex items-center gap-1.5 shadow-sm",
                        getStatusBg(post.status)
                      )}
                    >
                      {getPlatformIcon(post.platform)}
                      <span className="text-[10px] font-semibold text-slate-700 truncate">{post.title}</span>
                    </div>
                  ))}
                </div>

                {posts.length === 0 && (
                  <button className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center pointer-events-none transition-opacity">
                    <div className="bg-primary-600 text-white p-2 rounded-full shadow-lg pointer-events-auto active:scale-90 transition-transform">
                      <Plus className="w-4 h-4" />
                    </div>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-6 p-4 bg-slate-100/50 rounded-2xl border border-slate-200">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng thái:</span>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200"></div>
          <span className="text-xs font-medium text-slate-600">Đã đăng</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-primary-100 border border-primary-200"></div>
          <span className="text-xs font-medium text-slate-600">Đã lên lịch</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-amber-100 border border-amber-200"></div>
          <span className="text-xs font-medium text-slate-600">Chờ duyệt</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-slate-200 border border-slate-300"></div>
          <span className="text-xs font-medium text-slate-600">Nháp</span>
        </div>
      </div>
    </div>
  );
}
