import { ContentItem, Campaign, MetricData, Task } from './types';

export const MOCK_CONTENT: ContentItem[] = [
  {
    id: '1',
    title: 'Giới thiệu BST Hè 2024',
    platform: 'Facebook',
    type: 'Bán hàng',
    product: 'Thời trang Hè',
    goal: 'Tăng doanh số',
    audience: 'Gen Z, Millennials',
    hook: 'Nắng đã có mũ, hè đã có... BST mới siêu cháy từ M-PRO!',
    body: 'Khám phá ngay những thiết kế mới nhất mang đậm hơi thở mùa hè năng động...',
    cta: 'Mua ngay tại website hoặc nhắn tin trực tiếp để nhận ưu đãi 10%.',
    keywords: ['thời trang', 'mùa hè', 'new collection'],
    status: 'Đã đăng',
    assignee: 'Lê Văn An',
    createdAt: '2024-03-15',
    scheduledDate: '2024-03-20',
    campaignId: 'camp-1'
  },
  {
    id: '2',
    title: 'Tips phối đồ công sở không nhàm chán',
    platform: 'Instagram',
    type: 'Kiến thức',
    product: 'Vest & Sơ mi',
    goal: 'Tăng tương tác',
    audience: 'Dân văn phòng',
    hook: 'Làm sao để mỗi ngày đi làm đều là một sàn runway?',
    body: '3 công thức phối đồ đơn giản giúp bạn nâng cấp phong cách công sở chỉ trong 5 phút...',
    cta: 'Lưu ngay bài viết này nếu bạn thấy hữu ích nhé!',
    keywords: ['phối đồ', 'công sở', 'style tips'],
    status: 'Đã lên lịch',
    assignee: 'Nguyễn Thị Bình',
    createdAt: '2024-03-18',
    scheduledDate: '2024-03-25',
    campaignId: 'camp-1'
  },
  {
    id: '3',
    title: 'Feedback khách hàng về chất vải linen',
    platform: 'Facebook',
    type: 'Feedback',
    product: 'Đầm Linen',
    goal: 'Xây dựng lòng tin',
    audience: 'Phụ nữ 25-45',
    hook: 'Mát mẻ - Thấm hút - Sang trọng. Đó là những gì khách yêu nói về Linen nhà mình.',
    body: 'Cảm ơn chị Lan đã gửi tặng feedback cực kỳ tâm huyết cho BST Linen vừa qua...',
    cta: 'Xem thêm các sản phẩm Linen khác tại đây.',
    keywords: ['feedback', 'linen', 'khách hàng'],
    status: 'Đã duyệt',
    assignee: 'Trần Minh Cường',
    createdAt: '2024-03-20',
    scheduledDate: '2024-03-22'
  },
  {
    id: '4',
    title: 'Video Behind the Scenes chụp hình lookbook',
    platform: 'TikTok',
    type: 'Hậu trường',
    product: 'BST Sun-kissed',
    goal: 'Tăng nhận diện',
    audience: 'Giới trẻ',
    hook: '1 ngày làm mẫu ảnh của M-PRO có gì vui?',
    body: 'Cùng đột nhập hậu trường buổi chụp hình lookbook siêu hoành tráng của team mình nhé!',
    cta: 'Follow để xem thêm nhiều clip thú vị khác.',
    keywords: ['bts', 'studio', 'vlog'],
    status: 'Chờ duyệt',
    assignee: 'Lê Văn An',
    createdAt: '2024-03-21',
    scheduledDate: '2024-03-24'
  },
  {
    id: '5',
    title: 'Thông báo khai trương chi nhánh mới',
    platform: 'Google Business',
    type: 'Thông báo',
    product: 'Hệ thống cửa hàng',
    goal: 'Tăng traffic cửa hàng',
    audience: 'Khách khu vực lân cận',
    hook: 'Cửa hàng thứ 10 của M-PRO chính thức cập bến Quận 1!',
    body: 'Chào đón không gian mua sắm mới hiện đại và sang trọng hơn tại địa chỉ...',
    cta: 'Chỉ đường ngay để không bỏ lỡ ngày khai trương.',
    keywords: ['khai trương', 'chi nhánh mới', 'event'],
    status: 'Nháp',
    assignee: 'Nguyễn Thị Bình',
    createdAt: '2024-03-22',
    scheduledDate: '2024-04-01'
  },
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    name: 'Chào Hè Rực Rỡ 2024',
    description: 'Chiến dịch ra mắt BST thời trang hè và đẩy mạnh doanh thu quý 2.',
    goal: 'Doanh thu 2 tỷ, Reach 500k',
    platforms: ['Facebook', 'Instagram', 'TikTok'],
    budget: 200000000,
    kpi: 500000,
    currentProgress: 320000,
    startDate: '2024-03-01',
    endDate: '2024-05-31',
    status: 'Đang chạy',
    manager: 'Trần Minh Cường'
  },
  {
    id: 'camp-2',
    name: 'Retargeting Khách Hàng Cũ',
    description: 'Chăm sóc và kích cầu khách hàng đã từng mua hàng trong năm 2023.',
    goal: 'Lượt mua lại đạt 15%',
    platforms: ['Facebook', 'Google Business'],
    budget: 50000000,
    kpi: 1000,
    currentProgress: 450,
    startDate: '2024-03-15',
    endDate: '2024-04-15',
    status: 'Đang chạy',
    manager: 'Lê Văn An'
  }
];

export const MOCK_METRICS: MetricData[] = [
  { date: '2024-03-15', reach: 5000, engagement: 450, clicks: 120, inbox: 15 },
  { date: '2024-03-16', reach: 6200, engagement: 580, clicks: 180, inbox: 22 },
  { date: '2024-03-17', reach: 4800, engagement: 400, clicks: 90, inbox: 12 },
  { date: '2024-03-18', reach: 7500, engagement: 820, clicks: 250, inbox: 35 },
  { date: '2024-03-19', reach: 8100, engagement: 950, clicks: 310, inbox: 42 },
  { date: '2024-03-20', reach: 12000, engagement: 1400, clicks: 520, inbox: 68 },
  { date: '2024-03-21', reach: 9500, engagement: 1100, clicks: 380, inbox: 50 }
];

export const MOCK_TASKS: Task[] = [
  { id: '1', title: 'Lên outline nội dung tuần 4 tháng 3', status: 'Hoàn thành', deadline: '2024-03-20' },
  { id: '2', title: 'Duyệt bài đăng Facebook ngày 21/03', status: 'Hoàn thành', deadline: '2024-03-21' },
  { id: '3', title: 'Thiết kế banner chiến dịch Hè', status: 'Đang làm', deadline: '2024-03-24' },
  { id: '4', title: 'Báo cáo hiệu quả tuần 3', status: 'Chưa làm', deadline: '2024-03-25' },
  { id: '5', title: 'Quay video TikTok hậu trường', status: 'Quá hạn', deadline: '2024-03-19' }
];
