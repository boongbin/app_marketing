export type Platform = 'Facebook' | 'Instagram' | 'TikTok' | 'Google Business';
export type ContentType = 'Bán hàng' | 'Kiến thức' | 'Feedback' | 'Hậu trường' | 'Ưu đãi' | 'Thông báo';
export type ContentStatus = 'Nháp' | 'Chờ duyệt' | 'Đã duyệt' | 'Đã lên lịch' | 'Đã đăng';
export type CampaignStatus = 'Chuẩn bị' | 'Đang chạy' | 'Hoàn thành' | 'Tạm dừng';
export type TaskStatus = 'Chưa làm' | 'Đang làm' | 'Hoàn thành' | 'Quá hạn';

export interface ContentItem {
  id: string;
  title: string;
  platform: Platform;
  type: ContentType;
  product: string;
  goal: string;
  audience: string;
  hook: string;
  body: string;
  cta: string;
  keywords: string[];
  status: ContentStatus;
  assignee: string;
  createdAt: string;
  scheduledDate: string;
  campaignId?: string;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  goal: string;
  platforms: Platform[];
  budget: number;
  kpi: number;
  currentProgress: number;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  manager: string;
}

export interface MetricData {
  date: string;
  reach: number;
  engagement: number;
  clicks: number;
  inbox: number;
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  deadline: string;
}
