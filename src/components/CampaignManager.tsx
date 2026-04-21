import React from 'react';
import { Megaphone, Target, DollarSign, Users, ArrowRight, Clock, CheckCircle2, PauseCircle } from 'lucide-react';
import { MOCK_CAMPAIGNS } from '../mockData';
import { cn } from '../lib/utils';
import { CampaignStatus } from '../types';

export default function CampaignManager() {
  const getStatusIcon = (status: CampaignStatus) => {
    switch (status) {
      case 'Đang chạy': return <Clock className="w-4 h-4 text-primary-600" />;
      case 'Hoàn thành': return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'Tạm dừng': return <PauseCircle className="w-4 h-4 text-slate-400" />;
      default: return <Clock className="w-4 h-4 text-amber-600" />;
    }
  };

  const getStatusClass = (status: CampaignStatus) => {
    switch (status) {
      case 'Đang chạy': return 'bg-primary-50 text-primary-600 border-primary-100';
      case 'Hoàn thành': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Tạm dừng': return 'bg-slate-50 text-slate-600 border-slate-100';
      default: return 'bg-amber-50 text-amber-600 border-amber-100';
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center shrink-0">
            <Megaphone className="w-7 h-7 text-primary-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Tổng chiến dịch</p>
            <p className="text-3xl font-display font-bold text-slate-800">12</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0">
            <Target className="w-7 h-7 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Hoàn thành KPI</p>
            <p className="text-3xl font-display font-bold text-slate-800">85%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
            <DollarSign className="w-7 h-7 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Ngân sách đã dùng</p>
            <p className="text-3xl font-display font-bold text-slate-800">1.2B</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-display font-bold text-slate-800 flex items-center gap-2">
          Danh sách chiến dịch
          <span className="text-sm font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">8</span>
        </h3>
        
        {MOCK_CAMPAIGNS.map((camp) => (
          <div key={camp.id} className="bg-white rounded-3xl border border-slate-200 p-6 hover:shadow-xl transition-all border-l-8 border-l-primary-500 group">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="lg:w-1/3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border flex items-center gap-1", getStatusClass(camp.status))}>
                    {getStatusIcon(camp.status)}
                    {camp.status}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{camp.startDate} - {camp.endDate}</span>
                </div>
                <h4 className="text-xl font-display font-bold text-slate-800 group-hover:text-primary-600 transition-colors">{camp.name}</h4>
                <p className="text-sm text-slate-500 line-clamp-2">{camp.description}</p>
              </div>

              <div className="lg:w-1/3 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-700">Tiến độ KPI</span>
                  <span className="text-primary-600 font-bold">{Math.round((camp.currentProgress / camp.kpi) * 100)}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full" 
                    style={{ width: `${(camp.currentProgress / camp.kpi) * 100}%` }}
                  ></div>
                </div>
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500">KPI: <strong>{camp.kpi.toLocaleString()} Reach</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500">Ngân sách: <strong>{camp.budget.toLocaleString()}đ</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex-1 lg:flex-none px-6 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl font-bold transition-colors text-sm border border-slate-200">
                  Chi tiết
                </button>
                <button className="flex-1 lg:flex-none px-6 py-2.5 bg-primary-50 hover:bg-primary-100 text-primary-600 rounded-xl font-bold transition-colors text-sm border border-primary-100 flex items-center justify-center gap-2 group">
                  Theo dõi
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
