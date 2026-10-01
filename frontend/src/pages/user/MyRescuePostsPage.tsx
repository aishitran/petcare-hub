import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { RescuePost, RescueCategory, RescuePriority } from '../../types/rescue';
import { translateAddress } from '../../utils/addressTranslator';
import { translateRescuePostData, translateDynamicText } from '../../utils/dataTranslator';
import { 
  Flame, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  HeartHandshake, 
  AlertTriangle,
  Upload,
  Image as ImageIcon,
  ShieldCheck,
  Building,
  Phone
} from 'lucide-react';

interface MyRescuePostsPageProps {
  navigate: (path: string) => void;
}

export const MyRescuePostsPage: React.FC<MyRescuePostsPageProps> = ({ navigate }) => {
  const { currentUser } = useAuth();
  const { rescuePosts, createRescuePost, updateRescuePostStatus } = useData();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<RescueCategory>('SHELTER_SUPPORT');
  const [priority, setPriority] = useState<RescuePriority>('URGENT');
  const [description, setDescription] = useState('');
  const [quantityNeeded, setQuantityNeeded] = useState('');
  const [requiredDate, setRequiredDate] = useState('2026-09-20');
  const [supportLocation, setSupportLocation] = useState('Quận Bình Thạnh, TP.HCM');
  const [shelterName, setShelterName] = useState('Trạm Cứu Hộ Động Vật Liên Kết');
  const [shelterHotline, setShelterHotline] = useState(currentUser?.phone || '');
  const [shelterAddress, setShelterAddress] = useState('Số 45/2 Điện Biên Phủ, Phường 15, Bình Thạnh, TP.HCM');
  const [contactPhone, setContactPhone] = useState(currentUser?.phone || '');
  const [sampleImg, setSampleImg] = useState('https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600');

  if (!currentUser) return null;

  const myRescues = rescuePosts.filter(r => r.creatorUserId === currentUser.id);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createRescuePost({
      creatorUserId: currentUser.id,
      creatorUserName: currentUser.name,
      creatorUserAvatar: currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      creatorUserPhone: contactPhone || currentUser.phone,
      shelterName,
      shelterHotline: shelterHotline || contactPhone || currentUser.phone,
      shelterAddress: shelterAddress || supportLocation,
      isNonProfitCommitment: true,
      title,
      category,
      priority,
      description,
      quantityNeeded,
      requiredDate,
      supportLocation,
      contactPerson: currentUser.name,
      contactPhone: contactPhone || currentUser.phone,
      images: [sampleImg]
    });

    setIsCreateModalOpen(false);
    setTitle('');
    setDescription('');
    setQuantityNeeded('');
  };

  const handleComplete = (id: string) => {
    updateRescuePostStatus(id, 'COMPLETED');
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 font-display">
            {isEn ? 'My Rescue Appeals & Cases' : 'Tin cứu trợ của tôi'}
          </h1>
          <p className="text-xs text-stone-500">
            {isEn 
              ? 'Manage medical funding, food relief, or temporary foster appeals for animals in distress.' 
              : 'Quản lý các ca kêu gọi hỗ trợ viện phí, thực phẩm hoặc nuôi tạm cho các bé gặp nạn.'}
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-rose-950/20"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{isEn ? 'Create Rescue Appeal' : 'Tạo bài kêu gọi cứu hộ'}</span>
        </button>
      </div>

      {/* Rescue Posts List */}
      {myRescues.length > 0 ? (
        <div className="space-y-4">
          {myRescues.map(rawPost => {
            const post = translateRescuePostData(rawPost, language);
            return (
              <div 
                key={post.id}
                className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-5 shadow-xs space-y-4 hover:border-rose-300 dark:hover:border-rose-900/50 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={post.images[0] || 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=200'}
                      alt=""
                      className="w-20 h-20 rounded-2xl object-cover shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-[#2b2523] dark:text-stone-100 text-base">{post.title}</h3>
                        <StatusBadge status={post.status} />
                        <StatusBadge status={post.priority} />
                      </div>

                      <p className="text-xs text-[#665851] dark:text-stone-400 mt-1 flex items-center gap-2">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-stone-400" /> {translateAddress(post.supportLocation, language)}</span>
                        <span>•</span>
                        <span>{isEn ? 'Deadline:' : 'Hạn:'} {post.requiredDate}</span>
                      </p>

                      <div className="mt-2 text-xs font-bold text-[#9c3810] dark:text-amber-300 bg-[#fde2cd]/40 dark:bg-amber-950/40 px-3 py-1 rounded-xl inline-block border border-[#efe2d3] dark:border-amber-900/40">
                        {isEn ? 'Needed:' : 'Cần:'} {post.quantityNeeded} • {isEn ? `Received ${post.supportsCount} pledges` : `Đã nhận ${post.supportsCount} lượt giúp`}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    {post.status !== 'COMPLETED' && (
                      <button
                        onClick={() => handleComplete(post.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{isEn ? 'Mark Completed' : 'Đánh dấu đã hoàn thành'}</span>
                      </button>
                    )}
                    <button
                      onClick={() => navigate(`/rescue/${post.id}`)}
                      className="px-3.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-[#2b2523] dark:text-stone-200 font-bold text-xs cursor-pointer"
                    >
                      {isEn ? 'View Details' : 'Xem chi tiết'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-stone-900 p-12 rounded-3xl border border-dashed border-stone-300 dark:border-stone-800 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto text-2xl">
            🆘
          </div>
          <h3 className="font-bold text-[#2b2523] dark:text-stone-100 text-base">
            {isEn ? 'No rescue appeals posted yet' : 'Chưa có bài kêu gọi cứu trợ nào'}
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {isEn 
              ? 'If you discover an animal in distress needing community support, post an appeal here.' 
              : 'Nếu bạn phát hiện bé cưng gặp nạn cần hỗ trợ cộng đồng, hãy đăng tin tại đây.'}
          </p>
        </div>
      )}

      {/* CREATE RESCUE POST MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in text-left">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h3 className="font-bold text-[#2b2523] dark:text-stone-100 text-base">
                {isEn ? 'Post Emergency Rescue Appeal' : 'Đăng bài kêu gọi cứu hộ khẩn cấp'}
              </h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2b2523] dark:text-stone-200 mb-1">
                  {isEn ? 'Post Title *' : 'Tiêu đề bài đăng *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isEn ? 'e.g., Urgent: Need surgery medical fee support for injured puppy...' : 'Ví dụ: Cần hỗ trợ viện phí phẫu thuật cho bé mèo bị gãy chân...'}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-[#2b2523] dark:text-stone-100 focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2b2523] dark:text-stone-200 mb-1">
                    {isEn ? 'Rescue Category *' : 'Danh mục cứu trợ *'}
                  </label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs bg-stone-50 dark:bg-stone-800 text-[#2b2523] dark:text-stone-100 font-bold"
                  >
                    <option value="SHELTER_SUPPORT">{isEn ? 'Veterinary / Medical Care' : 'Viện phí cứu hộ'}</option>
                    <option value="FOOD">{isEn ? 'Food / Dry Kibble' : 'Thực phẩm / Hạt'}</option>
                    <option value="PET_CARE">{isEn ? 'Temporary Foster Home' : 'Cần nuôi tạm (Foster)'}</option>
                    <option value="MEDICINE">{isEn ? 'Specialized Medication' : 'Thuốc men đặc trị'}</option>
                    <option value="SUPPLIES">{isEn ? 'Supplies & Cages' : 'Vật dụng & Chuồng'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2b2523] dark:text-stone-200 mb-1">
                    {isEn ? 'Urgency Level *' : 'Mức độ ưu tiên *'}
                  </label>
                  <select
                    value={priority}
                    onChange={(e: any) => setPriority(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs bg-stone-50 dark:bg-stone-800 font-bold text-rose-700 dark:text-rose-400"
                  >
                    <option value="URGENT">{isEn ? '🔥 Urgent (Immediate)' : '🔥 Khẩn cấp (Ngay lập tức)'}</option>
                    <option value="HIGH">{isEn ? '⚡ High Priority' : '⚡ Ưu tiên cao'}</option>
                    <option value="MEDIUM">{isEn ? 'Moderate' : 'Vừa phải'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2b2523] dark:text-stone-200 mb-1">
                  {isEn ? 'Specific Support Needed *' : 'Mô tả cụ thể nhu cầu cần hỗ trợ *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isEn ? 'e.g., 3,500,000 VND hospital fee or 10kg cat food...' : 'Ví dụ: 3.500.000 VNĐ tiền viện phí hoặc 10kg hạt mèo...'}
                  value={quantityNeeded}
                  onChange={(e) => setQuantityNeeded(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-[#2b2523] dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2b2523] dark:text-stone-200 mb-1">
                  {isEn ? 'Rescue Location *' : 'Khu vực cần cứu trợ *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isEn ? 'e.g., ABC Veterinary Clinic, Binh Thanh District, HCMC' : 'Ví dụ: Phòng khám thú y ABC, Quận Bình Thạnh, TP.HCM'}
                  value={supportLocation}
                  onChange={(e) => setSupportLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-[#2b2523] dark:text-stone-100"
                />
              </div>

              <div className="p-3 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-3">
                <span className="text-[11px] font-bold text-[#2b2523] dark:text-stone-100 block uppercase tracking-wider">
                  {isEn ? 'Rescue Shelter / Reception Point Information:' : 'Thông tin Trạm cứu hộ / Điểm tiếp nhận:'}
                </span>

                <div>
                  <label className="block text-[11px] font-bold text-[#2b2523] dark:text-stone-200 mb-1">
                    {isEn ? 'Shelter / Reception Center Name *' : 'Tên Trạm / Nơi tiếp nhận *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isEn ? 'e.g., Saigon Time Rescue Shelter or PetCare Clinic...' : 'Ví dụ: Trạm Cứu Hộ Sài Gòn Time hoặc Phòng khám PetCare...'}
                    value={shelterName}
                    onChange={(e) => setShelterName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs bg-white dark:bg-stone-800 text-[#2b2523] dark:text-stone-100"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#2b2523] dark:text-stone-200 mb-1">
                      {isEn ? 'Direct Hotline *' : 'Hotline liên hệ trực tiếp *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="0908 123 789"
                      value={shelterHotline}
                      onChange={(e) => setShelterHotline(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs bg-white dark:bg-stone-800 text-[#2b2523] dark:text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#2b2523] dark:text-stone-200 mb-1">
                      {isEn ? 'Specific Address *' : 'Địa chỉ cụ thể *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isEn ? 'e.g., 45/2 Dien Bien Phu, Ward 15, Binh Thanh' : 'Ví dụ: 45/2 Điện Biên Phủ, P.15, Bình Thạnh'}
                      value={shelterAddress}
                      onChange={(e) => setShelterAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs bg-white dark:bg-stone-800 text-[#2b2523] dark:text-stone-100"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2b2523] dark:text-stone-200 mb-1">
                  {isEn ? 'Condition Details & Context *' : 'Chi tiết tình trạng bé & hoàn cảnh *'}
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder={isEn ? 'Describe injuries, diagnosis results, vet clinic name...' : 'Mô tả vết thương, kết quả chẩn đoán, tên phòng khám tiếp nhận...'}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-[#2b2523] dark:text-stone-100 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/40 text-[11px] text-emerald-950 dark:text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-800 dark:text-emerald-400 shrink-0" />
                <span>
                  <b>{isEn ? 'Non-Profit Guarantee:' : 'Cam kết Không trục lợi:'}</b>{' '}
                  {isEn 
                    ? '100% non-profit rescue, guaranteeing full financial transparency.' 
                    : 'Hoạt động cứu hộ phi lợi nhuận 100%, bảo đảm minh bạch mọi khoản hỗ trợ.'}
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-200 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-[#2b2523] dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 text-xs font-bold cursor-pointer"
                >
                  {isEn ? 'Cancel' : 'Hủy'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Publish Rescue Appeal' : 'Đăng tin cứu trợ'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
