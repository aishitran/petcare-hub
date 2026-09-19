import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { EmergencyShelter, ShelterSupplyItem } from '../../types/shelter';
import { FoodFundCampaign } from '../../types/donation';
import { mockEmergencyShelters } from '../../data/mockEmergencyShelters';
import { translateAddress, translateShelterName } from '../../utils/addressTranslator';
import { 
  X, 
  ArrowRight, 
  Info, 
  AlertCircle, 
  CheckCircle2, 
  Package, 
  Truck, 
  Home, 
  Phone, 
  MapPin, 
  Clock, 
  Building2, 
  Heart, 
  Copy, 
  Check,
  CreditCard
} from 'lucide-react';

interface FoodDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  shelter?: EmergencyShelter;
  defaultItem?: ShelterSupplyItem | null;
  campaign?: FoodFundCampaign;
  defaultPackageAmount?: number;
  defaultPackageName?: string;
  onSuccess?: () => void;
}

export const FoodDonationModal: React.FC<FoodDonationModalProps> = ({
  isOpen,
  onClose,
  shelter: propShelter,
  defaultItem,
  campaign: propCampaign,
  defaultPackageAmount = 150000,
  defaultPackageName = 'Gói Hạt Tiêu Chuẩn',
  onSuccess
}) => {
  const { donateToFoodFund, foodFundCampaign } = useData();
  const { currentUser } = useAuth();
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  const shelter = propShelter || mockEmergencyShelters[0];
  const campaign = propCampaign || foodFundCampaign;

  // Delivery / Pledge mode: 'SHIP' (Direct courier/Grab), 'DROPOFF' (In person), 'FUNDS' (Direct shelter bank transfer)
  const [pledgeMode, setPledgeMode] = useState<'SHIP' | 'DROPOFF' | 'FUNDS'>('SHIP');
  
  // Selected category & item
  const [selectedItemId, setSelectedItemId] = useState<string>(defaultItem?.id || '');
  const [customItemName, setCustomItemName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(defaultItem ? 1 : 5);
  const [quantityUnit, setQuantityUnit] = useState<string>(isEn ? 'kg' : 'kg');

  // Direct Fund transfer options if chosen
  const [selectedFundAmount, setSelectedFundAmount] = useState<number>(defaultPackageAmount);
  const [customFundAmount, setCustomFundAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'VIETQR' | 'MOMO'>('VIETQR');

  // Donor Contact Info
  const [donorName, setDonorName] = useState<string>(currentUser?.name || '');
  const [donorPhone, setDonorPhone] = useState<string>(currentUser?.phone || '');
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState<string>('');
  const [message, setMessage] = useState<string>(
    isEn
      ? 'Sending love and full bellies to all shelter pets. Hope you all find safe forever homes!'
      : 'Gửi các bé ngập tràn tình thương, luôn no bụng và mau chóng tìm được mái ấm bình yên nha!'
  );
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useEffect(() => {
    if (defaultItem) {
      setSelectedItemId(defaultItem.id);
      setCustomItemName(isEn ? defaultItem.nameEn : defaultItem.name);
      setQuantity(1);
    } else {
      setSelectedItemId('');
      setCustomItemName('');
    }
    setIsSuccess(false);
  }, [defaultItem, isOpen, isEn]);

  if (!isOpen) return null;

  const displayName = isEn ? (shelter.nameEn || translateShelterName(shelter.name, 'en')) : shelter.name;
  const displayAddress = translateAddress(shelter.address, language);

  // All supplies from shelter
  const allItems: ShelterSupplyItem[] = shelter.neededSupplies?.flatMap(c => c.items) || [];
  const currentItem = allItems.find(i => i.id === selectedItemId);

  const effectiveItemTitle = currentItem 
    ? (isEn ? currentItem.nameEn : currentItem.name) 
    : customItemName || (isEn ? 'Food & Nutrition Package' : 'Thức ăn hạt dinh dưỡng');

  const effectiveFundAmount = customFundAmount 
    ? parseInt(customFundAmount.replace(/\D/g, '')) || 0 
    : selectedFundAmount;
  const effectiveFundKg = Math.round((effectiveFundAmount / 20000) * 10) / 10;

  const handleCopy = (text: string, type: 'address' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'address') {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmitPledge = (e: React.FormEvent) => {
    e.preventDefault();

    if (pledgeMode === 'FUNDS') {
      donateToFoodFund({
        campaignId: campaign.id,
        donorName: isAnonymous ? (isEn ? 'Anonymous Friend' : 'Một người bạn ẩn danh') : donorName || (isEn ? 'Supporter' : 'Nhà hảo tâm'),
        amount: effectiveFundAmount,
        message,
        isAnonymous,
        foodPackageName: `~${effectiveFundKg} kg (${displayName})`
      });
    }

    setIsSuccess(true);
    if (onSuccess) onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in text-left">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 dark:border-stone-800 transition-colors">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50/90 dark:bg-stone-950 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#fde2cd] dark:bg-amber-950/70 text-[#9c3810] dark:text-amber-300 flex items-center justify-center font-bold text-lg shadow-2xs">
              📦
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">
                  {isEn ? 'Pledge Supplies to Shelter' : 'Gửi tặng nhu yếu phẩm cho trạm'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                  {isEn ? 'Direct Support' : 'Trao trực tiếp'}
                </span>
              </div>
              <p className="text-[11.5px] text-stone-500 dark:text-stone-400 truncate max-w-xs sm:max-w-sm mt-0.5">
                {isEn ? 'Recipient Shelter:' : 'Trạm tiếp nhận:'} <b className="text-stone-800 dark:text-stone-200">{displayName}</b>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 text-xs text-stone-700 dark:text-stone-300">
          {isSuccess ? (
            /* SUCCESS SCREEN */
            <div className="py-6 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto text-3xl font-bold shadow-xs">
                ✓
              </div>

              <div className="space-y-1 max-w-md mx-auto">
                <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 font-display">
                  {isEn ? 'Pledge Confirmed!' : 'Đăng ký gửi quà thành công!'}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {isEn 
                    ? `Thank you for supporting ${displayName}! The shelter volunteers will be notified of your incoming package.` 
                    : `Cảm ơn bạn đã tiếp sức cho ${displayName}! Tình nguyện viên của trạm sẽ chuẩn bị tiếp nhận phần quà yêu thương của bạn.`}
                </p>
              </div>

              {/* Summary Voucher */}
              <div className="p-4 bg-[#faf4ee] dark:bg-stone-950 rounded-2xl border border-[#efe2d3] dark:border-stone-800 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-[#efe2d3] dark:border-stone-800 pb-2">
                  <span className="text-stone-500 dark:text-stone-400">{isEn ? 'Shelter:' : 'Trạm cứu hộ:'}</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{displayName}</span>
                </div>

                <div className="flex justify-between border-b border-[#efe2d3] dark:border-stone-800 pb-2">
                  <span className="text-stone-500 dark:text-stone-400">{isEn ? 'Item / Supply:' : 'Nhu yếu phẩm:'}</span>
                  <span className="font-bold text-[#d46b28] dark:text-amber-400">
                    {pledgeMode === 'FUNDS' 
                      ? `~${effectiveFundKg} kg hạt (${effectiveFundAmount.toLocaleString('vi-VN')}đ)` 
                      : `${quantity} ${quantityUnit} ${effectiveItemTitle}`}
                  </span>
                </div>

                <div className="flex justify-between border-b border-[#efe2d3] dark:border-stone-800 pb-2">
                  <span className="text-stone-500 dark:text-stone-400">{isEn ? 'Method:' : 'Hình thức:'}</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    {pledgeMode === 'SHIP' ? (isEn ? '🚚 Courier / Grab Ship' : '🚚 Gửi ship tận nơi') :
                     pledgeMode === 'DROPOFF' ? (isEn ? '🏠 In-person Drop-off' : '🏠 Mang trực tiếp đến trạm') :
                     (isEn ? '🌾 Direct Bank Transfer' : '🌾 Chuyển khoản trực tiếp')}
                  </span>
                </div>

                <div className="flex justify-between border-b border-[#efe2d3] dark:border-stone-800 pb-2">
                  <span className="text-stone-500 dark:text-stone-400">{isEn ? 'Recipient Address:' : 'Địa chỉ giao:'}</span>
                  <span className="font-medium text-stone-800 dark:text-stone-200 text-right max-w-[220px] truncate">{displayAddress}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-stone-500 dark:text-stone-400">{isEn ? 'Shelter Hotline:' : 'Hotline nhận:'}</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{shelter.phone}</span>
                </div>
              </div>

              <div className="pt-3 flex justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#d46b28] hover:bg-[#ba591a] text-white text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  {isEn ? 'Done & Close' : 'Hoàn tất & Đóng'}
                </button>
              </div>
            </div>
          ) : (
            /* FORM SCREEN */
            <form onSubmit={handleSubmitPledge} className="space-y-5">
              
              {/* 1. Fulfillment Mode Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
                  {isEn ? '1. Choose Delivery / Support Method:' : '1. Chọn hình thức gửi tặng / tiếp sức:'}
                </label>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPledgeMode('SHIP')}
                    className={`p-3 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center gap-1.5 ${
                      pledgeMode === 'SHIP'
                        ? 'bg-[#faf4ee] dark:bg-amber-950/40 border-[#d46b28] text-[#9c3810] dark:text-amber-300 font-bold shadow-2xs ring-1 ring-[#d46b28]'
                        : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-750'
                    }`}
                  >
                    <Truck className="w-5 h-5 text-[#d46b28]" />
                    <span className="text-xs">{isEn ? 'Ship via Courier' : 'Gửi Ship tận nơi'}</span>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 font-normal">Grab / Viettel / Shopee</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPledgeMode('DROPOFF')}
                    className={`p-3 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center gap-1.5 ${
                      pledgeMode === 'DROPOFF'
                        ? 'bg-[#faf4ee] dark:bg-amber-950/40 border-[#d46b28] text-[#9c3810] dark:text-amber-300 font-bold shadow-2xs ring-1 ring-[#d46b28]'
                        : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-750'
                    }`}
                  >
                    <Home className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs">{isEn ? 'Drop off in Person' : 'Mang trực tiếp'}</span>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 font-normal">{isEn ? 'Visit Shelter' : 'Đến tận trạm'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPledgeMode('FUNDS')}
                    className={`p-3 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center gap-1.5 ${
                      pledgeMode === 'FUNDS'
                        ? 'bg-[#faf4ee] dark:bg-amber-950/40 border-[#d46b28] text-[#9c3810] dark:text-amber-300 font-bold shadow-2xs ring-1 ring-[#d46b28]'
                        : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-750'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-sky-600" />
                    <span className="text-xs">{isEn ? 'Sponsor Food (QR)' : 'Chuyển khoản trạm'}</span>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 font-normal">{isEn ? 'Direct Bank/MoMo' : 'Quy đổi kg hạt'}</span>
                  </button>
                </div>
              </div>

              {/* 2. Item / Supply Selection */}
              {pledgeMode !== 'FUNDS' ? (
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700 space-y-3">
                  <label className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
                    {isEn ? '2. Select Item or Supply to Send:' : '2. Chọn món nhu yếu phẩm dự kiến gửi:'}
                  </label>

                  {/* Dropdown for item */}
                  <select
                    value={selectedItemId}
                    onChange={(e) => {
                      setSelectedItemId(e.target.value);
                      const itm = allItems.find(i => i.id === e.target.value);
                      if (itm) {
                        setCustomItemName(isEn ? itm.nameEn : itm.name);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 text-xs font-medium text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-900 focus:ring-2 focus:ring-[#d46b28] focus:outline-none"
                  >
                    <option value="">{isEn ? '-- Select from current shelter needs --' : '-- Chọn từ danh mục nhu cầu của trạm --'}</option>
                    {allItems.map(item => (
                      <option key={item.id} value={item.id}>
                        {isEn ? item.nameEn : item.name} ({isEn ? `Need: ${item.quantityNeededEn}` : `Cần: ${item.quantityNeeded}`})
                      </option>
                    ))}
                  </select>

                  {/* Custom item name if not in list */}
                  {!selectedItemId && (
                    <input
                      type="text"
                      value={customItemName}
                      onChange={(e) => setCustomItemName(e.target.value)}
                      placeholder={isEn ? 'Or type custom item name (e.g. 10 kg cat food, 5 blankets)...' : 'Hoặc nhập tên món quà khác (VD: 10 kg hạt mèo, 5 tấm chăn bông)...'}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-600 text-xs text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-900"
                    />
                  )}

                  {/* Quantity & Unit */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 block mb-1">
                        {isEn ? 'Quantity / Weight:' : 'Số lượng / Trọng lượng:'}
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-600 text-xs font-bold text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-900"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 block mb-1">
                        {isEn ? 'Unit:' : 'Đơn vị tính:'}
                      </label>
                      <select
                        value={quantityUnit}
                        onChange={(e) => setQuantityUnit(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-600 text-xs font-medium text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-900"
                      >
                        <option value="kg">kg ({isEn ? 'Kilograms' : 'Kilôgam'})</option>
                        <option value={isEn ? 'bags' : 'bao'}>{isEn ? 'Bags / Sacks' : 'Bao / Gói'}</option>
                        <option value={isEn ? 'cans' : 'lon'}>{isEn ? 'Cans / Tins' : 'Lon / Hộp'}</option>
                        <option value={isEn ? 'boxes' : 'thùng'}>{isEn ? 'Boxes / Cartons' : 'Thùng'}</option>
                        <option value={isEn ? 'items' : 'cái/chiếc'}>{isEn ? 'Items / Pieces' : 'Cái / Chiếc'}</option>
                        <option value={isEn ? 'bottles' : 'chai/lọ'}>{isEn ? 'Bottles' : 'Chai / Lọ'}</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                /* FOOD FUND / BANK TRANSFER FORM */
                <div className="p-4 rounded-2xl bg-[#faf4ee] dark:bg-stone-800/80 border border-[#efe2d3] dark:border-stone-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-800 dark:text-stone-200">
                      {isEn ? 'Sponsor Kibble via Direct Transfer:' : 'Tiếp sức kg hạt qua chuyển khoản trực tiếp:'}
                    </label>
                    <span className="text-[11px] font-bold text-[#d46b28] dark:text-amber-400">
                      20.000đ ≈ 1 kg hạt
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={customFundAmount || (selectedFundAmount ? selectedFundAmount.toLocaleString('vi-VN') : '')}
                      onChange={(e) => {
                        const numeric = e.target.value.replace(/\D/g, '');
                        setCustomFundAmount(numeric);
                        if (numeric) setSelectedFundAmount(parseInt(numeric));
                      }}
                      placeholder="VD: 100,000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 text-sm font-bold text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-900"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-500">
                      VNĐ
                    </span>
                  </div>

                  {/* Quick Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      { label: '+2.5 kg (50k)', val: 50000 },
                      { label: '+5 kg (100k)', val: 100000 },
                      { label: '+10 kg (200k)', val: 200000 },
                      { label: '+25 kg (500k)', val: 500000 },
                    ].map(chip => (
                      <button
                        key={chip.label}
                        type="button"
                        onClick={() => {
                          setSelectedFundAmount(chip.val);
                          setCustomFundAmount(chip.val.toLocaleString('vi-VN'));
                        }}
                        className="px-2.5 py-1 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-[11px] font-semibold text-stone-700 dark:text-stone-300 hover:bg-[#fde2cd] dark:hover:bg-stone-700 cursor-pointer"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>

                  {/* Live kg conversion banner */}
                  <div className="p-2.5 rounded-xl bg-amber-100/70 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 flex items-center justify-between font-bold">
                    <span>{isEn ? 'Equivalent to Sponsoring:' : 'Tương đương tiếp sức:'}</span>
                    <span className="text-[#d46b28] dark:text-amber-400 font-black">
                      ~ {effectiveFundKg} kg hạt (~ {Math.round(effectiveFundKg * 2)} bữa ăn no)
                    </span>
                  </div>

                  {/* QR & Bank Information */}
                  <div className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 flex items-center gap-3 text-xs">
                    <div className="w-20 h-20 bg-stone-50 dark:bg-stone-800 p-1 rounded-lg border border-stone-200 dark:border-stone-700 shrink-0">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=PETCARE-SUPPLY-${shelter.id}-${effectiveFundAmount}`}
                        alt="QR"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="text-[11px] text-stone-500 dark:text-stone-400">
                        {isEn ? 'Direct Shelter Account:' : 'Số tài khoản chính thức của trạm:'}
                      </div>
                      <div className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                        {campaign.bankAccount.accountNumber}
                      </div>
                      <div className="font-semibold text-stone-800 dark:text-stone-200 truncate">
                        {campaign.bankAccount.bankName} - {campaign.bankAccount.accountHolder}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Shelter Receiving Info Box (Crucial for Grab / Viettel Delivery) */}
              <div className="p-4 rounded-2xl bg-[#faf4ee] dark:bg-stone-950 border border-[#efe2d3] dark:border-stone-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#9c3810] dark:text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {isEn ? 'SHELTER RECEIVING ADDRESS' : 'ĐỊA CHỈ & HOTLINE TIẾP NHẬN CỦA TRẠM'}
                  </span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400">
                    {shelter.operatingHours}
                  </span>
                </div>

                <div className="space-y-1.5 pt-1 text-stone-800 dark:text-stone-200">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold leading-snug">
                      <b>{displayName}:</b> {displayAddress}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleCopy(displayAddress, 'address')}
                      className="p-1.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 text-stone-600 dark:text-stone-300 shrink-0 cursor-pointer"
                      title={isEn ? 'Copy Address' : 'Sao chép địa chỉ'}
                    >
                      {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#efe2d3] dark:border-stone-800">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#d46b28]" />
                      <span>Hotline: <b className="font-mono text-stone-900 dark:text-stone-100">{shelter.phone}</b></span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(shelter.phone, 'phone')}
                      className="p-1.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 text-stone-600 dark:text-stone-300 shrink-0 cursor-pointer"
                      title={isEn ? 'Copy Phone' : 'Sao chép số điện thoại'}
                    >
                      {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* 4. Donor Info & Notes */}
              <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-stone-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-stone-800 dark:text-stone-200">
                        {isEn ? 'Your Name / Nickname:' : 'Họ tên / Biệt danh:'}
                      </label>
                      <label className="flex items-center gap-1 text-[11px] text-stone-500 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="rounded text-[#d46b28] border-stone-300"
                        />
                        <span>{isEn ? 'Anon' : 'Ẩn danh'}</span>
                      </label>
                    </div>
                    {!isAnonymous && (
                      <input
                        type="text"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder={isEn ? 'Your name...' : 'Nhập tên của bạn...'}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-600 text-xs text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-900"
                      />
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-800 dark:text-stone-200 block mb-1">
                      {isEn ? 'Your Phone / Zalo (Optional):' : 'Số điện thoại / Zalo (Tùy chọn):'}
                    </label>
                    <input
                      type="tel"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      placeholder="VD: 0912 345 678"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-600 text-xs text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-900"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800 dark:text-stone-200">
                    {isEn ? 'Message & Delivery note to shelter:' : 'Lời nhắn gửi gắm đến các bé và trạm:'}
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={isEn ? 'Your encouragement message or expected delivery date...' : 'Lời chúc yêu thương hoặc thời gian dự kiến giao...'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-600 text-xs text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-900 focus:ring-2 focus:ring-[#d46b28]"
                  />
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 flex justify-between items-center border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-bold text-xs transition cursor-pointer"
                >
                  {isEn ? 'Cancel' : 'Hủy bỏ'}
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#d46b28] hover:bg-[#ba591a] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                >
                  <span>{isEn ? 'Confirm Pledge' : 'Xác nhận đăng ký'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
