import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  PieChart, 
  ShieldCheck, 
  Activity, 
  Package,
  Building2,
  Filter,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

interface AdminStatisticsPageProps {
  navigate: (path: string) => void;
}

interface ShelterBatchItem {
  id: string;
  date: string;
  timeframe: '1M' | '2M' | '3M' | '6M';
  titleVi: string;
  titleEn: string;
  itemsVi: string;
  itemsEn: string;
  sponsorVi: string;
  sponsorEn: string;
  status: 'DELIVERED' | 'VERIFIED';
}

interface ShelterDonationProfile {
  id: string;
  nameVi: string;
  nameEn: string;
  cityVi: string;
  cityEn: string;
  districtVi: string;
  districtEn: string;
  hotline: string;
  capacity: number; // Pet count
  scaleType: 'LARGE' | 'MEDIUM' | 'SMALL';
  representative: string;
  stats: {
    '1M': { kibbleKg: number; pateCans: number; litterBags: number; medicalPacks: number; blanketsBeds: number; totalBatches: number };
    '2M': { kibbleKg: number; pateCans: number; litterBags: number; medicalPacks: number; blanketsBeds: number; totalBatches: number };
    '3M': { kibbleKg: number; pateCans: number; litterBags: number; medicalPacks: number; blanketsBeds: number; totalBatches: number };
    '6M': { kibbleKg: number; pateCans: number; litterBags: number; medicalPacks: number; blanketsBeds: number; totalBatches: number };
  };
  batches: ShelterBatchItem[];
}

// Detailed Mock Data per Verified Shelter
const mockShelterProfiles: ShelterDonationProfile[] = [
  {
    id: 'shelter-hcm-01',
    nameVi: 'Trạm Cứu Hộ Chó Mèo Sài Gòn Time',
    nameEn: 'Saigon Time Animal Rescue Shelter',
    cityVi: 'TP. Hồ Chí Minh',
    cityEn: 'Ho Chi Minh City',
    districtVi: 'Bình Thạnh',
    districtEn: 'Binh Thanh',
    hotline: '0938 521 115',
    capacity: 65,
    scaleType: 'LARGE',
    representative: 'Nguyễn Văn Minh (Trưởng trạm)',
    stats: {
      '1M': { kibbleKg: 420, pateCans: 260, litterBags: 95, medicalPacks: 35, blanketsBeds: 16, totalBatches: 7 },
      '2M': { kibbleKg: 890, pateCans: 530, litterBags: 200, medicalPacks: 72, blanketsBeds: 32, totalBatches: 15 },
      '3M': { kibbleKg: 1380, pateCans: 810, litterBags: 320, medicalPacks: 110, blanketsBeds: 48, totalBatches: 24 },
      '6M': { kibbleKg: 2850, pateCans: 1680, litterBags: 670, medicalPacks: 230, blanketsBeds: 96, totalBatches: 52 }
    },
    batches: [
      {
        id: 'DOT-SGT-0928',
        date: '28/09/2026',
        timeframe: '1M',
        titleVi: 'Đợt 18: Tiếp sức 150kg hạt & 60 lon pate dinh dưỡng cho đàn 40 bé cún',
        titleEn: 'Batch 18: 150kg kibble & 60 nutrition pate cans for 40 recovering dogs',
        itemsVi: '150kg Hạt Smartheart, 60 lon Pate Monge, 20 bao Cát Minino',
        itemsEn: '150kg Smartheart Kibble, 60 Cans Monge Pate, 20 Bags Minino Litter',
        sponsorVi: 'Cộng đồng PetCare Hub & Nhóm TNV Sài Gòn',
        sponsorEn: 'PetCare Hub Community & Saigon Volunteer Group',
        status: 'DELIVERED'
      },
      {
        id: 'DOT-SGT-0914',
        date: '14/09/2026',
        timeframe: '1M',
        titleVi: 'Đợt 17: Cấp viện 15 gói vật tư y tế & 120kg thức ăn hạt',
        titleEn: 'Batch 17: Emergency medical kits & 120kg nutrition kibble',
        itemsVi: '120kg Hạt Ganador, 15 kit sát trùng & băng gạc phẫu thuật, 8 đệm ấm',
        itemsEn: '120kg Ganador Kibble, 15 Surgical dressing kits, 8 Warm beds',
        sponsorVi: 'Chiến dịch Tiếp Sức Y Tế Tháng 9',
        sponsorEn: 'September Medical Aid Campaign',
        status: 'VERIFIED'
      },
      {
        id: 'DOT-SGT-0825',
        date: '25/08/2026',
        timeframe: '2M',
        titleVi: 'Đợt 16: Hỗ trợ lương thực đợt lũ & 80 bao cát vệ sinh',
        titleEn: 'Batch 16: Flood relief pet food & 80 bags of cat litter',
        itemsVi: '180kg Hạt dinh dưỡng, 80 bao Cát vệ sinh, 50 lon Pate phục hồi',
        itemsEn: '180kg Nutritional Kibble, 80 Bags Cat Litter, 50 Recovery Pate Cans',
        sponsorVi: 'Nhà hảo tâm Phạm Hải & Bạn bè',
        sponsorEn: 'Sponsor Pham Hai & Friends',
        status: 'VERIFIED'
      },
      {
        id: 'DOT-SGT-0718',
        date: '18/07/2026',
        timeframe: '3M',
        titleVi: 'Đợt 15: Tiếp tế chuồng inox cách ly & 200kg hạt cao cấp',
        titleEn: 'Batch 15: Stainless steel quarantine cages & 200kg premium kibble',
        itemsVi: '200kg Hạt, 4 Chuồng inox cách ly, 25 gói Thuốc tẩy giun & ve rận',
        itemsEn: '200kg Kibble, 4 Quarantine Cages, 25 Deworming & Tick treatments',
        sponsorVi: 'Quỹ Bảo Trợ Trạm Lớn PetCare',
        sponsorEn: 'PetCare Major Shelter Endowment',
        status: 'VERIFIED'
      }
    ]
  },
  {
    id: 'shelter-hn-01',
    nameVi: 'Trạm Cứu Hộ Động Vật Hà Nội (CPAP)',
    nameEn: 'Hanoi Animal Rescue Station (CPAP)',
    cityVi: 'Hà Nội',
    cityEn: 'Hanoi',
    districtVi: 'Thanh Trì',
    districtEn: 'Thanh Tri',
    hotline: '0983 611 043',
    capacity: 80,
    scaleType: 'LARGE',
    representative: 'Trần Thị Thu Hà (Điều phối trạm)',
    stats: {
      '1M': { kibbleKg: 480, pateCans: 290, litterBags: 110, medicalPacks: 40, blanketsBeds: 18, totalBatches: 8 },
      '2M': { kibbleKg: 990, pateCans: 590, litterBags: 230, medicalPacks: 85, blanketsBeds: 36, totalBatches: 17 },
      '3M': { kibbleKg: 1560, pateCans: 920, litterBags: 370, medicalPacks: 130, blanketsBeds: 56, totalBatches: 28 },
      '6M': { kibbleKg: 3200, pateCans: 1920, litterBags: 780, medicalPacks: 270, blanketsBeds: 110, totalBatches: 60 }
    },
    batches: [
      {
        id: 'DOT-CPAP-0925',
        date: '25/09/2026',
        timeframe: '1M',
        titleVi: 'Đợt 22: Tiếp nhận 200kg thức ăn hạt cho 80 bé cún mèo lưu trú',
        titleEn: 'Batch 22: Received 200kg kibble for 80 resident rescue pets',
        itemsVi: '200kg Hạt Royal Canin & Classic, 80 lon Pate Dinh Dưỡng, 30 bao Cát',
        itemsEn: '200kg Royal Canin & Classic Kibble, 80 Nutritional Pate, 30 Bags Litter',
        sponsorVi: 'Câu lạc bộ Yêu Động Vật Hà Nội',
        sponsorEn: 'Hanoi Animal Lovers Club',
        status: 'DELIVERED'
      },
      {
        id: 'DOT-CPAP-0910',
        date: '10/09/2026',
        timeframe: '1M',
        titleVi: 'Đợt 21: Cấp phát thuốc trị nấm ghẻ & 15 đệm lót mùa đông',
        titleEn: 'Batch 21: Dermatology & mange medicines with 15 winter bedding mats',
        itemsVi: '20 kit thuốc bôi & xịt nấm da, 15 Đệm giữ nhiệt, 100kg Hạt',
        itemsEn: '20 Skin ointment & antifungal spray kits, 15 Thermal mats, 100kg Kibble',
        sponsorVi: 'Chiến Dịch Đông Ấm Cho Thú Cưng',
        sponsorEn: 'Warm Winter for Pets Campaign',
        status: 'VERIFIED'
      }
    ]
  },
  {
    id: 'shelter-hcm-04',
    nameVi: 'Tổ Chức Bảo Vệ Động Vật Green Paw Vietnam',
    nameEn: 'Green Paw Vietnam Animal Protection',
    cityVi: 'TP. Hồ Chí Minh',
    cityEn: 'Ho Chi Minh City',
    districtVi: 'TP. Thủ Đức',
    districtEn: 'Thu Duc City',
    hotline: '0903 888 777',
    capacity: 40,
    scaleType: 'MEDIUM',
    representative: 'Lê Hoàng Nam (Quản lý)',
    stats: {
      '1M': { kibbleKg: 240, pateCans: 130, litterBags: 60, medicalPacks: 20, blanketsBeds: 8, totalBatches: 5 },
      '2M': { kibbleKg: 510, pateCans: 280, litterBags: 125, medicalPacks: 40, blanketsBeds: 15, totalBatches: 10 },
      '3M': { kibbleKg: 820, pateCans: 440, litterBags: 195, medicalPacks: 65, blanketsBeds: 26, totalBatches: 16 },
      '6M': { kibbleKg: 1720, pateCans: 950, litterBags: 410, medicalPacks: 135, blanketsBeds: 54, totalBatches: 34 }
    },
    batches: [
      {
        id: 'DOT-GPW-0922',
        date: '22/09/2026',
        timeframe: '1M',
        titleVi: 'Đợt 12: Bàn giao 100kg hạt dinh dưỡng và 40 lon pate',
        titleEn: 'Batch 12: Handed over 100kg kibble and 40 cans of nutrition pate',
        itemsVi: '100kg Hạt Catsrang, 40 lon Pate cá hồi, 15 bao Cát đậu nành',
        itemsEn: '100kg Catsrang Kibble, 40 Salmon Pate Cans, 15 Tofu Litter Bags',
        sponsorVi: 'Nhóm Thiện Nguyện Green Friends',
        sponsorEn: 'Green Friends Charity Group',
        status: 'DELIVERED'
      }
    ]
  },
  {
    id: 'shelter-dn-01',
    nameVi: 'Trạm Cứu Trợ Động Vật Yêu Thương Đà Nẵng',
    nameEn: 'Da Nang Compassion Animal Rescue Shelter',
    cityVi: 'Đà Nẵng',
    cityEn: 'Da Nang',
    districtVi: 'Sơn Trà',
    districtEn: 'Son Tra',
    hotline: '0935 888 999',
    capacity: 45,
    scaleType: 'MEDIUM',
    representative: 'Ngô Thanh Tùng (Chủ nhiệm trạm)',
    stats: {
      '1M': { kibbleKg: 210, pateCans: 110, litterBags: 50, medicalPacks: 14, blanketsBeds: 6, totalBatches: 4 },
      '2M': { kibbleKg: 460, pateCans: 230, litterBags: 105, medicalPacks: 29, blanketsBeds: 12, totalBatches: 8 },
      '3M': { kibbleKg: 720, pateCans: 370, litterBags: 170, medicalPacks: 48, blanketsBeds: 20, totalBatches: 13 },
      '6M': { kibbleKg: 1530, pateCans: 810, litterBags: 360, medicalPacks: 105, blanketsBeds: 44, totalBatches: 28 }
    },
    batches: [
      {
        id: 'DOT-DNG-0918',
        date: '18/09/2026',
        timeframe: '1M',
        titleVi: 'Đợt 9: Tiếp sức mùa mưa bão miền Trung - 80kg thức ăn hạt',
        titleEn: 'Batch 9: Central storm season relief - 80kg nutrition pet food',
        itemsVi: '80kg Hạt cún mèo, 30 lon Pate phục hồi, 10 bộ băng nẹp sơ cứu',
        itemsEn: '80kg Pet kibble, 30 Recovery pate cans, 10 First aid splint sets',
        sponsorVi: 'Cộng đồng Người Nuôi Thú Cưng Đà Nẵng',
        sponsorEn: 'Da Nang Pet Owners Community',
        status: 'DELIVERED'
      }
    ]
  },
  {
    id: 'shelter-ct-01',
    nameVi: 'Đội Cứu Hộ Động Vật Tây Đô Cần Thơ',
    nameEn: 'Tay Do Can Tho Animal Rescue Team',
    cityVi: 'Cần Thơ',
    cityEn: 'Can Tho',
    districtVi: 'Ninh Kiều',
    districtEn: 'Ninh Kieu',
    hotline: '0949 111 222',
    capacity: 30,
    scaleType: 'MEDIUM',
    representative: 'Huỳnh Tấn Đạt (Đội trưởng)',
    stats: {
      '1M': { kibbleKg: 100, pateCans: 50, litterBags: 25, medicalPacks: 6, blanketsBeds: 0, totalBatches: 2 },
      '2M': { kibbleKg: 250, pateCans: 120, litterBags: 50, medicalPacks: 14, blanketsBeds: 0, totalBatches: 4 },
      '3M': { kibbleKg: 420, pateCans: 260, litterBags: 95, medicalPacks: 37, blanketsBeds: 10, totalBatches: 7 },
      '6M': { kibbleKg: 900, pateCans: 540, litterBags: 180, medicalPacks: 80, blanketsBeds: 36, totalBatches: 18 }
    },
    batches: [
      {
        id: 'DOT-CTH-0915',
        date: '15/09/2026',
        timeframe: '1M',
        titleVi: 'Đợt 4: Tiếp sức 60kg hạt & 30 lon pate cho đàn mèo mồ côi',
        titleEn: 'Batch 4: 60kg kibble & 30 pate cans for orphaned kittens',
        itemsVi: '60kg Hạt Minino, 30 lon Pate, 15 bao Cát vệ sinh',
        itemsEn: '60kg Minino Kibble, 30 Pate Cans, 15 Litter Bags',
        sponsorVi: 'Nhóm Bạn Trẻ Vì Thú Cưng Miền Tây',
        sponsorEn: 'Mekong Delta Pet Friends Youth Group',
        status: 'DELIVERED'
      }
    ]
  }
];

export const AdminStatisticsPage: React.FC<AdminStatisticsPageProps> = ({ navigate }) => {
  const { statistics, pets, users, applications } = useData();
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  const [hoveredMonthIdx, setHoveredMonthIdx] = useState<number | null>(null);
  const [supplyTimeframe, setSupplyTimeframe] = useState<'1M' | '2M' | '3M' | '6M'>('1M');
  const [selectedShelterId, setSelectedShelterId] = useState<string>('all');
  const [filterScale, setFilterScale] = useState<'ALL' | 'LARGE' | 'MEDIUM' | 'SMALL'>('ALL');

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

  // Filtered shelter list according to scale filter
  const visibleShelters = useMemo(() => {
    if (filterScale === 'ALL') return mockShelterProfiles;
    return mockShelterProfiles.filter(s => s.scaleType === filterScale);
  }, [filterScale]);

  // Selected shelter object
  const selectedShelter = useMemo(() => {
    if (selectedShelterId === 'all') return null;
    return mockShelterProfiles.find(s => s.id === selectedShelterId) || null;
  }, [selectedShelterId]);

  // Aggregate supply stats for all shelters or selected shelter
  const activeSupplyStats = useMemo(() => {
    if (selectedShelter) {
      return selectedShelter.stats[supplyTimeframe];
    }
    // Calculate total across all shelters
    return mockShelterProfiles.reduce((acc, shelter) => {
      const s = shelter.stats[supplyTimeframe];
      return {
        kibbleKg: acc.kibbleKg + s.kibbleKg,
        pateCans: acc.pateCans + s.pateCans,
        litterBags: acc.litterBags + s.litterBags,
        medicalPacks: acc.medicalPacks + s.medicalPacks,
        blanketsBeds: acc.blanketsBeds + s.blanketsBeds,
        totalBatches: acc.totalBatches + s.totalBatches
      };
    }, { kibbleKg: 0, pateCans: 0, litterBags: 0, medicalPacks: 0, blanketsBeds: 0, totalBatches: 0 });
  }, [selectedShelter, supplyTimeframe]);

  // Active batch log list
  const activeBatchList = useMemo(() => {
    if (selectedShelter) {
      return selectedShelter.batches.filter(b => {
        if (supplyTimeframe === '1M') return b.timeframe === '1M';
        if (supplyTimeframe === '2M') return b.timeframe === '1M' || b.timeframe === '2M';
        if (supplyTimeframe === '3M') return b.timeframe === '1M' || b.timeframe === '2M' || b.timeframe === '3M';
        return true;
      });
    }
    // Combine from all shelters
    return mockShelterProfiles.flatMap(s => s.batches).filter(b => {
      if (supplyTimeframe === '1M') return b.timeframe === '1M';
      if (supplyTimeframe === '2M') return b.timeframe === '1M' || b.timeframe === '2M';
      if (supplyTimeframe === '3M') return b.timeframe === '1M' || b.timeframe === '2M' || b.timeframe === '3M';
      return true;
    });
  }, [selectedShelter, supplyTimeframe]);

  // Shelter scale breakdown
  const shelterScaleBreakdown = [
    {
      type: 'LARGE' as const,
      scaleVi: 'Trạm Quy Mô Lớn (> 50 bé)',
      scaleEn: 'Large Shelters (> 50 pets)',
      shelterCount: 6,
      percentage: 52,
      color: 'from-amber-500 to-orange-500',
      totalKg: (activeSupplyStats.kibbleKg * 0.52).toFixed(0),
      descVi: 'Tiếp nhận phân phối hỗ trợ cho các trạm lưu trú tập trung dài hạn.',
      descEn: 'Major central shelters with high ongoing daily food consumption.'
    },
    {
      type: 'MEDIUM' as const,
      scaleVi: 'Trạm Quy Mô Vừa (20 - 50 bé)',
      scaleEn: 'Medium Shelters (20 - 50 pets)',
      shelterCount: 14,
      percentage: 33,
      color: 'from-teal-500 to-emerald-500',
      totalKg: (activeSupplyStats.kibbleKg * 0.33).toFixed(0),
      descVi: 'Các trạm cứu hộ cấp quận và trạm chuyên biệt điều trị.',
      descEn: 'District-level foster centers and post-op medical care houses.'
    },
    {
      type: 'SMALL' as const,
      scaleVi: 'Nhóm Cứu Hộ Nhỏ / Foster (< 20 bé)',
      scaleEn: 'Small Rescues / Fosterers (< 20 pets)',
      shelterCount: 28,
      percentage: 15,
      color: 'from-blue-500 to-indigo-500',
      totalKg: (activeSupplyStats.kibbleKg * 0.15).toFixed(0),
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
            : 'Dữ liệu phân tích nhận nuôi, tăng trưởng người dùng, tỷ lệ bàn giao và thống kê đợt tiếp sức nhu yếu phẩm cho từng trạm.'}
        </p>
      </div>

      {/* Top 3 Impact KPI Cards */}
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
                      <div className="text-teal-400">{t('admin.adoptionsCount')}: <b>{d.adoptions}</b></div>
                      <div className="text-rose-400">{t('admin.rescueCasesCount')}: <b>{d.rescue}</b></div>
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
                <span className="font-bold text-stone-200">{t('common.dog', 'Chó')}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-white text-sm">{dogsCount}</span>
                <span className="text-stone-500 ml-1">({Math.round((dogsCount / (pets.length || 1)) * 100)}%)</span>
              </div>
            </div>

            <div className="p-3.5 bg-stone-950 rounded-2xl border border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-teal-500" />
                <span className="font-bold text-stone-200">{t('common.cat', 'Mèo')}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-white text-sm">{catsCount}</span>
                <span className="text-stone-500 ml-1">({Math.round((catsCount / (pets.length || 1)) * 100)}%)</span>
              </div>
            </div>

            <div className="p-3.5 bg-stone-950 rounded-2xl border border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-stone-500" />
                <span className="font-bold text-stone-200">{isEn ? 'Other Species' : 'Loài khác'}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-white text-sm">{otherCount}</span>
                <span className="text-stone-500 ml-1">({Math.round((otherCount / (pets.length || 1)) * 100)}%)</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-stone-950/60 rounded-2xl border border-stone-800 text-[11px] text-stone-400">
            {isEn 
              ? 'Dogs and cats represent 98% of total adoption demand across all major cities.' 
              : 'Chó và mèo chiếm hơn 98% nhu cầu tìm kiếm và nhận nuôi tại các thành phố lớn.'}
          </div>
        </div>

      </div>

      {/* ADOPTION LIFECYCLE PROGRESS */}
      <div className="bg-stone-850 border border-stone-750 p-6 rounded-3xl space-y-6 shadow-md">
        <div className="border-b border-stone-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-400" />
            <span>{isEn ? 'Adoption Connection & Lifecycle Progress' : 'Tiến trình Kết nối & Vòng đời Nhận nuôi'}</span>
          </h3>
          <p className="text-xs text-stone-400 mt-0.5">
            {isEn ? 'Step-by-step verified transition from application to forever home' : 'Từng giai đoạn từ nộp đơn, thẩm định đến bàn giao và bảo trợ'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-2">
            <div className="flex justify-between font-bold">
              <span>1. {isEn ? 'Applications Submitted' : 'Đơn đăng ký đã nộp'}</span>
              <span className="text-teal-400">{applications.length} {isEn ? 'apps' : 'đơn'} (100%)</span>
            </div>
            <div className="w-full bg-stone-900 h-2.5 rounded-full overflow-hidden">
              <div className="bg-teal-500 h-full rounded-full w-full" />
            </div>
            <p className="text-[11px] text-stone-400 pt-1">
              {isEn ? 'Initial adoption questionnaires submitted by prospective pet owners.' : 'Khảo sát điều kiện ban đầu từ người có nguyện vọng nhận nuôi.'}
            </p>
          </div>

          <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-2">
            <div className="flex justify-between font-bold">
              <span>2. {isEn ? 'Interview & Background Screening' : 'Phỏng vấn & Đạt thẩm định'}</span>
              <span className="text-teal-400">{applications.filter(a => a.status === 'APPROVED' || a.status === 'INTERVIEW').length} {isEn ? 'apps' : 'đơn'} (75%)</span>
            </div>
            <div className="w-full bg-stone-900 h-2.5 rounded-full overflow-hidden">
              <div className="bg-teal-600 h-full rounded-full w-[75%]" />
            </div>
            <p className="text-[11px] text-stone-400 pt-1">
              {isEn ? 'Verified living conditions and commitment to lifelong pet care.' : 'Xác thực không gian sống, sự đồng thuận gia đình và cam kết chăm sóc.'}
            </p>
          </div>

          <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-2">
            <div className="flex justify-between font-bold">
              <span>3. {isEn ? 'Signed Welfare Pledge & Handover' : 'Ký cam kết phúc lợi & Đón bé về'}</span>
              <span className="text-emerald-400">{statistics.totalAdoptedPets} {isEn ? 'pets' : 'bé'} ({statistics.successfulAdoptionRate}%)</span>
            </div>
            <div className="w-full bg-stone-900 h-2.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${statistics.successfulAdoptionRate}%` }} />
            </div>
            <p className="text-[11px] text-stone-400 pt-1">
              {isEn ? 'Signed adoption agreement and entered regular post-adoption check-in cycle.' : 'Ký kết bàn giao hợp đồng và theo dõi định kỳ sau nhận nuôi.'}
            </p>
          </div>
        </div>
      </div>

      {/* SHELTER GOODS RECEIVED & DONATION CAMPAIGN ROUNDS (PER SHELTER) */}
      <div className="bg-stone-850 border border-stone-750 p-6 sm:p-7 rounded-3xl space-y-6 shadow-md">
        
        {/* Section Header & Shelter / Timeframe Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-800 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Package className="w-4 h-4" />
              <span>{isEn ? 'Shelter Supply Rounds & Goods Received' : 'Thống kê Đợt Quyên góp Vật phẩm của Trạm'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-display">
              {selectedShelter 
                ? (isEn ? `Donation Log: ${selectedShelter.nameEn}` : `Báo cáo Đợt Quyên Góp: ${selectedShelter.nameVi}`)
                : (isEn ? 'Consolidated Shelter Goods Statistics (All Shelters)' : 'Tổng hợp Đợt Quyên góp & Vật phẩm Tiếp sức Toàn Hệ Thống')}
            </h2>
            <p className="text-xs text-stone-400">
              {isEn 
                ? 'Detailed tracking of food, medicine, and shelter supplies delivered to verified animal shelters.' 
                : 'Theo dõi chi tiết số lượng thức ăn hạt, pate, cát, thuốc thú y và chuồng trại được chuyển giao tới từng trạm cứu hộ.'}
            </p>
          </div>

          {/* Controls: Shelter Selector + Timeframe Selector */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Shelter Dropdown Selector */}
            <div className="relative min-w-[240px]">
              <select
                value={selectedShelterId}
                onChange={(e) => setSelectedShelterId(e.target.value)}
                aria-label={isEn ? 'Select Shelter' : 'Chọn Trạm Cứu Hộ'}
                className="w-full appearance-none bg-stone-950 border border-stone-700 hover:border-amber-400/60 rounded-2xl px-4 py-2.5 text-xs font-bold text-white pr-9 focus:outline-hidden focus:ring-1 focus:ring-amber-400 cursor-pointer shadow-sm transition"
              >
                <option value="all">
                  {isEn ? '-- All Shelters (Platform-wide) --' : '-- Tất cả các trạm (Toàn hệ thống) --'}
                </option>
                {mockShelterProfiles.map((s) => (
                  <option key={s.id} value={s.id}>
                    {isEn ? `${s.nameEn} (${s.cityEn} - ${s.capacity} pets)` : `${s.nameVi} (${s.cityVi} - ${s.capacity} bé)`}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Timeframe Filter Buttons */}
            <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-2xl border border-stone-800 shadow-inner">
              {(['1M', '2M', '3M', '6M'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSupplyTimeframe(tf)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    supplyTimeframe === tf
                      ? 'bg-[#d46b28] text-white shadow-xs'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {tf === '1M' ? (isEn ? '1 Month' : '1 Tháng') : tf === '2M' ? (isEn ? '2 Months' : '2 Tháng') : tf === '3M' ? (isEn ? '3 Months' : '3 Tháng') : (isEn ? '6 Months' : '6 Tháng')}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Selected Shelter Context Banner (if an individual shelter is selected) */}
        {selectedShelter && (
          <div className="p-4 sm:p-5 bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 rounded-2xl border border-amber-400/30 text-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold text-[10px] uppercase border border-amber-400/30">
                  {selectedShelter.scaleType === 'LARGE' ? (isEn ? 'Large Shelter (>50 pets)' : 'Trạm Quy Mô Lớn (>50 bé)') : (isEn ? 'Medium Shelter (20-50 pets)' : 'Trạm Quy Mô Vừa (20-50 bé)')}
                </span>
                <span className="text-stone-400 text-[11px]">
                  {isEn ? `Capacity: ${selectedShelter.capacity} sheltered pets` : `Quy mô: Đang chăm sóc ${selectedShelter.capacity} bé`}
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                {isEn ? selectedShelter.nameEn : selectedShelter.nameVi}
              </h3>
              <p className="text-stone-300 text-[11px]">
                {isEn ? `Location: ${selectedShelter.districtEn}, ${selectedShelter.cityEn}` : `Khu vực: ${selectedShelter.districtVi}, ${selectedShelter.cityVi}`} • {isEn ? `Representative: ${selectedShelter.representative}` : `Người đại diện: ${selectedShelter.representative}`} • Hotline: <strong className="text-amber-300">{selectedShelter.hotline}</strong>
              </p>
            </div>

            <button
              onClick={() => setSelectedShelterId('all')}
              className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold self-start md:self-center transition cursor-pointer"
            >
              {isEn ? 'Reset to All Shelters' : 'Xem toàn bộ hệ thống'}
            </button>
          </div>
        )}

        {/* 6 Key Supply Categories Received Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 text-xs">
          
          <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-1">
            <span className="text-[10px] text-stone-400 font-semibold block uppercase tracking-wider">{isEn ? 'Kibble Food' : 'Thức ăn hạt'}</span>
            <div className="text-xl sm:text-2xl font-black text-amber-400">{activeSupplyStats.kibbleKg.toLocaleString('vi-VN')} kg</div>
            <span className="text-[10px] text-stone-500 block">{isEn ? 'Dog & Cat Kibble' : 'Hạt chó mèo dinh dưỡng'}</span>
          </div>

          <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-1">
            <span className="text-[10px] text-stone-400 font-semibold block uppercase tracking-wider">{isEn ? 'Canned Pate' : 'Pate Dinh dưỡng'}</span>
            <div className="text-xl sm:text-2xl font-black text-teal-400">{activeSupplyStats.pateCans.toLocaleString('vi-VN')} {isEn ? 'cans' : 'lon'}</div>
            <span className="text-[10px] text-stone-500 block">{isEn ? 'Wet food & supplements' : 'Pate phục hồi thể lực'}</span>
          </div>

          <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-1">
            <span className="text-[10px] text-stone-400 font-semibold block uppercase tracking-wider">{isEn ? 'Cat Litter' : 'Cát vệ sinh'}</span>
            <div className="text-xl sm:text-2xl font-black text-blue-400">{activeSupplyStats.litterBags.toLocaleString('vi-VN')} {isEn ? 'bags' : 'bao'}</div>
            <span className="text-[10px] text-stone-500 block">{isEn ? 'Odor control litter' : 'Cát khử mùi chuồng'}</span>
          </div>

          <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-1">
            <span className="text-[10px] text-stone-400 font-semibold block uppercase tracking-wider">{isEn ? 'Medical Kits' : 'Thuốc & Y tế'}</span>
            <div className="text-xl sm:text-2xl font-black text-rose-400">{activeSupplyStats.medicalPacks} {isEn ? 'kits' : 'gói'}</div>
            <span className="text-[10px] text-stone-500 block">{isEn ? 'Surgical & first aid' : 'Băng gạc & thuốc sát trùng'}</span>
          </div>

          <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-1">
            <span className="text-[10px] text-stone-400 font-semibold block uppercase tracking-wider">{isEn ? 'Warm Beds & Cages' : 'Chuồng & Đệm'}</span>
            <div className="text-xl sm:text-2xl font-black text-purple-400">{activeSupplyStats.blanketsBeds} {isEn ? 'items' : 'cái'}</div>
            <span className="text-[10px] text-stone-500 block">{isEn ? 'Shelter equipment' : 'Chuồng cách ly & đệm lót'}</span>
          </div>

          <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-1">
            <span className="text-[10px] text-stone-400 font-semibold block uppercase tracking-wider">{isEn ? 'Completed Batches' : 'Đợt tiếp sức'}</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400">{activeSupplyStats.totalBatches} {isEn ? 'batches' : 'chuyến'}</div>
            <span className="text-[10px] text-stone-500 block">{isEn ? 'Direct deliveries' : 'Bàn giao trực tiếp tại trạm'}</span>
          </div>

        </div>

        {/* Detailed Donation Batch Records Table / List */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider">
              {isEn ? 'Recorded Supply Delivery Batches' : 'Chi tiết các Đợt Quyên góp Tiếp sức đã Bàn giao'}
            </h4>
            <span className="text-[11px] text-stone-400">
              {isEn ? `Showing ${activeBatchList.length} recorded deliveries` : `Hiển thị ${activeBatchList.length} đợt giao nhận`}
            </span>
          </div>

          <div className="bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-stone-800 text-stone-400 bg-stone-900/60 text-[11px] font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">{isEn ? 'Batch ID / Date' : 'Mã đợt / Ngày'}</th>
                    <th className="py-3 px-4">{isEn ? 'Donation Campaign & Needs' : 'Đợt phát động & Nhu cầu'}</th>
                    <th className="py-3 px-4">{isEn ? 'Supplies Received' : 'Hiện vật tiếp nhận'}</th>
                    <th className="py-3 px-4">{isEn ? 'Sponsor / Coordinator' : 'Nhà hảo tâm / Đơn vị điều phối'}</th>
                    <th className="py-3 px-4 text-right">{isEn ? 'Status' : 'Trạng thái'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-850">
                  {activeBatchList.length > 0 ? (
                    activeBatchList.map((batch) => (
                      <tr key={batch.id} className="hover:bg-stone-900/50 transition">
                        <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                          <span className="font-mono text-[11px] text-amber-300 block">{batch.id}</span>
                          <span className="text-[10px] text-stone-400">{batch.date}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-stone-200 block">{isEn ? batch.titleEn : batch.titleVi}</span>
                        </td>
                        <td className="py-3.5 px-4 text-stone-300 font-medium">
                          {isEn ? batch.itemsEn : batch.itemsVi}
                        </td>
                        <td className="py-3.5 px-4 text-stone-400 text-[11px]">
                          {isEn ? batch.sponsorEn : batch.sponsorVi}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-800/60">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>{batch.status === 'DELIVERED' ? (isEn ? 'Delivered' : 'Đã giao trạm') : (isEn ? 'Verified & Stored' : 'Đã nhập kho')}</span>
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-stone-400 text-xs">
                        {isEn ? 'No delivery batches recorded in this timeframe.' : 'Không có đợt tiếp sức nào được ghi nhận trong khoảng thời gian này.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
            <div 
              key={idx} 
              onClick={() => {
                setFilterScale(item.type);
                const firstMatching = mockShelterProfiles.find(s => s.scaleType === item.type);
                if (firstMatching) setSelectedShelterId(firstMatching.id);
              }}
              className={`p-5 bg-stone-950 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-3 ${
                selectedShelter?.scaleType === item.type 
                  ? 'border-amber-400/80 ring-1 ring-amber-400/50' 
                  : 'border-stone-800 hover:border-stone-700'
              }`}
            >
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

              <span className="text-[10px] font-semibold text-amber-300 hover:underline pt-1 block text-right">
                {isEn ? 'Filter shelters by this scale →' : 'Xem các trạm theo quy mô này →'}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
