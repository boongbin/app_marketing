import React, { useState } from 'react';
import { MOCK_TASKS } from '../mockData';
import { cn } from '../lib/utils';
import { TaskStatus } from '../types';
import { Plus, CheckCircle2, Clock, AlertCircle, Calendar, Filter, Trash2 } from 'lucide-react';

export default function TaskManager() {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [filter, setFilter] = useState<TaskStatus | 'All'>('All');

  const filteredTasks = tasks.filter(t => filter === 'All' || t.status === filter);

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'Hoàn thành': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'Đang làm': return <Clock className="w-5 h-5 text-primary-500" />;
      case 'Quá hạn': return <AlertCircle className="w-5 h-5 text-rose-500" />;
      default: return <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>;
    }
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return { 
          ...t, 
          status: t.status === 'Hoàn thành' ? 'Chưa làm' : 'Hoàn thành' 
        };
      }
      return t;
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-5 duration-500">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-display font-bold text-slate-800">Việc cần làm</h3>
        <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-2xl font-bold shadow-lg shadow-primary-500/20 active:scale-95 transition-all">
          <Plus className="w-5 h-5" />
          Mới
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {['All', 'Chưa làm', 'Đang làm', 'Hoàn thành', 'Quá hạn'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-semibold border transition-all whitespace-nowrap",
              filter === f 
                ? "bg-slate-800 text-white border-slate-800 shadow-md" 
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
            )}
          >
            {f === 'All' ? 'Tất cả' : f}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div 
              key={task.id} 
              className={cn(
                "group bg-white p-4 rounded-2xl shadow-sm border border-slate-200 transition-all hover:bg-slate-50 flex items-center justify-between",
                task.status === 'Hoàn thành' && "opacity-60"
              )}
            >
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  checked={task.status === 'Hoàn thành'}
                  onChange={() => toggleTaskStatus(task.id)}
                  className="mt-1 rounded border-slate-300 accent-indigo-600"
                />
                <div>
                  <p className={cn("text-sm font-medium text-slate-900", task.status === 'Hoàn thành' && "line-through")}>
                    {task.title}
                  </p>
                  <p className={cn(
                    "text-[10px] font-bold uppercase",
                    task.status === 'Quá hạn' ? "text-red-500" : "text-slate-400"
                  )}>
                    {task.status === 'Quá hạn' ? 'Hết hạn hôm nay' : `Hạn: ${task.deadline}`}
                  </p>
                </div>
              </div>
              
              <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <CheckCircle2 className="w-12 h-12 text-slate-100 mx-auto mb-4" />
            <p className="text-slate-400 font-bold font-display uppercase tracking-widest text-xs">Mọi thứ đã xong!</p>
          </div>
        )}
        <button className="w-full py-3 border-2 border-dashed border-slate-200 text-slate-400 rounded-2xl text-xs font-bold hover:border-indigo-300 hover:text-indigo-500 transition-all">
          + THÊM CÔNG VIỆC MỚI
        </button>
      </div>

      {tasks.some(t => t.status === 'Quá hạn') && (
        <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <h5 className="font-bold text-rose-800 text-sm">Cảnh báo công việc!</h5>
            <p className="text-xs text-rose-600 leading-relaxed mt-1">
              Hệ thống ghi nhận bạn có <strong>{tasks.filter(t => t.status === 'Quá hạn').length} công việc quá hạn</strong>. 
              Hãy ưu tiên hoàn thành sớm để không ảnh hưởng tới tiến độ chiến dịch.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
