import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { mockEmergencyShelters } from '../../data/mockEmergencyShelters';
import { RescueCategory, RescuePriority } from '../../types/rescue';
import { translateCity, translateDistrict, translateShelterName, translateAddress } from '../../utils/addressTranslator';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Camera, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  Navigation,
  HeartHandshake,
  Send,
  Building2,
  AlertCircle
} from 'lucide-react';

interface ReportStreetRescueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessNavigate?: (rescueId: string) => void;
  onOpenDirectory?: () => void;
}

export const ReportStreetRescueModal: React.FC<ReportStreetRescueModalProps> = ({
  isOpen,
  onClose,
  onSuccessNavigate,
  onOpenDirectory
}) => {
  const { language, t } = useLanguage();
  const { createRescuePost } = useData();
  const { currentUser, role } = useAuth();

  const [petType, setPetType] = useState<'Chó' | 'Mèo' | 'Khác'>('Chó');
  const [incidentType, setIncidentType] = useState<string>('Bị tai nạn giao thông');
  const [title, setTitle] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('TP. Hồ Chí Minh');
  const [district, setDistrict] = useState('Quận Bình Thạnh');
  const [selectedShelterId, setSelectedShelterId] = useState<string>(mockEmergencyShelters[0]?.id || '');
  const [description, setDescription] = useState('');
  const [quantityNeeded, setQuantityNeeded] = useState('Cần xe cứu hộ đến gấp & hỗ trợ viện phí cấp cứu');
  const [priority, setPriority] = useState<RescuePriority>('URGENT');
  const [contactName, setContactName] = useState(currentUser?.name || 'Người đi đường cứu hộ');
  const [contactPhone, setContactPhone] = useState(currentUser?.phone || '0988 123 456');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&auto=format&fit=crop');
  const [isNonProfitChecked, setIsNonProfitChecked] = useState(true);
  
  const [submittedRescueId, setSubmittedRescueId] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentShelters = mockEmergencyShelters.filter(s => s.city === city);
  const selectedShelter = mockEmergencyShelters.find(s => s.id === selectedShelterId) || mockEmergencyShelters[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fullTitle = title.trim() || `[SOS Đường Phố] ${incidentType} - ${petType} cần cứu hộ gấp tại ${district}, ${city}`;
    const fullLocation = `${streetAddress}, ${district}, ${city}`;

    const newPost = createRescuePost({
      creatorUserId: currentUser?.id || 'guest-rescue',
      creatorUserName: contactName,
      creatorUserAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop',
      creatorUserPhone: contactPhone,
      shelterName: selectedShelter.name,
      shelterHotline: selectedShelter.hotline,
      shelterAddress: selectedShelter.address,
      isNonProfitCommitment: isNonProfitChecked,
      title: fullTitle,
      category: 'SHELTER_SUPPORT' as RescueCategory,
      priority: priority,
      description: `【BÁO CÁO CỨU HỘ ĐƯỜNG PHỐ KHẨN CẤP】
- Loại thú cưng: ${petType}
- Tình trạng gặp nạn: ${incidentType}
- Vị trí phát hiện: ${fullLocation}
- Chi tiết mô tả: ${description || 'Người đi đường phát hiện bé đang gặp nguy hiểm, cần trạm cứu hộ hoặc tình nguyện viên gần nhất điều phối hỗ trợ.'}
- Trạm tiếp nhận phối hợp: ${selectedShelter.name} (Hotline: ${selectedShelter.hotline})
- Cam kết: Hoàn toàn phi lợi nhuận, minh bạch và không vụ lợi.`,
      quantityNeeded: quantityNeeded,
      images: [photoUrl],
      requiredDate: new Date().toLocaleDateString('vi-VN'),
      supportLocation: `${district}, ${city}`,
      contactPerson: contactName,
      contactPhone: contactPhone,
      notes: 'Báo cáo khẩn cấp từ người dân phát hiện thú cưng ngoài đường.'
    });

    setSubmittedRescueId(newPost.id);
  };

  const handleResetAndClose = () => {
    setSubmittedRescueId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in text-left">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 bg-rose-950 text-white flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-rose-500/30 text-rose-200 text-[11px] font-bold tracking-wide uppercase border border-rose-400/30">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              {t('emergency.reportModalTag')}
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display text-white">
              {t('emergency.reportModalTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              {t('emergency.reportModalSub')}
            </p>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition cursor-pointer"
            aria-label={t('common.close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          
          {submittedRescueId ? (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-xl font-black text-stone-900 font-display">
                  {t('emergency.successSosTitle')}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {t('emergency.successSosDesc')}
                </p>
              </div>

              {/* Nearest Shelter Quick Contact Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 border border-rose-200 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    {t('emergency.nearestShelterTag')}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-200 text-rose-900">
                    24/7
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{selectedShelter.name}</h4>
                  <p className="text-xs text-stone-600 mt-0.5 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                    <span>{selectedShelter.address}</span>
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <a
                    href={`tel:${selectedShelter.hotline.replace(/\s+/g, '')}`}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{t('emergency.callShelter')}: {selectedShelter.hotline}</span>
                  </a>

                  {selectedShelter.googleMapsUrl && (
                    <a
                      href={selectedShelter.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-stone-50 transition"
                    >
                      <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t('emergency.getDirections')}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition cursor-pointer"
                >
                  {t('common.close')}
                </button>
                {onSuccessNavigate && (
                  <button
                    type="button"
                    onClick={() => {
                      const id = submittedRescueId;
                      handleResetAndClose();
                      onSuccessNavigate(id);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#d46b28] hover:bg-[#ba591a] text-white text-xs font-bold shadow-xs transition cursor-pointer"
                  >
                    {t('emergency.viewRescuePostBtn')}
                  </button>
                )}
              </div>

            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Emergency Alert Banner */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {t('emergency.emergencyWarning')}
                </p>
              </div>

              {/* 1. Pet Type & Incident Situation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">{t('emergency.petTypeLabel')}</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Chó', 'Mèo', 'Khác'] as const).map(type => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setPetType(type)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                          petType === type
                            ? 'bg-[#d46b28] text-white border-[#d46b28]'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {type === 'Chó' ? t('common.dog') : type === 'Mèo' ? t('common.cat') : t('common.other')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">{t('emergency.incidentTypeLabel')}</label>
                  <select
                    value={incidentType}
                    onChange={(e) => setIncidentType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-[#d46b28] bg-stone-50"
                  >
                    <option value="Bị tai nạn giao thông">{language === 'en' ? 'Traffic Accident / Injured' : 'Bị tai nạn xe tông chấn thương'}</option>
                    <option value="Bị bỏ rơi kiệt sức">{language === 'en' ? 'Abandoned in Box / Exhausted' : 'Bị bỏ rơi trong thùng xốp/bì tải'}</option>
                    <option value="Bị gãy chân / thương tích nặng">{language === 'en' ? 'Severe Trauma / Fracture' : 'Bị thương tích nặng / gãy chân / chảy máu'}</option>
                    <option value="Bị bẫy trộm / ngược đãi">{language === 'en' ? 'Trapped / Abused / Stolen' : 'Bị bẫy trộm / ngược đãi / bạo hành'}</option>
                    <option value="Bị kẹt cống / nguy hiểm">{language === 'en' ? 'Trapped in Drain / Danger' : 'Bị kẹt cống / giếng / trên cao'}</option>
                    <option value="Chó mèo con mồ côi">{language === 'en' ? 'Orphaned Puppies / Kittens' : 'Đàn chó/mèo con sơ sinh mồ côi'}</option>
                  </select>
                </div>
              </div>

              {/* 2. Exact Location on Street */}
              <div className="space-y-3 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                  <MapPin className="w-4 h-4 text-rose-600" />
                  <span>{t('emergency.streetLocTitle')}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600">{t('emergency.cityLabel')}</label>
                    <select
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        const first = mockEmergencyShelters.find(s => s.city === e.target.value);
                        if (first) setSelectedShelterId(first.id);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white"
                    >
                      <option value="TP. Hồ Chí Minh">{translateCity('TP. Hồ Chí Minh', language)}</option>
                      <option value="Hà Nội">{translateCity('Hà Nội', language)}</option>
                      <option value="Đà Nẵng">{translateCity('Đà Nẵng', language)}</option>
                      <option value="Cần Thơ">{translateCity('Cần Thơ', language)}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-600">{t('emergency.districtLabel')}</label>
                    <input
                      type="text"
                      required
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="Ví dụ: Quận Bình Thạnh, Q. Đống Đa..."
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600">{t('emergency.addressDetailsLabel')}</label>
                  <input
                    type="text"
                    required
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="Ví dụ: Trước cửa số 152/24 Nguyễn Xí, gần cây xăng, dưới gốc cây..."
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white"
                  />
                </div>
              </div>

              {/* 3. Shelter Station to Coordinate */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-stone-800 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#d46b28]" />
                    {t('emergency.shelterCoordLabel')}
                  </label>
                  {onOpenDirectory && (
                    <button
                      type="button"
                      onClick={onOpenDirectory}
                      className="text-[11px] text-[#d46b28] font-bold hover:underline cursor-pointer"
                    >
                      {t('emergency.lookupBtn')} →
                    </button>
                  )}
                </div>

                <select
                  value={selectedShelterId}
                  onChange={(e) => setSelectedShelterId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-900 bg-stone-50"
                >
                  {currentShelters.map(shelter => (
                    <option key={shelter.id} value={shelter.id}>
                      {translateShelterName(shelter.name, language)} — Hotline: {shelter.hotline} ({translateDistrict(shelter.district, language)})
                    </option>
                  ))}
                </select>

                <div className="p-3 rounded-xl bg-orange-50/80 border border-orange-200 text-xs text-stone-900 flex items-center justify-between">
                  <div>
                    <span className="font-bold">{t('emergency.shelterAddressLabel')} </span>
                    <span>{translateAddress(selectedShelter.address, language)}</span>
                  </div>
                  <a
                    href={`tel:${selectedShelter.hotline.replace(/\s+/g, '')}`}
                    className="px-2.5 py-1 rounded-lg bg-[#d46b28] hover:bg-[#ba591a] text-white font-bold text-[11px] shrink-0 ml-2"
                  >
                    {t('emergency.callShelter')}: {selectedShelter.hotline}
                  </a>
                </div>
              </div>

              {/* 4. Description & Needs */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">{t('emergency.descLabel')}</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ví dụ: Chó cỏ màu vàng khoảng 8kg, chân sau bị sưng to không đi được, đang nằm thở dốc ở vỉa hè..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#d46b28]"
                />
              </div>

              {/* 5. Contact Info of Reporter */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700">{t('emergency.reporterNameLabel')}</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#d46b28]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700">{t('emergency.reporterPhoneLabel')}</label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#d46b28]"
                  />
                </div>
              </div>

              {/* 6. Non-Profit Anti-Profiteering Checkbox */}
              <div className="p-3 rounded-xl bg-stone-100 border border-stone-200">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={isNonProfitChecked}
                    onChange={(e) => setIsNonProfitChecked(e.target.checked)}
                    className="mt-0.5 rounded text-[#d46b28] focus:ring-[#d46b28]"
                  />
                  <div className="text-xs text-stone-700 leading-tight">
                    <span className="font-bold text-stone-900">{t('emergency.nonProfitPledgeTitle')} </span>
                    {t('emergency.nonProfitPledgeDesc')}
                  </div>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition cursor-pointer"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('emergency.sendSosBtn')}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
