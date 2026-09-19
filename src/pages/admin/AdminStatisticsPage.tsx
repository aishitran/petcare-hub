import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  BarChart3, 
  TrendingUp, 
  Heart, 
  Users, 
  Award, 
  Flame, 
  PieChart, 
  MapPin,
  ShieldCheck,
  Calendar,
  DollarSign,
  Activity,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface AdminStatisticsPageProps {
  navigate: (path: string) => void;
}

export const AdminStatisticsPage: React.FC<AdminStatisticsPageProps> = ({ navigate }) => {
  const { statistics, pets, users, applications, rescuePosts, foodFundCampaigns } = useData();
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  const [hoveredMonthIdx, setHoveredMonthIdx] = useState<number | null>(null);

  // Mock historical monthly data for charts
  const monthlyData = [
    { monthVi: 'Thg 1', monthEn: 'Jan', adoptions: 12, rescue: 8, donationM: 18, targetM: 20 },
    { monthVi: 'Thg 2', monthEn: 'Feb', adoptions: 18, rescue: 14, donationM: 25, targetM: 25 },
    { monthVi: 'Thg 3', monthEn: 'Mar', adoptions: 15, rescue: 11, donationM: 22, targetM: 30 },
    { monthVi: 'Thg 4', monthEn: 'Apr', adoptions: 24, rescue: 19, donationM: 35, targetM: 35 },
    { monthVi: 'Thg 5', monthEn: 'May', adoptions: 28, rescue: 22, donationM: 42, targetM: 40 },
    { monthVi: 'Thg 6', monthEn: 'Jun', adoptions: 34, rescue: 27, donationM: 50, targetM: 50 },
  ];

  const dogsCount = pets.filter(p => p.species === 'DOG').length;
  const catsCount = pets.filter(p => p.species === 'CAT').length;
  const otherCount = pets.filter(p => p.species !== 'DOG' && p.species !== 'CAT').length;

  const totalFundRaised = foodFundCampaigns.reduce((acc, c) => acc + c.currentAmount, 0);
  const totalFundTarget = foodFundCampaigns.reduce((acc, c) => acc + c.targetAmount, 0);

  return (
    <div className="space-y-8 text-left text-stone-100">
      
      {/* Header */}
      <div className="border-b border-stone-800 pb-4">
        <h1 className="text-2xl font-black text-white font-display">
          {isEn ? 'Platform Analytics & Community Impact' : 'Báo cáo & Thống kê Tác động Cộng đồng'}
        </h1>
        <p className="text-xs text-stone-400 mt-1">
          {isEn 
            ? 'Real-time performance metrics on adoptions, user verification, rescue response, and Food Power donations.' 
            : 'Dữ liệu phân tích nhận nuôi, tăng trưởng người dùng, tỷ lệ bàn giao và tiến độ gây quỹ lương thực.'}
        </p>
      </div>

      {/* Top 4 Impact KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI 1: Successful Adoptions */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-3xl space-y-2 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between text-stone-400 text-xs font-bold uppercase">
            <span>{isEn ? 'Successful Adoptions' : 'Tổng ca nhận nuôi thành công'}</span>
            <Award className="w-5 h-5 text-teal-400" />
          </div>
          <div className="text-4xl font-black text-white">{statistics.totalAdoptedPets}</div>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{isEn ? '+24% from last month' : 'Tăng 24% so với tháng trước'}</span>
          </p>
        </div>

        {/* KPI 2: Adoption Success Rate */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-3xl space-y-2 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between text-stone-400 text-xs font-bold uppercase">
            <span>{isEn ? 'Adoption Success Rate' : 'Tỷ lệ hoàn tất nhận nuôi'}</span>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-4xl font-black text-emerald-400">{statistics.successfulAdoptionRate}%</div>
          <p className="text-[11px] text-stone-400">
            {isEn ? `Based on ${applications.length} verified applications` : `Dựa trên ${applications.length} đơn đã thẩm định`}
          </p>
        </div>

        {/* KPI 3: Verified Users */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-3xl space-y-2 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between text-stone-400 text-xs font-bold uppercase">
            <span>{isEn ? 'Verified Members (ID)' : 'Thành viên đã xác minh'}</span>
            <ShieldCheck className="w-5 h-5 text-teal-400" />
          </div>
          <div className="text-4xl font-black text-white">{statistics.totalVerifiedUsers}</div>
          <p className="text-[11px] text-stone-400">
            {isEn 
              ? `${Math.round((statistics.totalVerifiedUsers / (users.length || 1)) * 100)}% of total user base`
              : `Chiếm ${Math.round((statistics.totalVerifiedUsers / (users.length || 1)) * 100)}% tổng người dùng`}
          </p>
        </div>

        {/* KPI 4: Total Donations */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-3xl space-y-2 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between text-stone-400 text-xs font-bold uppercase">
            <span>{isEn ? 'Food Power Fund Raised' : 'Tổng Quỹ Tiếp Sức Đã Huy Động'}</span>
            <DollarSign className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400">
            {(totalFundRaised / 1000000).toFixed(1)}M <span className="text-sm font-bold text-stone-400">VNĐ</span>
          </div>
          <p className="text-[11px] text-stone-400">
            {isEn ? `Goal: ${(totalFundTarget / 1000000).toFixed(0)}M VNĐ (${Math.round((totalFundRaised / (totalFundTarget || 1)) * 100)}%)` : `Mục tiêu: ${(totalFundTarget / 1000000).toFixed(0)}M VNĐ (${Math.round((totalFundRaised / (totalFundTarget || 1)) * 100)}%)`}
          </p>
        </div>

      </div>

      {/* INTERACTIVE CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* CHART 1: Monthly Adoptions & Rescues (8 cols) */}
        <div className="lg:col-span-8 bg-stone-900 border border-stone-800 p-6 rounded-3xl space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-teal-400" />
                <span>{t('admin.chartAdoptionTitle')} & {t('admin.chartRescueTitle')}</span>
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                {isEn ? 'Monthly comparisons of completed adoptions and rescue alerts' : 'Đối chiếu lượt nhận nuôi thành công và các ca cứu hộ qua từng tháng'}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-teal-500" />
                <span className="text-stone-300">{t('admin.adoptionsCount')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-rose-500" />
                <span className="text-stone-300">{t('admin.rescueCasesCount')}</span>
              </div>
            </div>
          </div>

          {/* Interactive Bar Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-4 sm:gap-6 pt-6 px-2 border-b border-stone-800 relative">
            
            {/* Horizontal Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-stone-700 w-full" />
              <div className="border-b border-stone-700 w-full" />
              <div className="border-b border-stone-700 w-full" />
              <div className="border-b border-stone-700 w-full" />
            </div>

            {monthlyData.map((d, idx) => {
              const maxVal = 40;
              const adoptHeight = (d.adoptions / maxVal) * 100;
              const rescueHeight = (d.rescue / maxVal) * 100;
              const isHovered = hoveredMonthIdx === idx;

              return (
                <div 
                  key={idx} 
                  className="flex-1 flex flex-col items-center gap-2 h-full justify-end relative group cursor-pointer z-10"
                  onMouseEnter={() => setHoveredMonthIdx(idx)}
                  onMouseLeave={() => setHoveredMonthIdx(null)}
                >
                  {/* Tooltip on Hover */}
                  {isHovered && (
                    <div className="absolute -top-14 bg-stone-950 border border-stone-700 text-stone-200 text-[11px] p-2 rounded-xl shadow-2xl z-30 whitespace-nowrap">
                      <div className="font-bold text-white mb-0.5">{isEn ? d.monthEn : d.monthVi}</div>
                      <div className="text-teal-400">🐾 {t('admin.adoptionsCount')}: <b>{d.adoptions}</b></div>
                      <div className="text-rose-400">🚨 {t('admin.rescueCasesCount')}: <b>{d.rescue}</b></div>
                    </div>
                  )}

                  {/* Dual Bars */}
                  <div className="w-full flex items-end justify-center gap-1.5 h-full max-h-[180px]">
                    <div 
                      className={`w-1/2 rounded-t-lg transition-all duration-300 ${
                        isHovered ? 'bg-teal-400 shadow-lg shadow-teal-500/30' : 'bg-teal-500'
                      }`}
                      style={{ height: `${adoptHeight}%` }}
                    />
                    <div 
                      className={`w-1/2 rounded-t-lg transition-all duration-300 ${
                        isHovered ? 'bg-rose-400 shadow-lg shadow-rose-500/30' : 'bg-rose-500'
                      }`}
                      style={{ height: `${rescueHeight}%` }}
                    />
                  </div>

                  {/* Month Label */}
                  <span className="text-[11px] font-bold text-stone-400 group-hover:text-white transition">
                    {isEn ? d.monthEn : d.monthVi}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[11px] text-stone-500 pt-1">
            <span>{isEn ? 'Scale: 0 - 40 cases/month' : 'Thang đo: 0 - 40 ca/tháng'}</span>
            <span>{isEn ? 'Updated 5 minutes ago' : 'Cập nhật 5 phút trước'}</span>
          </div>
        </div>

        {/* CHART 2: Species Breakdown & Pie (4 cols) */}
        <div className="lg:col-span-4 bg-stone-900 border border-stone-800 p-6 rounded-3xl space-y-6 shadow-xl flex flex-col justify-between">
          <div className="border-b border-stone-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-amber-400" />
              <span>{isEn ? 'Species Ratio on Platform' : 'Cơ cấu Loài thú cưng'}</span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              {isEn ? 'Distribution by animal type' : 'Tỷ lệ phân bổ theo loài trên hệ thống'}
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Dogs */}
            <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="font-bold text-stone-200">🐕 {t('common.dog')}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-white text-sm">{dogsCount}</span>
                <span className="text-stone-500 ml-1">({Math.round((dogsCount / (pets.length || 1)) * 100)}%)</span>
              </div>
            </div>

            {/* Cats */}
            <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-teal-500" />
                <span className="font-bold text-stone-200">🐈 {t('common.cat')}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-white text-sm">{catsCount}</span>
                <span className="text-stone-500 ml-1">({Math.round((catsCount / (pets.length || 1)) * 100)}%)</span>
              </div>
            </div>

            {/* Other */}
            <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-stone-600" />
                <span className="font-bold text-stone-200">🐾 {t('common.other')}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-white text-sm">{otherCount}</span>
                <span className="text-stone-500 ml-1">({Math.round((otherCount / (pets.length || 1)) * 100)}%)</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-stone-950/60 rounded-2xl border border-stone-800 text-[11px] text-stone-400">
            {isEn 
              ? '💡 Dogs and cats represent 98% of total adoption demand across all major cities.' 
              : '💡 Chó và mèo chiếm hơn 98% nhu cầu tìm kiếm và nhận nuôi tại các thành phố lớn.'}
          </div>
        </div>

      </div>

      {/* ADOPTION FUNNEL & FOOD FUND PROGRESS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Adoption Funnel (6 cols) */}
        <div className="lg:col-span-6 bg-stone-900 border border-stone-800 p-6 rounded-3xl space-y-6 shadow-xl">
          <div className="border-b border-stone-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-teal-400" />
              <span>{isEn ? 'Adoption Verification Funnel' : 'Phễu chuyển đổi nhận nuôi (Adoption Funnel)'}</span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              {isEn ? 'Step-by-step progress from application to permanent home' : 'Từng giai đoạn từ nộp khảo sát đến bàn giao và bảo trợ'}
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1.5">
                <span>1. {isEn ? 'Applications Submitted' : 'Đơn đăng ký nộp'} ({applications.length} {isEn ? 'apps' : 'đơn'})</span>
                <span className="text-teal-400">100%</span>
              </div>
              <div className="w-full bg-stone-950 h-3 rounded-full overflow-hidden">
                <div className="bg-teal-500 h-full rounded-full w-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1.5">
                <span>2. {isEn ? 'Interview & Background Check' : 'Đạt phỏng vấn & Phê duyệt'} ({applications.filter(a => a.status === 'APPROVED' || a.status === 'INTERVIEW').length} {isEn ? 'apps' : 'đơn'})</span>
                <span className="text-teal-400">75%</span>
              </div>
              <div className="w-full bg-stone-950 h-3 rounded-full overflow-hidden">
                <div className="bg-teal-600 h-full rounded-full w-[75%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1.5">
                <span>3. {isEn ? 'Signed Welfare Pledge & Handover' : 'Ký cam kết & Bàn giao đón bé'} ({statistics.totalAdoptedPets} {isEn ? 'pets' : 'bé'})</span>
                <span className="text-emerald-400">{statistics.successfulAdoptionRate}%</span>
              </div>
              <div className="w-full bg-stone-950 h-3 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${statistics.successfulAdoptionRate}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Food Fund Progress (6 cols) */}
        <div className="lg:col-span-6 bg-stone-900 border border-stone-800 p-6 rounded-3xl space-y-6 shadow-xl">
          <div className="border-b border-stone-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>{t('admin.chartDonationTitle')}</span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              {isEn ? 'Real-time campaign fulfillment for partner shelters' : 'Tiến độ tiếp sức hạt và lương thực tới các trạm cứu hộ'}
            </p>
          </div>

          <div className="space-y-4">
            {foodFundCampaigns.map(camp => {
              const pct = Math.min(100, Math.round((camp.currentAmount / camp.targetAmount) * 100));
              return (
                <div key={camp.id} className="p-4 bg-stone-950 rounded-2xl border border-stone-800/80 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-bold text-white">{camp.organizerName}</h4>
                      <span className="text-[10px] text-stone-400">{camp.title}</span>
                    </div>
                    <span className="font-mono font-bold text-amber-400 text-sm">{pct}%</span>
                  </div>

                  <div className="w-full bg-stone-900 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-stone-400 pt-0.5">
                    <span>{t('admin.legendRaised')}: <strong className="text-stone-200">{camp.currentAmount.toLocaleString('vi-VN')} đ</strong></span>
                    <span>{t('admin.legendTarget')}: <strong className="text-stone-200">{camp.targetAmount.toLocaleString('vi-VN')} đ</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
