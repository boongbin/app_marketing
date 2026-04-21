/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ContentManager from './components/ContentManager';
import CalendarManager from './components/CalendarManager';
import CampaignManager from './components/CampaignManager';
import TaskManager from './components/TaskManager';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Bảng điều khiển';
      case 'content': return 'Kho nội dung Marketing';
      case 'calendar': return 'Lịch đăng bài';
      case 'campaigns': return 'Quản lý chiến dịch';
      case 'analytics': return 'Phân tích & Báo cáo';
      case 'tasks': return 'Danh sách công việc';
      default: return 'M-PRO Marketing';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'content': return <ContentManager />;
      case 'calendar': return <CalendarManager />;
      case 'campaigns': return <CampaignManager />;
      case 'tasks': return <TaskManager />;
      case 'analytics': return (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
           <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
           </div>
           <h3 className="text-xl font-display font-bold text-slate-800">Module Phân tích nâng cao</h3>
           <p className="text-slate-500 mt-2 max-w-md text-center">Báo cáo chi tiết đang được đồng bộ dữ liệu từ API. Dữ liệu tổng quan đã có thể xem tại trang chủ.</p>
        </div>
      );
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:pl-60">
        <Header 
          onMenuClick={() => setIsSidebarOpen(true)} 
          title={getTitle()} 
        />
        
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden pt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

