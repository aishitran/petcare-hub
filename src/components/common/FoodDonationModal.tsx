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
  AlertTriangle
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

  // Delivery mode: 'SHIP' (Direct courier/Grab), 'DROPOFF' (In person) - Cash transfer hidden to prevent abuse
  const [pledgeMode, setPledgeMode] = useState<'SHIP' | 'DROPOFF'>('SHIP');
  
  // Selected category & item
  const [selectedItemId, setSelectedItemId] = useState<string>(defaultItem?.id || '');
  const [customItemName, setCustomItemName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(defaultItem ? 1 : 5);
  const [quantityUnit, setQuantityUnit] = useState<string>(isEn ? 'kg' : 'kg');

  // 10-Second Auto Countdown Alert
  const [alertCountdown, setAlertCountdown] = useState<number>(10);
  const [showAlertBanner, setShowAlertBanner] = useState<boolean>(true);

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
    setAlertCountdown(10);
    setShowAlertBanner(true);
  }, [defaultItem, isOpen, isEn]);

  // 10-second countdown effect
  useEffect(() => {
    if (!isOpen || !showAlertBanner) return;
    if (alertCountdown <= 0) {
      setShowAlertBanner(false);
      return;
    }

    const timer = setInterval(() => {
      setAlertCountdown(prev => {
        if (prev <= 1) {
          setShowAlertBanner(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, showAlertBanner, alertCountdown]);

  if (!isOpen) return null;

  const displayName = isEn ? (shelter.nameEn || translateShelterName(shelter.name, 'en')) : shelter.name;
  const displayAddress = translateAddress(shelter.address, language);

  // All supplies from shelter
  const allItems: ShelterSupplyItem[] = shelter.neededSupplies?.flatMap(c => c.items) || [];
  const currentItem = allItems.find(i => i.id === selectedItemId);

  const effectiveItemTitle = currentItem 
    ? (isEn ? currentItem.nameEn : currentItem.name) 
    : customItemName || (isEn ? 'Food & Nutrition Package' : 'Thức ăn hạt dinh dưỡng');

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
    setIsSuccess(true);
    if (onSuccess) onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in text-left">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 dark:border-stone-800 transition-colors overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50/90 dark:bg-stone-950 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#fde2cd] dark:bg-amber-950/70 text-[#9c3810] dark:text-amber-300 flex items-center justify-center font-bold text-lg shadow-2xs">
              📦
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">
                  {isEn ? 'Send Physical Supplies to Shelter' : 'Gửi tặng nhu yếu phẩm cho trạm'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                  {isEn ? 'Direct Goods Only' : 'Trao hiện vật'}
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

        {/* 10-Second Countdown Push Alert Banner */}
        {showAlertBanner && (
          <div className="bg-amber-500 text-stone-950 px-4 py-2.5 flex items-center justify-between gap-3 text-xs font-bold shrink-0 animate-in slide-in-from-top">
            <div className="flex items-center gap-2 min-w-0">
              <AlertTriangle className="w-4 h-4 shrink-0 text-stone-950" />
              <span className="leading-snug">
                {isEn 
                  ? '⚠️ Policy Notice: Monetary/cash donations are NOT encouraged. Please send actual kibble, pate, or medical goods directly.' 
                  : '⚠️ Lưu ý minh bạch: Nền tảng không khuyến khích dùng vật chất/tiền mặt để quyên góp. Khuyến khích gửi trực tiếp thức ăn hạt, pate hoặc thuốc.'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 bg-stone-950 text-amber-300 px-2 py-0.5 rounded-lg text-[10px]">
              <span>{alertCountdown}s</span>
              <button 
                onClick={() => setShowAlertBanner(false)}
                className="hover:text-white cursor-pointer ml-1"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Form Body (Fitted and snug) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 text-xs text-stone-700 dark:text-stone-300 space-y-5">
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
                    {quantity} {quantityUnit} {effectiveItemTitle}
                  </span>
                </div>

                <div className="flex justify-between border-b border-[#efe2d3] dark:border-stone-800 pb-2">
                  <span className="text-stone-500 dark:text-stone-400">{isEn ? 'Method:' : 'Hình thức:'}</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    {pledgeMode === 'SHIP' ? (isEn ? '🚚 Courier / Grab Ship' : '🚚 Gửi ship tận nơi') : (isEn ? '🏠 In-person Drop-off' : '🏠 Mang trực tiếp đến trạm')}
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
              
              {/* 1. Fulfillment Mode Selector (Bank transfer hidden) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
                  {isEn ? '1. Choose Delivery Method (Direct Goods Only):' : '1. Chọn hình thức gửi tặng hiện vật (Không chuyển khoản):'}
                </label>
                
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Mode 1: Shipper / Courier */}
                  <button
                    type="button"
                    onClick={() => setPledgeMode('SHIP')}
                    className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer ${
                      pledgeMode === 'SHIP'
                        ? 'border-[#d46b28] bg-[#fde2cd]/40 dark:bg-amber-950/40 text-[#9c3810] dark:text-amber-300 ring-2 ring-[#d46b28]'
                        : 'border-stone-200 dark:border-stone-750 bg-stone-50/70 dark:bg-stone-850 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#d46b28] shrink-0" />
                      <span className="font-bold text-xs">{isEn ? 'Courier / Shipper' : 'Gửi qua Shipper / Grab'}</span>
                    </div>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 mt-1 block">
                      {isEn ? 'Order via Shopee, Grab, Ahamove directly to shelter' : 'Đặt qua Grab / Shopee / ViettelPost giao thẳng trạm'}
                    </span>
                  </button>

                  {/* Mode 2: In person */}
                  <button
                    type="button"
                    onClick={() => setPledgeMode('DROPOFF')}
                    className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer ${
                      pledgeMode === 'DROPOFF'
                        ? 'border-[#d46b28] bg-[#fde2cd]/40 dark:bg-amber-950/40 text-[#9c3810] dark:text-amber-300 ring-2 ring-[#d46b28]'
                        : 'border-stone-200 dark:border-stone-750 bg-stone-50/70 dark:bg-stone-850 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-[#d46b28] shrink-0" />
                      <span className="font-bold text-xs">{isEn ? 'In-Person Drop-off' : 'Mang trực tiếp đến trạm'}</span>
                    </div>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 mt-1 block">
                      {isEn ? 'Visit shelter, hand over supplies & pet visiting' : 'Ghé thăm trạm và trao trực tiếp cho các bé'}
                    </span>
                  </button>
                </div>
              </div>

              {/* 2. Shelter Address Card with Quick Copy */}
              <div className="p-3.5 bg-stone-50 dark:bg-stone-800/80 rounded-2xl border border-stone-200/80 dark:border-stone-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    {isEn ? 'Shelter Delivery Address & Contact:' : 'Địa chỉ giao hàng & Liên hệ nhận:'}
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{isEn ? 'Open 08:00 - 18:00' : 'Mở cửa 08:00 - 18:00'}</span>
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-1.5 min-w-0">
                      <MapPin className="w-3.5 h-3.5 text-[#d46b28] shrink-0 mt-0.5" />
                      <span className="font-semibold text-stone-900 dark:text-stone-100">{displayAddress}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(shelter.address, 'address')}
                      className="text-[11px] font-bold text-[#d46b28] hover:underline shrink-0 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedAddress ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedAddress ? (isEn ? 'Copied' : 'Đã sao chép') : (isEn ? 'Copy' : 'Sao chép')}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-stone-200/50 dark:border-stone-700">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#d46b28]" />
                      <span>{isEn ? 'Hotline:' : 'Số điện thoại nhận hàng:'} <b className="text-stone-900 dark:text-stone-100">{shelter.phone}</b></span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(shelter.phone, 'phone')}
                      className="text-[11px] font-bold text-[#d46b28] hover:underline shrink-0 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedPhone ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedPhone ? (isEn ? 'Copied' : 'Đã sao chép') : (isEn ? 'Copy' : 'Sao chép')}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. Item Selection & Quantity */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
                  {isEn ? '2. Select Supply Item to Send:' : '2. Chọn vật phẩm gửi tặng:'}
                </label>

                {allItems.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {allItems.slice(0, 6).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSelectedItemId(item.id);
                          setCustomItemName('');
                          const parsedUnit = item.quantityNeeded.split(' ').slice(1).join(' ') || 'kg';
                          setQuantityUnit(parsedUnit);
                        }}
                        className={`p-2.5 rounded-xl border text-left text-xs transition cursor-pointer flex flex-col justify-between ${
                          selectedItemId === item.id
                            ? 'border-[#d46b28] bg-[#fde2cd]/40 dark:bg-amber-950/40 text-[#9c3810] dark:text-amber-300 font-bold'
                            : 'border-stone-200 dark:border-stone-750 bg-white dark:bg-stone-850 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        <span className="truncate">{isEn ? item.nameEn : item.name}</span>
                        <span className="text-[10px] text-stone-400 font-normal mt-1">
                          {isEn ? 'Needed:' : 'Cần:'} {isEn ? item.quantityNeededEn : item.quantityNeeded}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 block mb-1">
                      {isEn ? 'Or enter custom item name:' : 'Hoặc nhập tên vật phẩm khác:'}
                    </label>
                    <input
                      type="text"
                      value={customItemName}
                      onChange={(e) => {
                        setCustomItemName(e.target.value);
                        setSelectedItemId('');
                      }}
                      placeholder={isEn ? 'E.g. Royal Canin Mother & Babycat 2kg, Pet Drap...' : 'Ví dụ: Hạt Royal Canin Mèo con 2kg, Tã lót chuồng...'}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-[#d46b28]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 block mb-1">
                      {isEn ? 'Quantity:' : 'Số lượng:'}
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 font-bold focus:ring-2 focus:ring-[#d46b28]"
                      />
                      <span className="text-xs text-stone-500 font-bold shrink-0">{quantityUnit}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Sender Contact Info */}
              <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-stone-800">
                <label className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
                  {isEn ? '3. Sender Information:' : '3. Thông tin người gửi:'}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 block mb-1">
                      {isEn ? 'Your Name / Nickname:' : 'Họ và tên / Biệt danh:'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder={isEn ? 'Enter your name' : 'Nhập tên của bạn'}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-[#d46b28]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 block mb-1">
                      {isEn ? 'Contact Phone:' : 'Số điện thoại liên hệ:'} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      placeholder="09xx xxx xxx"
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-[#d46b28]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 block mb-1">
                    {isEn ? 'Warm Wish or Note for Volunteers:' : 'Lời chúc hoặc nhắn nhủ tới trạm:'}
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={isEn ? 'Send encouragement to shelter caretakers...' : 'Nhắn gửi yêu thương tới các bé...'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-[#d46b28]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold transition cursor-pointer"
                >
                  {isEn ? 'Cancel' : 'Hủy bỏ'}
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#d46b28] hover:bg-[#ba591a] text-white text-xs font-bold transition flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Package className="w-4 h-4" />
                  <span>{isEn ? 'Confirm Supply Pledge' : 'Xác nhận đăng ký gửi hàng'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
