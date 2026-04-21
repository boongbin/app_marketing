import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  FileText, CheckCircle2, Clock, Megaphone, 
  TrendingUp, Users, MessageSquare, ArrowUpRight, ArrowDownRight 
} from 'lucide-react';
import { MOCK_CONTENT, MOCK_CAMPAIGNS, MOCK_METRICS } from '../mockData';
import { cn } from '../lib/utils';

const StatCard = ({ title, value, icon: Icon, trend, trendValue }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
    <div className="flex items-end gap-2">
      <span className="text-2xl font-bold text-slate-900">{value}</span>
      {trendValue && (
        <span className={cn(
          "text-xs font-semibold mb-1",
          trend === 'up' ? "text-emerald-600" : "text-rose-600"
        )}>
          {trendValue}
        </span>
      )}
    </div>
  </div>
);

export default function Dashboard() {
  const stats = [
    { title: 'Tổng nội dung', value: MOCK_CONTENT.length, icon: FileText, colorClass: 'bg-primary-500', trend: 'up', trendValue: '+12%' },
    { title: 'Bài đã đăng', value: MOCK_CONTENT.filter(c => c.status === 'Đã đăng').length, icon: CheckCircle2, colorClass: 'bg-emerald-500', trend: 'up', trendValue: '+8%' },
    { title: 'Chờ duyệt', value: MOCK_CONTENT.filter(c => c.status === 'Chờ duyệt').length, icon: Clock, colorClass: 'bg-amber-500', trend: 'down', trendValue: '-5%' },
    { title: 'Chiến dịch', value: MOCK_CAMPAIGNS.length, icon: Megaphone, colorClass: 'bg-indigo-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-lg text-slate-900">Hiệu quả tiếp cận</h3>
            <select className="text-sm border-slate-200 rounded-lg bg-slate-50 px-3 py-1.5 focus:outline-none">
              <option>7 ngày qua</option>
              <option>30 ngày qua</option>
            </select>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-500 mb-6">Thống kê lượt Reach & Engagement dựa trên dữ liệu thực tế.</p>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_METRICS}>
                  <defs>
                    <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 600}} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 600}} 
                  />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Area type="monotone" dataKey="reach" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorReach)" />
                  <Area type="monotone" dataKey="engagement" stroke="#10b981" strokeWidth={2} fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Content */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-lg text-slate-900">Nội dung hiệu quả</h3>
          </div>
          <div className="flex-1">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] text-slate-400 uppercase font-bold">
                <tr>
                  <th className="px-4 py-3">Tiêu đề</th>
                  <th className="px-4 py-3 text-right">Reach</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                {MOCK_CONTENT.slice(0, 4).map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors cursor-pointer">
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-800 truncate max-w-[120px]">{item.title}</span>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">{item.platform}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-600">+1.2k</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Campaigns */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-display font-bold text-slate-800 mb-6">Chiến dịch đang chạy</h3>
          <div className="space-y-6">
            {MOCK_CAMPAIGNS.map((camp, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-800">{camp.name}</span>
                  <span className="text-xs font-medium text-slate-500">{Math.round((camp.currentProgress / camp.kpi) * 100)}% mục tiêu</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-500 rounded-full transition-all duration-1000" 
                    style={{ width: `${Math.min((camp.currentProgress / camp.kpi) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Start: {camp.startDate}</span>
                  <span>End: {camp.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General Analytics Highlights */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-5 rounded-2xl shadow-lg shadow-primary-500/20 text-white">
            <Users className="w-8 h-8 opacity-50 mb-4" />
            <p className="text-xs opacity-80">Tiếp cận tháng này</p>
            <p className="text-2xl font-display font-bold">45.2k</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-primary-100">
              <TrendingUp className="w-3 h-3" />
              <span>+18.3% vs tháng trước</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <MessageSquare className="w-8 h-8 text-indigo-500 opacity-50 mb-4" />
            <p className="text-xs text-slate-500">Inbox mới</p>
            <p className="text-2xl font-display font-bold text-slate-800">284</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
              <ArrowUpRight className="w-3 h-3" />
              <span>+5.4%</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Người phụ trách hiệu quả nhất</p>
                <p className="text-lg font-display font-bold text-slate-800 mt-1">Lê Văn An</p>
              </div>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold">LA</div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-primary-100 flex items-center justify-center text-[10px] font-bold text-primary-600">+4</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
