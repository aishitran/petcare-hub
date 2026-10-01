import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  BarChart3, 
  TrendingUp, 
  Heart, 
  Users, 
  Award, 
  PieChart, 
  MapPin,
  ShieldCheck, 
  Calendar, 
  Activity, 
  CheckCircle2, 
  Package,
  Building2,
  Clock,
  Truck,
  Layers,
  Sparkles
} from 'lucide-react';

interface AdminStatisticsPageProps {
  navigate: (path: string) => void;
}

export const AdminStatisticsPage: React.FC<AdminStatisticsPageProps> = ({ navigate }) => {
  const { statistics, pets, users, applications, rescuePosts } = useData();
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  const [hoveredMonthIdx, setHoveredMonthIdx] = useState<number | null>(null);
  const [supplyTimeframe, setSupplyTimeframe] = useState<'1M' | '2M' | '3M' | '6M'>('1M');

  // Monthly adoption/rescue trend data
  const monthlyData = [
    { monthVi: 'Thg 1', monthEn: 'Jan', adoptions: 12, rescue: 8 },
    { monthVi: 'Thg 2', monthEn: 'Feb', adoptions: 18, rescue: 14 },
    { monthVi: 'Thg 3', monthEn: 'Mar', adoptions: 15, rescue: 11 },
    { monthVi: 'Thg 4', monthEn: 'Apr', adoptions: 24, rescue: 19 },
    { monthVi: 'Thg 5', monthEn: 'May', adoptions: 28, rescue: 22 },
    { monthVi: 'Thg 6', monthEn: 'Jun', adoptions: 34, rescue: 27 },
  ];

  const dogsCount = pets.filter(p => p.species === 'DOG').length;
  const catsCount = pets.filter(p => p.species === 'CAT').length;
  const otherCount = pets.filter(p => p.species !== 'DOG' && p.species !== 'CAT').length;

  // Shelter goods received data based on timeframe
  const supplyDataByTimeframe = {
    '1M': {
      labelVi: '1 tháng gần nhất',
      labelEn: 'Last 1 Month',
      kibbleKg: 1450,
      pateCans: 820,
      litterBags: 340,
      medicalPacks: 115,
      blanketsBeds: 48,
      totalBatches: 26
    },
    '2M': {
      labelVi: '2 tháng gần nhất',
      labelEn: 'Last 2 Months',
      kibbleKg: 3100,
      pateCans: 1750,
      litterBags: 710,
      medicalPacks: 240,
      blanketsBeds: 95,
      totalBatches: 54
    },
    '3M': {
      labelVi: '3 tháng gần nhất',
      labelEn: 'Last 3 Months',
      kibbleKg: 4900,
      pateCans: 2800,
      litterBags: 1150,
      medicalPacks: 390,
      blanketsBeds: 160,
      totalBatches: 88
    },
    '6M': {
      labelVi: '6 tháng gần nhất',
      labelEn: 'Last 6 Months',
      kibbleKg: 10200,
      pateCans: 5900,
      litterBags: 2400,
      medicalPacks: 820,
      blanketsBeds: 340,
      totalBatches: 192
    }
  };

  const currentSupplyStats = supplyDataByTimeframe[supplyTimeframe];

  // Shelter scale breakdown
  const shelterScaleBreakdown = [
    {
      scaleVi: 'Trạm Quy Mô Lớn (> 50 bé)',
      scaleEn: 'Large Shelters (> 50 pets)',
      shelterCount: 6,
      percentage: 52,
      color: 'from-amber-500 to-orange-500',
      totalKg: (currentSupplyStats.kibbleKg * 0.52).toFixed(0),
      descVi: 'Tiếp nhận phân phối hỗ trợ cho các trạm lưu trú tập trung dài hạn.',
      descEn: 'Major central shelters with high ongoing daily food consumption.'
    },
    {
      scaleVi: 'Trạm Quy Mô Vừa (20 - 50 bé)',
      scaleEn: 'Medium Shelters (20 - 50 pets)',
      shelterCount: 14,
      percentage: 33,
      color: 'from-teal-500 to-emerald-500',
      totalKg: (currentSupplyStats.kibbleKg * 0.33).toFixed(0),
      descVi: 'Các trạm cứu hộ cấp quận và trạm chuyên biệt điều trị.',
      descEn: 'District-level foster centers and post-op medical care houses.'
    },
    {
      scaleVi: 'Nhóm Cứu Hộ Nhỏ / Foster (< 20 bé)',
      scaleEn: 'Small Rescues / Fosterers (< 20 pets)',
      shelterCount: 28,
      percentage: 15,
      color: 'from-blue-500 to-indigo-500',
      totalKg: (currentSupplyStats.kibbleKg * 0.15).toFixed(0),
      descVi: 'Mạng lưới nhà tạm nuôi (Foster Home) nuôi dưỡng cá thể riêng biệt.',
      descEn: 'Individual home fosterers caring for young puppies and kittens.'
    }
  ];

  return (
    <div className="space-y-8 text-left text-stone-100">
      
      {/* Header */}
      <div className="border-b border-stone-800 pb-4 text-center sm:text-left">
        <h1 className="text-2xl font-black text-white font-display">
          {isEn ? 'Platform Analytics & Community Impact' : 'Báo cáo & Thống kê Tác động Cộng đồng'}
        </h1>
        <p className="text-xs text-stone-400 mt-1">
          {isEn 
            ? 'Real-time performance metrics on adoptions, user verification, rescue response, and shelter supply distribution.' 
            : 'Dữ liệu phân tích nhận nuôi, tăng trưởng người dùng, tỷ lệ bàn giao và thống kê đợt tiếp sức nhu yếu phẩm cho các trạm.'}
        </p>
      </div>

      {/* Top 3 Impact KPI Cards (Removed Fund Total per user requirement) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* KPI 1: Successful Adoptions */}
        <div className="bg-stone-850 border border-stone-750 p-6 rounded-3xl space-y-2 relative overflow-hidden shadow-md">
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
        <div className="bg-stone-850 border border-stone-750 p-6 rounded-3xl space-y-2 relative overflow-hidden shadow-md">
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
        <div className="bg-stone-850 border border-stone-750 p-6 rounded-3xl space-y-2 relative overflow-hidden shadow-md">
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

      </div>

      {/* INTERACTIVE CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* CHART 1: Monthly Adoptions & Rescues (8 cols) */}
        <div className="lg:col-span-8 bg-stone-850 border border-stone-750 p-6 rounded-3xl space-y-6 shadow-md">
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

          {/* Interactive Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-4 sm:gap-6 pt-6 px-2 border-b border-stone-800 relative">
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
                  {isHovered && (
                    <div className="absolute -top-14 bg-stone-950 border border-stone-700 text-stone-200 text-[11px] p-2 rounded-xl shadow-2xl z-30 whitespace-nowrap">
                      <div className="font-bold text-white mb-0.5">{isEn ? d.monthEn : d.monthVi}</div>
                      <div className="text-teal-400">🐾 {t('admin.adoptionsCount')}: <b>{d.adoptions}</b></div>
                      <div className="text-rose-400">🚨 {t('admin.rescueCasesCount')}: <b>{d.rescue}</b></div>
                    </div>
                  )}

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

        {/* CHART 2: Species Ratio (4 cols) */}
        <div className="lg:col-span-4 bg-stone-850 border border-stone-750 p-6 rounded-3xl space-y-6 shadow-md flex flex-col justify-between">
          <div className="border-b border-stone-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-amber-400" />
              <span>{isEn ? 'Species Ratio on Platform' : 'Cơ cấu Loài thú cưng'}</span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              {isEn ? 'Distribution by animal type' : 'Tỷ lệ phân bổ theo loài trên hệ thống'}
            </p>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="p-3.5 bg-stone-950 rounded-2xl border border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="font-bold text-stone-200">🐕 {t('common.dog')}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-white text-sm">{dogsCount}</span>
                <span className="text-stone-500 ml-1">({Math.round((dogsCount / (pets.length || 1)) * 100)}%)</span>
              </div>
            </div>

            <div className="p-3.5 bg-stone-950 rounded-2xl border border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-teal-500" />
                <span className="font-bold text-stone-200">🐈 {t('common.cat')}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-white text-sm">{catsCount}</span>
                <span className="text-stone-500 ml-1">({Math.round((catsCount / (pets.length || 1)) * 100)}%)</span>
              </div>
            </div>

            <div className="p-3.5 bg-stone-950 rounded-2xl border border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-stone-500" />
                <span className="font-bold text-stone-200">🐾 {isEn ? 'Other Species' : 'Loài khác'}</span>
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

      {/* ADOPTION LIFECYCLE PROGRESS & SHELTER GOODS STATS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SECTION 1: Renamed Funnel -> "Tiến trình Kết nối & Vòng đời Nhận nuôi" (6 cols) */}
        <div className="lg:col-span-6 bg-stone-850 border border-stone-750 p-6 rounded-3xl space-y-6 shadow-md">
          <div className="border-b border-stone-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-teal-400" />
              <span>{isEn ? 'Adoption Connection & Lifecycle Progress' : 'Tiến trình Kết nối & Vòng đời Nhận nuôi'}</span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              {isEn ? 'Step-by-step verified transition from application to forever home' : 'Từng giai đoạn từ nộp đơn, thẩm định đến bàn giao và bảo trợ'}
            </p>
          </div>

          <div className="space-y-5 text-xs">
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold">
                <span>1. {isEn ? 'Applications Submitted' : 'Đơn đăng ký đã nộp'} ({applications.length} {isEn ? 'apps' : 'đơn'})</span>
                <span className="text-teal-400">100%</span>
              </div>
              <div className="w-full bg-stone-950 h-3 rounded-full overflow-hidden">
                <div className="bg-teal-500 h-full rounded-full w-full" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between font-bold">
                <span>2. {isEn ? 'Interview & Background Screening' : 'Phỏng vấn & Đạt thẩm định'} ({applications.filter(a => a.status === 'APPROVED' || a.status === 'INTERVIEW').length} {isEn ? 'apps' : 'đơn'})</span>
                <span className="text-teal-400">75%</span>
              </div>
              <div className="w-full bg-stone-950 h-3 rounded-full overflow-hidden">
                <div className="bg-teal-600 h-full rounded-full w-[75%]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between font-bold">
                <span>3. {isEn ? 'Signed Welfare Pledge & Handover' : 'Ký cam kết phúc lợi & Đón bé về nhà'} ({statistics.totalAdoptedPets} {isEn ? 'pets' : 'bé'})</span>
                <span className="text-emerald-400">{statistics.successfulAdoptionRate}%</span>
              </div>
              <div className="w-full bg-stone-950 h-3 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${statistics.successfulAdoptionRate}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Shelter Goods Received Statistics by Timeframe (6 cols) */}
        <div className="lg:col-span-6 bg-stone-850 border border-stone-750 p-6 rounded-3xl space-y-5 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Package className="w-4 h-4 text-amber-400" />
                <span>{isEn ? 'Shelter Goods Received Statistics' : 'Thống kê Đợt Quyên góp Vật phẩm của Trạm'}</span>
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                {isEn ? 'Supplies delivered directly to verified shelters' : 'Nhu yếu phẩm hạt & y tế đã tiếp sức thành công tới các trạm'}
              </p>
            </div>

            {/* Timeframe Filter Buttons */}
            <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800">
              {(['1M', '2M', '3M', '6M'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSupplyTimeframe(tf)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    supplyTimeframe === tf
                      ? 'bg-[#d46b28] text-white shadow-xs'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {tf === '1M' ? '1 Th' : tf === '2M' ? '2 Th' : tf === '3M' ? '3 Th' : '6 Th'}
                </button>
              ))}
            </div>
          </div>

          {/* Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800 space-y-0.5">
              <span className="text-[10px] text-stone-400 font-semibold block">{isEn ? 'Kibble Food' : 'Thức ăn hạt'}</span>
              <span className="text-base font-black text-amber-400">{currentSupplyStats.kibbleKg.toLocaleString('vi-VN')} kg</span>
            </div>

            <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800 space-y-0.5">
              <span className="text-[10px] text-stone-400 font-semibold block">{isEn ? 'Canned Pate' : 'Pate & Dinh dưỡng'}</span>
              <span className="text-base font-black text-teal-400">{currentSupplyStats.pateCans.toLocaleString('vi-VN')} {isEn ? 'cans' : 'lon'}</span>
            </div>

            <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800 space-y-0.5">
              <span className="text-[10px] text-stone-400 font-semibold block">{isEn ? 'Cat Litter' : 'Cát vệ sinh'}</span>
              <span className="text-base font-black text-blue-400">{currentSupplyStats.litterBags.toLocaleString('vi-VN')} {isEn ? 'bags' : 'bao'}</span>
            </div>

            <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800 space-y-0.5">
              <span className="text-[10px] text-stone-400 font-semibold block">{isEn ? 'Medical / First Aid' : 'Thuốc & Vật tư y tế'}</span>
              <span className="text-base font-black text-rose-400">{currentSupplyStats.medicalPacks} {isEn ? 'kits' : 'gói'}</span>
            </div>

            <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800 space-y-0.5">
              <span className="text-[10px] text-stone-400 font-semibold block">{isEn ? 'Warm Beds & Cages' : 'Chuồng trại & Đệm ấm'}</span>
              <span className="text-base font-black text-purple-400">{currentSupplyStats.blanketsBeds} {isEn ? 'items' : 'cái'}</span>
            </div>

            <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800 space-y-0.5">
              <span className="text-[10px] text-stone-400 font-semibold block">{isEn ? 'Total Deliveries' : 'Tổng đợt giao'}</span>
              <span className="text-base font-black text-emerald-400">{currentSupplyStats.totalBatches} {isEn ? 'batches' : 'chuyến'}</span>
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 3: Donation Distribution by Shelter Scale */}
      <div className="bg-stone-850 border border-stone-750 p-6 rounded-3xl space-y-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-teal-400" />
              <span>{isEn ? 'Donation Volume by Shelter Capacity & Scale' : 'Thống kê Lượng Tiếp sức theo Quy mô Trạm Cứu Hộ'}</span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              {isEn 
                ? 'Balanced resource allocation across large centers, medium shelters, and home foster networks' 
                : 'Phân bổ cân đối nguồn tiếp sức hiện vật giữa các trạm quy mô lớn, trạm vừa và mạng lưới foster'}
            </p>
          </div>

          <span className="text-xs font-bold text-teal-400 bg-teal-950/60 border border-teal-800/60 px-3 py-1 rounded-xl">
            {isEn ? '48 Registered Shelter Partners' : '48 Trạm cứu hộ đối tác'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shelterScaleBreakdown.map((item, idx) => (
            <div key={idx} className="p-5 bg-stone-950 rounded-2xl border border-stone-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-xs">{isEn ? item.scaleEn : item.scaleVi}</h4>
                  <span className="text-xs font-bold text-stone-400">{item.shelterCount} {isEn ? 'shelters' : 'trạm'}</span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">{item.totalKg}</span>
                  <span className="text-xs text-stone-400 font-bold">kg hạt ({item.percentage}%)</span>
                </div>

                <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden">
                  <div className={`bg-gradient-to-r ${item.color} h-full rounded-full`} style={{ width: `${item.percentage}%` }} />
                </div>

                <p className="text-[11px] text-stone-400 leading-relaxed pt-1">
                  {isEn ? item.descEn : item.descVi}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
