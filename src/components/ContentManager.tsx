import React, { useState } from 'react';
import { 
  Search, Filter, Plus, MoreVertical, 
  FileEdit, Trash2, Copy, Eye,
  Sparkles, Send, Type, AlignLeft, MessageSquarePlus
} from 'lucide-react';
import { MOCK_CONTENT } from '../mockData';
import { ContentItem, Platform, ContentStatus } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function ContentManager() {
  const [contents, setContents] = useState<ContentItem[]>(MOCK_CONTENT);
  const [filterPlatform, setFilterPlatform] = useState<Platform | 'All'>('All');
  const [filterStatus, setFilterStatus] = useState<ContentStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiResult, setAiResult] = useState('');

  const filteredContents = contents.filter(item => {
    const matchPlatform = filterPlatform === 'All' || item.platform === filterPlatform;
    const matchStatus = filterStatus === 'All' || item.status === filterStatus;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.product.toLowerCase().includes(searchQuery.toLowerCase());
    return matchPlatform && matchStatus && matchSearch;
  });

  const getStatusColor = (status: ContentStatus) => {
    switch (status) {
      case 'Đã đăng': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Đã lên lịch': return 'bg-primary-50 text-primary-600 border-primary-100';
      case 'Đã duyệt': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'Chờ duyệt': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const simulateAiTool = (tool: string) => {
    setIsAiModalOpen(true);
    setAiResult('Đang xử lý với AI...');
    setTimeout(() => {
      switch (tool) {
        case 'idea':
          setAiResult("Gợi ý 5 ý tưởng nội dung Hè:\n1. Top 5 món đồ không thể thiếu khi đi biển.\n2. Phối đồ layering mùa hè cho nam giới.\n3. Feedback 'đập hộp' BST mới nhất.\n4. Livestream thử đồ tại cửa hàng.\n5. Game nhỏ: Chọn màu áo, đoán tính cách.");
          break;
        case 'caption':
          setAiResult("Caption mẫu: 'Nắng gắt đã có M-PRO lo! ☀️ Chill ngày hè với chất vải linen cực mát và form dáng basic cực đỉnh. Đừng quên chương trình Mua 1 Tặng 1 vẫn đang diễn ra hết tuần này bạn nhé! #MPRO #HèRựcRỡ #LinenStyle'");
          break;
        case 'hook':
          setAiResult("5 Hook thu hút:\n1. Đừng mua Linen nếu bạn chưa xem hết clip này!\n2. 90% mọi người đang mặc sai size áo, còn bạn?\n3. Bí mật đằng sau vẻ ngoài 'sang-xịn-mịn' của các Fashionista...\n4. Chỉ 199k cho một diện mạo mới, tin được không?\n5. Bạn có thuộc team 'nghiện' màu trung tính?");
          break;
        default:
          setAiResult("Đã tối ưu hóa nội dung của bạn thành công.");
      }
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Tìm nội dung..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 w-full sm:w-64"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-1 rounded-lg flex">
            <button 
              onClick={() => setViewMode('grid')}
              className={cn("px-3 py-1.5 rounded-md text-xs font-medium transition-all", viewMode === 'grid' ? "bg-white shadow-sm text-primary-600" : "text-slate-600")}
            >
              Lưới
            </button>
            <button 
              onClick={() => setViewMode('table')}
              className={cn("px-3 py-1.5 rounded-md text-xs font-medium transition-all", viewMode === 'table' ? "bg-white shadow-sm text-primary-600" : "text-slate-600")}
            >
              Bảng
            </button>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">
            <Plus className="w-4 h-4" />
            <span>Thêm bài mới</span>
          </button>
        </div>
      </div>

      {/* AI Tools Bar */}
      <div className="bg-indigo-600 text-white rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between shadow-xl shadow-indigo-100 gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-500 p-2.5 rounded-xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-lg">Trợ lý AI đang sẵn sàng</p>
            <p className="text-sm text-indigo-100">Cần ý tưởng hay caption? Hãy để AI hỗ trợ bạn ngay lập tức.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => simulateAiTool('idea')} className="px-5 py-2.5 bg-white text-indigo-600 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all active:scale-95">
            Tạo ý tưởng
          </button>
          <button onClick={() => simulateAiTool('caption')} className="px-5 py-2.5 bg-indigo-500 text-white rounded-xl text-sm font-bold hover:bg-indigo-400 transition-all active:scale-95">
            Viết Caption
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredContents.map((item) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={item.id} 
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all group p-5 flex flex-col gap-4"
            >
              <div className="flex justify-between items-start">
                <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded inline-flex items-center gap-1.5", 
                  item.status === 'Đã đăng' ? "bg-emerald-50 text-emerald-600" :
                  item.status === 'Chờ duyệt' ? "bg-orange-50 text-orange-500" :
                  item.status === 'Đã lên lịch' ? "bg-indigo-50 text-indigo-600" :
                  "bg-slate-50 text-slate-400"
                )}>
                  <span className={cn("w-1.5 h-1.5 rounded-full",
                    item.status === 'Đã đăng' ? "bg-emerald-500" :
                    item.status === 'Chờ duyệt' ? "bg-orange-400" :
                    item.status === 'Đã lên lịch' ? "bg-indigo-500" :
                    "bg-slate-300"
                  )}></span>
                  {item.status}
                </span>
                <span className={cn("px-2 py-1 text-[10px] rounded uppercase font-bold", 
                  item.platform === 'Facebook' ? "bg-blue-50 text-blue-600" :
                  item.platform === 'Instagram' ? "bg-pink-50 text-pink-600" :
                  "bg-slate-900 text-white"
                )}>{item.platform}</span>
              </div>
              
              <h3 className="font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-sm text-slate-500 line-clamp-2 italic leading-relaxed">
                {item.body}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-200">
                    {item.assignee.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900 leading-none">{item.assignee}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">Sáng tạo</span>
                  </div>
                </div>
                <span className="text-xs text-slate-400 italic">{item.scheduledDate}</span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] text-slate-400 uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Tiêu đề</th>
                <th className="px-6 py-4">Nền tảng</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4">Ngày đăng</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-50">
              {filteredContents.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                  <td className="px-6 py-4 font-medium text-slate-900">{item.title}</td>
                  <td className="px-6 py-4">
                    <span className={cn("px-2 py-1 text-[10px] rounded uppercase font-bold", 
                      item.platform === 'Facebook' ? "bg-blue-50 text-blue-600" :
                      item.platform === 'Instagram' ? "bg-pink-50 text-pink-600" :
                      "bg-slate-900 text-white"
                    )}>{item.platform}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("flex items-center gap-1.5 font-medium", 
                      item.status === 'Đã đăng' ? "text-emerald-600" :
                      item.status === 'Chờ duyệt' ? "text-orange-500" :
                      item.status === 'Đã lên lịch' ? "text-indigo-600" :
                      "text-slate-400"
                    )}>
                      <span className={cn("w-1.5 h-1.5 rounded-full",
                        item.status === 'Đã đăng' ? "bg-emerald-500" :
                        item.status === 'Chờ duyệt' ? "bg-orange-400" :
                        item.status === 'Đã lên lịch' ? "bg-indigo-500" :
                        "bg-slate-300"
                      )}></span>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 italic">{item.scheduledDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* AI Simulation Modal */}
      <AnimatePresence>
        {isAiModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsAiModalOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden overflow-y-auto max-h-[80vh]"
            >
              <div className="bg-gradient-to-r from-primary-600 to-indigo-600 p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  <h3 className="font-display font-bold text-lg">Kết quả từ AI</h3>
                </div>
                <button onClick={() => setIsAiModalOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 whitespace-pre-line text-slate-700 leading-relaxed font-sans">
                  {aiResult}
                </div>
                <div className="mt-8 flex gap-4">
                  <button 
                    onClick={() => {
                       navigator.clipboard.writeText(aiResult);
                       alert("Đã copy vào bộ nhớ tạm!");
                    }}
                    className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
                  >
                    Sao chép & Sử dụng
                  </button>
                  <button 
                    onClick={() => setIsAiModalOpen(false)}
                    className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
